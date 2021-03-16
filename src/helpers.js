const jwt = require('jsonwebtoken');

function numberWithCommas(x) {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function decodeJwt(token) {
  return jwt.decode(token);
}

export { numberWithCommas, decodeJwt };