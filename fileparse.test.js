import { parseFile, writeOutput } from './fileparser';

describe('fileparser', () => {
  it('parse file', () => {
    expect(true).toEqual(true);

    const result = parseFile('./a_example.in');
    expect(result).toEqual({
      rows: 3,
      columns: 4,
      vehicles: 2,
      rideCount: 3,
      bonus: 2,
      steps: 10,
      rides: [
        {
          id: 0,
          start: {
            row: 0,
            column: 0
          },
          finish: {
            row: 1,
            column: 3
          },
          earliestStart: 2,
          latestFinish: 9
        },
        {
          id: 1,
          start: {
            row: 1,
            column: 2
          },
          finish: {
            row: 1,
            column: 0
          },
          earliestStart: 0,
          latestFinish: 9
        },
        {
          id: 2,
          start: {
            row: 2,
            column: 0
          },
          finish: {
            row: 2,
            column: 2
          },
          earliestStart: 0,
          latestFinish: 9
        }
      ]
    });
  });
});

describe('fileparser', () => {
  it('writeOutput', () => {
    expect(true).toEqual(true);

    const vehicles = [
      {
        id: 1,
        rides: [0]
      },
      {
        id: 2,
        rides: [2, 1]
      }
    ];

    writeOutput('testoutput.in', vehicles);
    
  });
});
