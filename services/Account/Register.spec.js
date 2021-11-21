const TestHelper = require("../../helpers/testHelper");
const { Account } = require("../../models");
const Register = require("./Register");

describe("Account/Register Spec", () => {
  beforeEach(async () => {
    await TestHelper.truncate();
  });
  describe("success case", () => {
    it("create account success", async () => {
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response, errors } = await new Register(params).register();
      const accountFound = await Account.findByPk(response.id);
      expect(errors).toBeNull();
      expect(response.email).toEqual(email);
      expect(response.name).toEqual(name);
      expect(accountFound.isActive).toEqual(false);
    });
  });
  describe("failed case", () => {
    it("account already exist", async () => {
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      await new Register(params).register();
      const { response, errors } = await new Register(params).register();
      expect(response).toBeNull();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("email already exist");
      expect(errors.code).toEqual(400);
    });
    it("Password must matched the validation", async () => {
      const email = "johndoe@example.com";
      const password = "invalid";
      const name = "John Doe";
      const params = { email, password, name };
      const { response, errors } = await new Register(params).register();
      expect(response).toBeNull();
      expect(errors.name).toBe("custom error");
      expect(Array.isArray(errors.message)).toBeTruthy();
      expect(errors.code).toEqual(400);
    });
  });
});
