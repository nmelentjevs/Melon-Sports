import * as tf from '@tensorflow/tfjs';
import P5Wrapper from 'react-p5-wrapper';

let data;
let xs, ys;
let matches;
let model;
let lossP;
let sliderOne, sliderTwo, sliderThree;
let labelList = ['H', 'D', 'A'];

function isEmpty(Yourvalue) {
  return (
    Boolean(Yourvalue && typeof Yourvalue == 'object') &&
    !Object.keys(Yourvalue).length
  );
}

p.preload = function() {
  data = p.loadJSON('../jsonData/teamData.json');
  matches = p.loadJSON('../jsonData/matchesData.json');
};

p.setup = function() {
  const teamDataArr = [];
  const matchesDataArrResults = [];

  console.log(data);
  for (p5.key in data) {
    teamDataArr.push(Object.assign(data[p5.key]));
  }
  for (p5.key in matches) {
    matchesDataArrResults.push(Object.assign(matches[p5.key]));
  }

  let dataTenser = [];
  let matchesTenser = [];
  let labels = [];
  teamDataArr.map(item => {
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
    dataTenser.push(team);
  });
  let matchesDataArrNoRes = [];
  matchesDataArrResults.map(match => {
    dataTenser.map(team => {
      if (team[0] === match.home) {
        let noName = team.filter((item, i) => i !== 0);
        match.home = noName;
      }
      if (team[0] === match.away) {
        let noName = team.filter((item, i) => i !== 0);
        match.away = noName;
      }
    });
  });
  console.log(teamDataArr);
  matchesDataArrResults.map(match => {
    matchesDataArrNoRes.push([match.home, match.away]);
    labels.push(labelList.indexOf(match.result));
  });

  xs = tf.tensor3d(matchesDataArrNoRes);
  let labelsTensor = tf.tensor1d(labels, 'int32');
  ys = tf.oneHot(labelsTensor, 3);

  model = tf.sequential();

  let hidden1 = tf.layers.dense({
    units: 100,
    activation: 'sigmoid',
    inputShape: [36]
  });

  let hidden2 = tf.layers.dense({
    units: 100,
    activation: 'sigmoid',
    inputShape: [100]
  });

  let output = tf.layers.dense({
    units: 3,
    activation: 'softmax'
  });

  model.add(hidden1);
  model.add(hidden2);
  model.add(output);

  let lr = 0.2;
  const optimizer = tf.train.sgd(lr);

  model.compile({
    optimizer,
    loss: 'categoricalCrossentropy'
  });

  train().then(res => {
    console.log(res.history.loss);
    tf.tidy(() => {
      const xs = tf.tensor2d([
        [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random()
        ],
        [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random()
        ]
      ]);

      xs.print();

      let results = model.predict(xs.reshape([1, 36]));

      let index = results.dataSync();

      let label = labelList[index];
      // xs.print();
      console.log(index);
    });
  });

  async function train() {
    const options = {
      epochs: 20,
      validationSplit: 0.1,
      shuffle: true,
      callbacks: {
        onTrainBegin: () => console.log('training start'),
        onTrainEnd: () => console.log('training ended'),
        onBatchEnd: async (num, logs) => {
          await tf.nextFrame();
        },
        onEpochEnd: (num, logs) => {
          console.log('Epoch: ' + num);
          lossP.html('Loss: ' + logs.loss);
        }
      }
    };
    return await model.fit(xs.reshape([1855, 36]), ys, options);
  }
};

// export { setup, preload };
