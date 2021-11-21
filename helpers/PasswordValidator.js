module.exports = class Validator {
  constructor() {
    this.errors = [];
  }
  static validate(str) {
    const validator = new Validator();
    validator.lowerCaseCheck(str);
    validator.upperCaseCheck(str);
    validator.numericsCheck(str);
    validator.spCharCheck(str);
    validator.lengthCheck(str);
    return validator.errors;
  }

  lowerCaseCheck(str) {
    const check = new RegExp("[a-z]").test(str);
    if (!check)
      this.errors.push("Password must contain at least 1 lowercase letter");
  }

  upperCaseCheck(str) {
    const check = new RegExp("[A-Z]").test(str);
    if (!check)
      this.errors.push("Password must contain at least 1 uppercase letter");
  }

  numericsCheck(str) {
    const check = new RegExp("[0-9]").test(str);
    if (!check)
      this.errors.push("Password must contain at least 1 digit character");
  }

  spCharCheck(str) {
    const check = new RegExp("[^0-9,A-Z,a-z]").test(str);
    if (!check)
      this.errors.push("Password must contain at least 1 special character");
  }

  lengthCheck(str) {
    if (str.length < 8)
      this.errors.push("Password must contain at least 8 characters");
  }
};
