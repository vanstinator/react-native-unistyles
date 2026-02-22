"use strict";

export const serialize = value => {
  switch (typeof value) {
    case 'function':
      return value.toString();
    case 'object':
      if (Array.isArray(value)) {
        return `[${value.map(serialize).join(',')}]`;
      }
      if (value === null) {
        return 'null';
      }
      return `{${Object.entries(value).map(([key, value]) => `'${key}':${serialize(value)}`).join(',')}}`;
    default:
      return JSON.stringify(value);
  }
};
//# sourceMappingURL=serialize.js.map