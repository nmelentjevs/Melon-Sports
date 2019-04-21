import React, { Component } from 'react';

import * as tf from '@tensorflow/tfjs';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Transition, animated } from 'react-spring/renderprops';
import { Link } from 'react-router-dom';

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
  constructor() {
    super();
    this.state = {
      teamsData: [],
      dataVisualize: [],
      showGraph: false,
      average: [],
      training: false,
      average: {
        homeAvg: 0,
        drawAvg: 0,
        awayAvg: 0
      }
    };
  }
  render() {
    console.log('info');
    let data = require('../jsonData/spTeamDataTest.json');
    let matches = require('../jsonData/spMatchesDataTest.json');
    let xs, ys;
    let model;
    let labelList = ['H', 'D', 'A'];
    console.log(this.props.home);
    console.log(this.props.away);
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
    console.log(this.props.info);
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
      console.log(team[0]);
      console.log(home);
      if (home.includes(team[0])) {
        return team;
      } else if (
        home.includes(team[0].split(' ')[0]) &&
        home.includes(team[0].split(' ')[1])
      ) {
        return team;
      } else if (home === 'Wolverhampton Wanderers FC') {
        return team[0] === 'Wolves';
      } else if (home === 'Athletic Club') {
        return team[0] === 'Ath Bilbao';
      }
    });
    let awayTeam = dataTenser.find(team => {
      console.log(team[0]);
      console.log(away);
      if (away.includes(team[0])) {
        return team;
      } else if (
        away.includes(team[0].split(' ')[0]) &&
        away.includes(team[0].split(' ')[1])
      ) {
        return team;
      } else if (away === 'Wolverhampton Wanderers FC') {
        return team[0] === 'Wolves';
      } else if (away === 'Athletic Club') {
        return team[0] === 'Ath Bilbao';
      }
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
          return (match.away = noName);
        }
      });
    });
    matchesDataArrResults.map(match => {
      matchesDataArrNoRes.push([match.home, match.away]);
      labels.push(labelList.indexOf(match.result));
    });

    console.log(matchesDataArrNoRes);

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

    const train = async () => {
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
            this.setState({ showGraph: false, training: false }),
          onBatchEnd: (num, logs) => {},
          onEpochEnd: (num, logs) => {
            console.log('Epoch: ' + num);
            console.log('Loss: ' + logs.loss);
            tf.tidy(() => {
              let results = model.predict(xst.reshape([1, 36]));

              let index = results.dataSync();

              let label = labelList[index];
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
    };

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
          <div className="card-main">
            <Button variant="primary" onClick={() => train()}>
              AI Predict
            </Button>
          </div>
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
          {this.state.training ? (
            <div>
              <Spinner /> <Spinner /> <Spinner />
            </div>
          ) : (
            <div>
              <div> Home: {(this.state.average.homeAvg * 100).toFixed(2)}%</div>
              <div> Draw: {(this.state.average.drawAvg * 100).toFixed(2)}%</div>
              <div> Away: {(this.state.average.awayAvg * 100).toFixed(2)}%</div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}

function isEmpty(Yourvalue) {
  return (
    Boolean(Yourvalue && typeof Yourvalue == 'object') &&
    !Object.keys(Yourvalue).length
  );
}

export default Info;
