const { Account, Task } = require("../models");
module.exports = class TestHelper {
  static async truncate() {
    await Account.destroy({ truncate: true, cascade: true });
    await Task.destroy({ truncate: true, cascade: true });
  }
};
