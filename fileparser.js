const fs = require('fs');

exports.writeOutput = (filename, vehicles) => {
  let outputString = vehicles.map(({id, rides}) => 
  `${id} ${rides.join(' ')}`).join('\n');

  fs.writeFileSync(filename, outputString);
};

exports.parseFile = file => {
  const content = fs.readFileSync(file, 'ascii');
  const fileRows = content.split('\n');
  const [rows, columns, vehicles, rideCount, bonus, steps] =
    fileRows[0].split(' ').map(element => parseInt(element));
  
  const rides = [];
  for (let i = 1, len = fileRows.length; i < len - 1; i++) {
    const [startRow, startColumn, finishRow, finishColumn, earliestStart, latestFinish]
      = fileRows[i].split(' ').map(element => parseInt(element));

    rides.push({
      id: i - 1,
      start: {
        row: startRow,
        column: startColumn
      },
      finish: {
        row: finishRow,
        column: finishColumn
      },
      earliestStart,
      latestFinish
    });
  }

  return { rows, columns, vehicles, rideCount, bonus, steps, rides };
}
