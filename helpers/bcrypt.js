const bcrypt = require("bcryptjs");

function hashPassword(string) {
  const password = bcrypt.hashSync(string, 10);
  return password;
}

function validatePassword(passwordGiven, hashedPassword) {
  const validate = bcrypt.compareSync(passwordGiven, hashedPassword);
  return validate;
}

module.exports = {
  hashPassword,
  validatePassword,
};
