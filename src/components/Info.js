import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as tf from '@tensorflow/tfjs';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Transition, animated } from 'react-spring/renderprops';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import Spinner from 'react-bootstrap/Spinner';

const epochs = 5;

class Info extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      teamsData: [],
      dataVisualize: [],
      showGraph: false,
      training: false,
      trainingFinished: false,
      average: {
        homeAvg: 0,
        drawAvg: 0,
        awayAvg: 0
      }
    };
  }

  train() {
    let data, matches;
    const { info } = this.props;
    // console.log(info);
    if (info.competition.name === 'Premier League') {
      data = require('../jsonData/plTeamDataTest.json');
      matches = require('../jsonData/plMatchesDataTest.json');
    } else if (info.competition.name === 'Ligue 1') {
      data = require('../jsonData/frTeamDataTest.json');
      matches = require('../jsonData/frMatchesDataTest.json');
    } else if (info.competition.name === 'Bundesliga') {
      data = require('../jsonData/bunTeamDataTest.json');
      matches = require('../jsonData/bunMatchesDataTest.json');
    } else if (info.competition.name === 'Serie A') {
      data = require('../jsonData/itTeamDataTest.json');
      matches = require('../jsonData/itMatchesDataTest.json');
    } else if (info.competition.name === 'Primera Division') {
      data = require('../jsonData/spTeamDataTest.json');
      matches = require('../jsonData/spMatchesDataTest.json');
    }
    let xs, ys;
    let model;
    let labelList = ['H', 'D', 'A'];
    // console.log(this.props.home);
    // console.log(this.props.away);
    const teamDataArr = [];
    const matchesDataArrResults = [];

    // lossP = p.createP('loss');
    for (Object.key in data) {
      teamDataArr.push(Object.assign(data[Object.key]));
    }
    for (Object.key in matches) {
      matchesDataArrResults.push(Object.assign(matches[Object.key]));
    }

    let dataTenser = [];
    let matchesTenser = [];
    let labels = [];
    // console.log(this.props.info);
    teamDataArr.map(item => {
      item.homeFullTime = item.homeFullTime.replace('undefined', '');
      item.awayFullTime = item.awayFullTime.replace('undefined', '');

      item.homeWins = (item.homeFullTime.match(/H/g) || []).length;
      item.homeDraws = (item.homeFullTime.match(/D/g) || []).length;
      item.homeLoses = (item.homeFullTime.match(/A/g) || []).length;
      item.awayWins = (item.awayFullTime.match(/A/g) || []).length;
      item.awayDraws = (item.awayFullTime.match(/D/g) || []).length;
      item.awayLoses = (item.awayFullTime.match(/H/g) || []).length;
      let team = [
        item.name,
        parseFloat(item.totalHomeGoals / 40),
        parseFloat(item.totalHomeShots / 200),
        parseFloat(item.totalHomeShotsTarget / 100),
        parseFloat(item.totalHomeTeamCorners / 100),
        parseFloat(item.totalAwayGoals / 30),
        parseFloat(item.totalAwayShots / 150),
        parseFloat(item.totalAwayShotsTarget / 100),
        parseFloat(item.totalAwayTeamCorners / 100),
        parseFloat(item.totalShots / 350),
        parseFloat(item.totalGoals / 75),
        parseFloat(item.totalShotsTarget / 150),
        parseFloat(item.totalTeamCorners / 200),
        parseFloat(item.awayWins / 10),
        parseFloat(item.awayDraws / 10),
        parseFloat(item.awayLoses / 10),
        parseFloat(item.homeWins / 10),
        parseFloat(item.homeLoses / 10),
        parseFloat(item.homeDraws / 10)
      ];

      return dataTenser.push(team);
    });

    let { home, away } = this.props;
    const removeSpecial = string => {
      string = string.replace(/á/g, 'a');
      string = string.replace(/é/g, 'e');
      string = string.replace(/í/g, 'i');
      string = string.replace(/ó/g, 'o');
      string = string.replace(/ú/g, 'u');
      return string;
    };

    home = removeSpecial(home.name);
    away = removeSpecial(away.name);

    let homeTeam = dataTenser.find(team => {
      // console.log(team[0]);
      // console.log(home);
      if (home === 'Wolverhampton Wanderers FC') {
        return team[0] === 'Wolves';
      } else if (home === 'Athletic Club') {
        return team[0] === 'Ath Bilbao';
      } else if (home === 'Club Atlético de Madrid') {
        return team[0] === 'Ath Madrid';
      } else if (home === 'Stade Rennais FC 1901') {
        return team[0] === 'Rennes';
      } else if (home === 'FC Bayern München') {
        return team[0] === 'Bayern Munich';
      } else if (home.includes(team[0])) {
        return team;
      } else if (
        home.includes(team[0].split(' ')[0]) &&
        home.includes(team[0].split(' ')[1])
      ) {
        return team;
      }
      return null;
    });
    let awayTeam = dataTenser.find(team => {
      // console.log(team[0]);
      // console.log(away);
      if (away === 'Wolverhampton Wanderers FC') {
        return team[0] === 'Wolves';
      } else if (away === 'Athletic Club') {
        return team[0] === 'Ath Bilbao';
      } else if (away === 'FC Bayern München') {
        return team[0] === 'Bayern Munich';
      } else if (away === 'Club Atlético de Madrid') {
        return team[0] === 'Ath Madrid';
      } else if (away === 'Stade Rennais FC 1901') {
        return team[0] === 'Rennes';
      } else if (away.includes(team[0])) {
        return team;
      } else if (
        away.includes(team[0].split(' ')[0]) &&
        away.includes(team[0].split(' ')[1])
      ) {
        return team;
      }
      return null;
    });

    const homeTeamTenser = homeTeam.filter((item, i) => i !== 0);
    const awayTeamTenser = awayTeam.filter((item, i) => i !== 0);

    let matchesDataArrNoRes = [];
    matchesDataArrResults.map(match => {
      dataTenser.map(team => {
        if (team[0] === match.home) {
          let noName = team.filter((item, i) => i !== 0);
          return (match.home = noName);
        }
        if (team[0] === match.away) {
          let noName = team.filter((item, i) => i !== 0);
          match.away = noName;
        }
        return null;
      });
      return null;
    });
    matchesDataArrResults.map(match => {
      matchesDataArrNoRes.push([match.home, match.away]);
      labels.push(labelList.indexOf(match.result));
      return null;
    });

    // console.log(matchesDataArrNoRes);

    xs = tf.tensor3d(matchesDataArrNoRes);
    let labelsTensor = tf.tensor1d(labels, 'int32');
    ys = tf.oneHot(labelsTensor, 3);

    model = tf.sequential();

    let hidden1 = tf.layers.dense({
      units: 64,
      activation: 'linear',
      inputShape: [36]
    });

    // let hidden2 = tf.layers.dense({
    //   units: 32,
    //   activation: 'sigmoid',
    //   inputShape: [32]
    // });

    let output = tf.layers.dense({
      units: 3,
      activation: 'softmax'
    });

    model.add(hidden1);
    // model.add(hidden2);
    model.add(output);

    let lr = 0.2;
    const optimizer = tf.train.sgd(lr);

    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy'
    });

    const xst = tf.tensor2d([homeTeamTenser, awayTeamTenser]);

    const trainModel = async () => {
      if (this._isMounted) {
        this.setState({ showGraph: true, training: true });
        let amount = 0;
        let home = 0;
        let draw = 0;
        let away = 0;
        const options = {
          epochs,
          validationSplit: 0.1,
          shuffle: true,
          callbacks: {
            onTrainBegin: () => {
              console.log('training start');
            },
            onTrainEnd: () =>
              this.setState({
                showGraph: false,
                training: false,
                trainingFinished: true
              }),
            onBatchEnd: (num, logs) => {},
            onEpochEnd: (num, logs) => {
              // console.log('Epoch: ' + num);
              // console.log('Loss: ' + logs.loss);
              tf.tidy(() => {
                let results = model.predict(xst.reshape([1, 36]));

                let index = results.dataSync();
                // xs.print();
                amount++;
                home += parseFloat(results.dataSync()[0]);
                draw += parseFloat(results.dataSync()[1]);
                away += parseFloat(results.dataSync()[2]);
                const homeAvg = home / amount;
                const drawAvg = draw / amount;
                const awayAvg = away / amount;
                this.setState({
                  dataVisualize: [
                    ...this.state.dataVisualize,
                    {
                      name: `${this.props.home.name.charAt(
                        0
                      )} vs ${this.props.away.name.charAt(0)}`,
                      home: results.dataSync()[0],
                      draw: results.dataSync()[1],
                      away: results.dataSync()[2]
                    }
                  ],
                  average: {
                    homeAvg,
                    drawAvg,
                    awayAvg
                  }
                });
                console.log([
                  homeAvg.toFixed(3),
                  drawAvg.toFixed(3),
                  awayAvg.toFixed(3)
                ]);
                // console.log(index);
              });
            }
          }
        };

        return await model.fit(xs.reshape([xs.shape[0], 36]), ys, options);
      }
    };
    trainModel();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }

  render() {
    const { average } = this.state;
    let { home, away } = this.props;
    const StackedAreaChart = () => (
      <AreaChart
        width={500}
        height={400}
        data={this.state.dataVisualize}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="home"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="draw"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="away"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    );

    return (
      <Card style={{ height: 'auto', width: '100%' }}>
        <Card.Body>
          {this.state.training ? (
            <div style={{ fontSize: '1.1rem' }}>Training in progress..</div>
          ) : null}
          {this.state.trainingFinished || this.state.training ? null : (
            <div className="card-main">
              <Button variant="primary" onClick={() => this.train()}>
                Predict Result
              </Button>
            </div>
          )}
          {/* <P5Wrapper sketch={sketch} /> */}
          <Transition
            native
            items={this.state.showGraph}
            from={{ opacity: 0, display: 'none' }}
            enter={{ opacity: 1, display: 'block' }}
            leave={{ opacity: 0, display: 'none' }}
          >
            {show =>
              show &&
              (props => (
                <animated.div style={props}>
                  <StackedAreaChart />
                </animated.div>
              ))
            }
          </Transition>
          {this.state.trainingFinished ? (
            <div>
              {' '}
              Suggested Bet:{' '}
              {average.homeAvg - average.awayAvg > 0.125
                ? home.name.toUpperCase() + ' TO WIN'
                : average.awayAvg - average.homeAvg > 0.125
                ? away.name.toUpperCase() + ' TO WIN'
                : 'DRAW'}{' '}
            </div>
          ) : (
            <div>
              <div> Home: {(average.homeAvg * 100).toFixed(2)}%</div>
              <div> Draw: {(average.drawAvg * 100).toFixed(2)}%</div>
              <div> Away: {(average.awayAvg * 100).toFixed(2)}%</div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}

Info.propTypes = {
  home: PropTypes.object.isRequired,
  away: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(Info);
