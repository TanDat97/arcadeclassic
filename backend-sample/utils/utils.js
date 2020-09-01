function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  // return ipAddress;
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

function isBoolean(arg) {
  return typeof arg === 'boolean';
}  

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function  isFunction(arg) {
  return typeof arg === 'function';
}

function isObject(arg) {
  return arg !== null && typeof arg === 'object';
}

module.exports = {
  getClientIp,
  isBoolean,
  isNumber,
  isString,
  isFunction,
  isObject
}
