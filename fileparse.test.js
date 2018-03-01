import { parseFile } from './fileparser';

describe('fileparser', () => {
  it('parse file', () => {
    expect(true).toEqual(true);

    const result = parseFile('./a_example.in');
    expect(result).toEqual({
      rows: 3,
      columns: 4,
      vehicles: 2,
      rides: 3,
      bonus: 2,
      steps: 10
    });


  });
});
