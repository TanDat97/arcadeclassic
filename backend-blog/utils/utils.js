module.exports = {
  isBoolean(arg) {
    return typeof arg === 'boolean';
  },

  isNumber(arg) {
    return typeof arg === 'number';
  },

  isString(arg) {
    return typeof arg === 'string';
  },

  isFunction(arg) {
    return typeof arg === 'function';
  },

  isObject(arg) {
    return arg !== null && typeof arg === 'object';
  }
}
