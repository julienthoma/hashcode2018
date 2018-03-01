const fs = require('fs');

exports.writeOutput = (filename, data) => {
  let outputString = Object.keys(data).length + '\n';

  fs.writeFileSync(filename, outputString);
};

exports.parseFile = file => {
  const content = fs.readFileSync(file, 'ascii');
  const rows = content.split('\n');
  // Relevant.
  const [videoCount, endpointCount, requestDescCount, cacheCount, cacheCapacity] =
    rows[0].split(' ').map(element => parseInt(element));

    return 'fu';
 
}
