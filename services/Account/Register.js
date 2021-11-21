const { Account, sequelize } = require("../../models");
const PasswordValidator = require("../../helpers/PasswordValidator");
const { hashPassword } = require("../../helpers/bcrypt");
const { sendConfirmationEmail } = require("../../helpers/confirmation");
const _ = require("lodash");

module.exports = class Register {
  constructor(body) {
    this.body = body;
    this.errors = null;
    this.response = null;
  }

  async validate() {
    const { email, password } = this.body;
    const uniqueEmailCheck = await Account.count({ where: { email } });
    if (uniqueEmailCheck)
      this.errors = {
        name: "custom error",
        code: 400,
        message: "email already exist",
      };

    const validator = PasswordValidator.validate(password);
    if (!_.isEmpty(validator))
      this.errors = {
        name: "custom error",
        code: 400,
        message: validator,
      };
  }

  async register() {
    await this.validate();
    if (this.errors) return this.serialize();
    const { email, password, name } = this.body;
    const params = {
      email,
      name,
      password: hashPassword(password),
    };
    const result = await sequelize.transaction(async (transaction) => {
      const registered = await Account.create(params, { transaction });
      if (registered) {
        sendConfirmationEmail(email, {
          id: registered.id,
          token: registered.verificationToken,
        });
        return {
          id: registered.id,
          name,
          email,
          message: "Please check your email for verification",
        };
      }
    });
    if (result) this.response = result;
    else
      this.errors = {
        name: "custom error",
        code: 500,
        message: "internal server error",
      };
    return this.serialize();
  }

  serialize() {
    if (this.errors) return { response: null, errors: this.errors };
    return { response: this.response, errors: null };
  }
};
