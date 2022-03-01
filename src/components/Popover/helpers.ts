export const noop = () => {};

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';
export const isString = (value: unknown): value is string =>
  typeof value === 'string';
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
export const isFunction = (value: unknown): value is Function =>
  value instanceof Function;
export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;
const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' &&
  Object.prototype.toString.call(value) == '[object Object]';

type PlainObject = { [key: string]: unknown };

export const isEqual = (value1: unknown, value2: unknown) => {
  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (isPlainObject(value1) && isPlainObject(value2)) {
    for (const key in value1) {
      if (!isEqual(value1[key], value2[key])) {
        return false;
      }
    }

    for (const key in value2) {
      // return false if object2 has more keys than object1
      if (!value1[key]) {
        return false;
      }
    }
  }

  return value1 === value2;
};

export const upperFirst = (value: string) =>
  value.replace(/./, (letter) => letter.toUpperCase());
