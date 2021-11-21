const jwt = require("jsonwebtoken");

function encoding(param) {
  return jwt.sign(param, process.env.JWT_KEY);
}

function decoding(token) {
  return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = {
  encoding,
  decoding,
};
