const { Account } = require("../../models");
const { validatePassword } = require("../../helpers/bcrypt");
const { encoding } = require("../../helpers/jwt");
const bcrypt = require("bcryptjs");

module.exports = class Login {
  constructor(body) {
    this.body = body;
    this.errors = null;
    this.response = null;
  }

  async authenticate() {
    if (this.errors) return this.serialize();
    const { email, password } = this.body;
    const user = await Account.findOne({ where: { email } });
    if (user) {
      const passCompare = validatePassword(password, user.password);
      if (!user.isActive)
        this.errors = {
          name: "custom error",
          code: 400,
          message: `Please verify your email first`,
        };
      else if (user.isActive && passCompare)
        this.response = {
          name: user.name,
          token: encoding({
            id: user.id,
            email,
            name: user.name,
          }),
        };
      else if (!passCompare)
        this.errors = {
          name: "custom error",
          code: 400,
          message: `Invalid email/password`,
        };
      else
        this.errors = {
          name: "custom error",
          code: 500,
          message: "internal server error",
        };
    } else
      this.errors = {
        name: "custom error",
        code: 400,
        message: `Invalid email/password`,
      };
    return this.serialize();
  }

  serialize() {
    if (this.errors) return { response: null, errors: this.errors };
    return { response: this.response, errors: null };
  }
};
