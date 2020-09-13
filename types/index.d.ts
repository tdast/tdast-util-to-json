import { Table } from 'tdast-types';

export interface Options {
  // array of column strings that will be used as object keys.  Overrides the column values detected in the tdast tree.
  columns?: string[];
  // JSON.stringify replacer function parameter
  replacer?: (this: any, key: string, value: any) => any;
  // JSON.stringify optional space parameter
  space?: number | number;
}

/**
 * Serialize a tdast tree into JSON array
 */
export default function toJson(
  // tdast Table node
  tdast: Table,
  // options to configure serializer
  options?: Options,
): string;
