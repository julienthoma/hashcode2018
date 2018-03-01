const fileparser = require('./fileparser');
const parseFile = fileparser.parseFile;
const writeOutput = fileparser.writeOutput;

const run = (fileName) => {
  const data = parseFile(`./${fileName}.in`);

  console.log(data);

  testVehicles = [
      {
        id: 1,
        rides: [0]
      },
      {
        id: 2,
        rides: [2, 1]
      }
    ];

    writeOutput(`./${fileName}.out`, testVehicles);
}

run('a_example');
