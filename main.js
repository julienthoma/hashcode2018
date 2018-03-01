const fileparser = require('./fileparser');
const parseFile = fileparser.parseFile;
const writeOutput = fileparser.writeOutput;

const run = (fileName) => {
  const data = parseFile(`./${fileName}.in`);

  
}
