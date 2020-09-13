import td from 'tdastscript';

import toJson from '../lib/to-json';

describe(toJson, () => {
  it('should serialize empty trees to empty JSON', () => {
    const emptyJson = '[]';
    expect(toJson(td())).toEqual(emptyJson);
    expect(toJson(td('table'))).toEqual(emptyJson);
    expect(toJson(td('table', []))).toEqual(emptyJson);
  });

  it('should serialize into JSON array if columns are present', () => {
    expect(
      toJson(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
      ),
    ).toEqual(
      JSON.stringify([
        { col1: 'row1col1', col2: 'row1col2', col3: 'row1col3' },
        { col1: 'row2col1', col2: 'row2col2', col3: 'row2col3' },
      ]),
    );
  });

  it('should apply options.columns to override column keys', () => {
    expect(
      toJson(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { columns: ['Col A', 'Col B', 'Col C'] },
      ),
    ).toEqual(
      JSON.stringify([
        { 'Col A': 'row1col1', 'Col B': 'row1col2', 'Col C': 'row1col3' },
        { 'Col A': 'row2col1', 'Col B': 'row2col2', 'Col C': 'row2col3' },
      ]),
    );
  });

  it('should throw an error if no columns are found or provided', () => {
    expect(() =>
      toJson(
        td('table', [
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
      ),
    ).toThrow('Columns must be specified to transform to array of objects.');
    expect(() =>
      toJson(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { columns: [] },
      ),
    ).toThrow('Columns must be specified to transform to array of objects.');
  });

  it('should throw an error if no row and column cardinality does not match', () => {
    expect(() =>
      toJson(
        td('table', [
          td('row', [td('column', 'col1'), td('column', 'col2')]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
      ),
    ).toThrow('Row cardinality must match length of columns.');
    expect(() =>
      toJson(
        td('table', [
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { columns: ['Col A', 'Col B', 'Col C', 'Col D'] },
      ),
    ).toThrow('Row cardinality must match length of columns.');
  });

  it('should apply options.space with similar behavior as JSON.stringify', () => {
    expect(
      toJson(
        td('table', [
          td('row', [
            td('column', 'col1'),
            td('column', 'col2'),
            td('column', 'col3'),
          ]),
          td('row', ['row1col1', 'row1col2', 'row1col3']),
          td('row', ['row2col1', 'row2col2', 'row2col3']),
        ]),
        { space: 4 },
      ),
    ).toEqual(
      JSON.stringify(
        [
          { col1: 'row1col1', col2: 'row1col2', col3: 'row1col3' },
          { col1: 'row2col1', col2: 'row2col2', col3: 'row2col3' },
        ],
        null,
        4,
      ),
    );
  });

  it('should apply options.replacer with similar behavior as JSON.stringify', () => {
    function replacer(_key, _value) {
      return [];
    }
    const json = toJson(
      td('table', [
        td('row', [
          td('column', 'col1'),
          td('column', 'col2'),
          td('column', 'col3'),
        ]),
        td('row', ['row1col1', 'row1col2', 'row1col3']),
        td('row', ['row2col1', 'row2col2', 'row2col3']),
      ]),
      { replacer },
    );
    expect(json).toEqual('[]');
    expect(json).toEqual(
      JSON.stringify(
        [
          { col1: 'row1col1', col2: 'row1col2', col3: 'row1col3' },
          { col1: 'row2col1', col2: 'row2col2', col3: 'row2col3' },
        ],
        replacer,
      ),
    );
  });
});
