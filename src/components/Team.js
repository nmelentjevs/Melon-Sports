import React, { Component } from 'react';

import axios from 'axios';
import keys from '../config/keys';

import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Link } from 'react-router-dom';

class Team extends Component {
  state = {
    teamData: {},
    table: 0,
    loading: true,
    activeWinIndex: 0,
    activeGoalsIndex: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== prevProps.match.params.name) {
      let { name, league } = this.props.match.params;
      const headers = {
        'X-Auth-Token': keys.footballAPI
      };
      const leagueIDs = {
        premier_league: 2021,
        ligue1: 2015,
        bundesliga: 2002,
        serie_a: 2019,
        la_liga: 2014
      };

      let id;
      league === 'soccer_spain_la_liga'
        ? (id = leagueIDs.la_liga)
        : league === 'soccer_france_ligue_one'
        ? (id = leagueIDs.ligue1)
        : league === 'soccer_italy_serie_a'
        ? (id = leagueIDs.serie_a)
        : league === 'soccer_epl'
        ? (id = leagueIDs.premier_league)
        : league === 'soccer_germany_bundesliga'
        ? (id = leagueIDs.bundesliga)
        : (id = null);

      this.setState({ loading: true });
      axios
        .get(`http://api.football-data.org/v2/competitions/${id}/standings`, {
          headers
        })
        .then(res => {
          const teamData = res.data.standings[0].table.filter(position => {
            if (name === 'Real Madrid CF') {
              return position.team.name.includes(name);
            } else {
              let splitName = name.split(' ');
              splitName[0] === 'Real'
                ? (splitName = splitName[1])
                : (splitName = splitName[0]);
              return position.team.name.includes(splitName);
            }
          });
          this.setState({ table: res.data.standings[0].table });
          this.setState({ teamData, loading: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    let { name, league } = this.props.match.params;
    const headers = {
      'X-Auth-Token': keys.footballAPI
    };
    const leagueIDs = {
      premier_league: 2021,
      ligue1: 2015,
      bundesliga: 2002,
      serie_a: 2019,
      la_liga: 2014
    };

    let id;
    league === 'soccer_spain_la_liga'
      ? (id = leagueIDs.la_liga)
      : league === 'soccer_france_ligue_one'
      ? (id = leagueIDs.ligue1)
      : league === 'soccer_italy_serie_a'
      ? (id = leagueIDs.serie_a)
      : league === 'soccer_epl'
      ? (id = leagueIDs.premier_league)
      : league === 'soccer_germany_bundesliga'
      ? (id = leagueIDs.bundesliga)
      : (id = null);
    this.setState({ loading: true });
    axios
      .get(`http://api.football-data.org/v2/competitions/${id}/standings`, {
        headers
      })
      .then(res => {
        const teamData = res.data.standings[0].table.filter(position => {
          if (name === 'Real Madrid CF') {
            return position.team.name.includes(name);
          } else {
            let splitName = name.split(' ');
            splitName[0] === 'Real'
              ? (splitName = splitName[1])
              : (splitName = splitName[0]);
            return position.team.name.includes(splitName);
          }
        });
        this.setState({ table: res.data.standings[0].table });
        this.setState({ teamData, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onPieEnterGoals = (data, index) => {
    this.setState({
      activeGoalsIndex: index
    });
  };
  onPieEnterWin = (data, index) => {
    this.setState({
      activeWinIndex: index
    });
  };

  render() {
    const { league } = this.props.match.params;
    // Recharts graphs functions & data
    const renderActiveShape = props => {
      const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';

      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`PV ${value}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };

    const COLORS = ['#B2E0AE', '#FFBB28', '#FFABAB', '#FF8042'];
    const COLORS2 = ['#D291BC', '#6EB5FF', '#AC6C39', '#FF8042'];

    if (!this.state.loading) {
      let data = { ...this.state.teamData };
      const { table } = this.state;
      const data2 = data[Object.keys(data)[0]];
      const {
        goalDifference,
        goalsAgainst,
        goalsFor,
        lost,
        draw,
        won,
        playedGames,
        position,
        points,
        team
      } = typeof data2 === 'undefined' ? data : data2;

      const dataStats = [
        { name: 'Wins', value: won },
        { name: 'Draws', value: draw },
        { name: 'Loses', value: lost }
      ];

      const dataGoals = [
        { name: 'Goals For', value: goalsFor },
        { name: 'Goals Against', value: goalsAgainst },
        { name: 'G. Difference', value: goalDifference }
      ];

      const dataRadar = [
        {
          subject: 'Points',
          A: points + 30,
          B: 120,
          fullMark: playedGames * 3 + 30
        },
        {
          subject: 'Won',
          A: won * 4,
          B: 120,
          fullMark: playedGames * 4
        },
        {
          subject: 'Standings',
          A: (21 - position) * 6,
          B: 120,
          fullMark: 20 * 6
        },
        {
          subject: 'Goals',
          A: goalsFor,
          B: 120,
          fullMark: 120
        }
      ];
      return (
        <div
          style={{
            alignItems: 'center'
            // display: 'grid',
            // gridTemplateAreas: `
            // 'name name name'
            // '. button .'
            // 'graph1 graph2 graph3'
            // `
          }}
          className="container lg-12"
        >
          <div className="md-12">
            <Link style={{ color: 'white' }} to={`/`}>
              <Button
                className="col-sm-4"
                style={{
                  width: '100px',
                  marginTop: '10px',
                  marginRight: '10px'
                }}
              >
                Home
              </Button>
            </Link>
            <Button
              className="col-sm-4"
              onClick={this.props.history.goBack}
              style={{ width: '100px', marginTop: '10px' }}
            >
              Back
            </Button>{' '}
            <h1
              className="display-4"
              style={{ gridArea: 'name', marginTop: '20px' }}
            >
              {team.name} <img width="50px" src={team.crestUrl} alt="" />
            </h1>
          </div>
          <br />
          <h3 className="display-5">Games Played: {playedGames}</h3>
          <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-sm-4">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h1 className="display-4">Goals</h1>
                <PieChart
                  width={400}
                  height={400}
                  style={{ marginTop: '-50px' }}
                >
                  <Pie
                    activeIndex={this.state.activeGoalsIndex}
                    activeShape={renderActiveShape}
                    data={dataGoals}
                    onMouseEnter={this.onPieEnterGoals}
                    cx={175}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS2[index % COLORS2.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>

            <div style={{ gridArea: 'graph2' }} className="col-sm-4">
              <h1 className="display-4">Wins</h1>
              <PieChart width={400} height={400} style={{ marginTop: '-50px' }}>
                <Pie
                  activeIndex={this.state.activeWinIndex}
                  activeShape={renderActiveShape}
                  data={dataStats}
                  onMouseEnter={this.onPieEnterWin}
                  cx={175}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div style={{ gridArea: 'graph3' }} className="col-sm-4">
              <h1 className="display-4">Stats</h1>
              <RadarChart
                cx={175}
                cy={150}
                outerRadius={100}
                width={500}
                height={500}
                data={dataRadar}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#b28dff"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </div>
          </div>
          <div className="standings" style={{ marginTop: '-200px' }}>
            <h3 className="display-5">
              Position: {position}/{table.length} with {points} points
            </h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Draw</th>
                  <th>Away</th>
                  <th>GD</th>
                </tr>
              </thead>
              <tbody>
                {table.map(pos => {
                  return (
                    <tr
                      key={pos.position}
                      style={
                        pos.team.name === team.name
                          ? { background: '#fde0e0' }
                          : null
                      }
                    >
                      <td>{pos.position}</td>
                      <td style={{ cursor: 'auto !important' }}>
                        <Link
                          style={{ color: 'black' }}
                          to={`/team/${league}/${pos.team.name}`}
                        >
                          {pos.team.name}
                        </Link>
                      </td>
                      <td>{pos.points}</td>
                      <td>{pos.playedGames}</td>
                      <td>{pos.won}</td>
                      <td>{pos.draw}</td>
                      <td>{pos.lost}</td>
                      <td>{pos.goalDifference}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: '40vh' }}>
          <Spinner animation="grow" /> <Spinner animation="grow" />{' '}
          <Spinner animation="grow" />
        </div>
      );
    }
  }
}
export default Team;
