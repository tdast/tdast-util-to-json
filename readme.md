# tdast-util-to-json

[**tdast**][tdast] utility to serialize tdast to a JSON array string.

---

## Install

```sh
npm install tdast-util-to-json
```

## Use

```js
import toArray from 'tdast-util-to-array';

const tdast = {
  type: 'table',
  children: [
    {
      type: 'row',
      index: 0,
      children: [
        {
          type: 'column',
          index: 0,
          value: 'col1',
        },
        {
          type: 'column',
          index: 1,
          value: 'col2',
        },
        {
          type: 'column',
          index: 2,
          value: 'col3',
        },
      ],
    },
    {
      type: 'row',
      index: 1,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 1,
          value: 'row1col1',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 1,
          value: 'row1col2',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 1,
          value: 'row1col3',
        },
      ],
    },
    {
      type: 'row',
      index: 2,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 2,
          value: 'row2col1',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 2,
          value: 'row2col2',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 2,
          value: 'row2col3',
        },
      ],
    },
  ],
};

console.log(toJson(tdast));
```

yields

```json
[{"col1":"row1col1","col2":"row1col2","col3":"row1col3"},{"col1":"row2col1","col2":"row2col2","col3":"row2col3"}]
```

## API

### `toJson(tdast[, options])`

#### Interface
```ts
function toJson(
  // tdast Table node
  tdast: Table,
  // options to configure serializer
  options?: Options,
): string;
```

Serializes a [tdast][] `Table` node into a JSON array string.

If columns and row cell cardinality do not match, an error will be thrown to inform that the JSON cannot be serialized.

By default, `toJson` will infer `Column` node values to use as keys.  If the tdast node does not contain `Column` nodes, or you wish to use explicit column keys, you can specify these with the `options.columns` property as detailed in the example below.

#### Example
Using the same tdast tree in the earlier example,

```js
import toJson from 'tdast-util-to-json';

const options = {
  columns ['Col A', 'Col B', 'Col C'],
  space: 4,
};
```

yields

```json
[
    {
        "Col A": "row1col1",
        "Col B": "row1col2",
        "Col C": "row1col3"
    },
    {
        "Col A": "row2col1",
        "Col B": "row2col2",
        "Col C": "row2col3"
    }
]
```

#### Related interfaces
```ts
interface Options {
  // array of column strings that will be used as object keys.  Overrides the column values detected in the tdast tree.
  columns?: string[];
  // JSON.stringify replacer function parameter
  replacer?: (this: any, key: string, value: any) => any;
  // JSON.stringify optional space parameter
  space?: number | number;
}
```

<!-- Definitions -->
[tdast]: https://github.com/tdast/tdast
