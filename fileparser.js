const fs = require('fs');

exports.writeOutput = (filename, data) => {
  let outputString = Object.keys(data).length + '\n';

  fs.writeFileSync(filename, outputString);
};

exports.parseFile = file => {
  const content = fs.readFileSync(file, 'ascii');
  const fileRows = content.split('\n');
  const [rows, columns, vehicles, rides, bonus, steps] =
    fileRows[0].split(' ').map(element => parseInt(element));

    return { rows, columns, vehicles, rides, bonus, steps };
}
