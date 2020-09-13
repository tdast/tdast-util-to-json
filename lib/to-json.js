import toArray from 'tdast-util-to-array';

export default function toJson(tdast, options = {}) {
  const { columns, replacer, space } = options;
  return JSON.stringify(toArray(tdast, { columns }), replacer, space);
}
