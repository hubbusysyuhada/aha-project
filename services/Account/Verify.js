const { Account, sequelize } = require("../../models");
const PasswordValidator = require("../../helpers/PasswordValidator");
const { hashPassword } = require("../../helpers/bcrypt");
const { sendConfirmationEmail } = require("../../helpers/confirmation");
const _ = require("lodash");

module.exports = class Verify {
  constructor(body) {
    this.body = body;
    this.errors = null;
    this.response = null;
  }

  async validate() {
    const { accountId: id, token: verificationToken } = this.body;
    const account = await Account.findOne({ where: { id, verificationToken } });
    if (!account)
      this.errors = {
        name: "custom error",
        code: 400,
        message: "Invalid id/token",
      };
    else if (account.isActive)
      this.errors = {
        name: "custom error",
        code: 400,
        message: "Email already verified",
      };
  }

  async verify() {
    await this.validate();
    if (this.errors) return this.serialize();
    const { accountId: id, token: verificationToken } = this.body;
    const [result] = await Account.update(
      { isActive: true },
      {
        where: { id },
      }
    );
    if (result) this.response = { ok: true };
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
