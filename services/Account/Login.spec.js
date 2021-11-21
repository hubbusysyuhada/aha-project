const TestHelper = require("../../helpers/testHelper");
const { Account } = require("../../models");
const Register = require("./Register");
const Verify = require("./Verify");
const Login = require("./Login");
const mockEnv = require("mocked-env");

describe("Account/Login Spec", () => {
  beforeEach(async () => {
    await TestHelper.truncate();
  });
  describe("success case", () => {
    it("login account success", async () => {
      const restoreMock = mockEnv({ JWT_KEY: "mockedKey" });
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response: registered } = await new Register(params).register();
      const accountFound = await Account.findByPk(registered.id);
      const verifyParams = {
        accountId: accountFound.id,
        token: accountFound.verificationToken,
      };
      await new Verify(verifyParams).verify();
      const { response, errors } = await new Login({
        email,
        password,
      }).authenticate();
      restoreMock();
      expect(errors).toBeNull();
      expect(response.name).toEqual(name);
      expect(response.token).toBeDefined();
    });
  });
  describe("failed case", () => {
    it("email was not verified", async () => {
      const restoreMock = mockEnv({ JWT_KEY: "mockedKey" });
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      await new Register(params).register();
      const { response, errors } = await new Login({
        email,
        password,
      }).authenticate();
      restoreMock();
      expect(response).toBeNull();
      expect(errors).toBeTruthy();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("Please verify your email first");
      expect(errors.code).toEqual(400);
    });
    it("wrong email address", async () => {
      const restoreMock = mockEnv({ JWT_KEY: "mockedKey" });
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response: registered } = await new Register(params).register();
      const accountFound = await Account.findByPk(registered.id);
      const verifyParams = {
        accountId: accountFound.id,
        token: accountFound.verificationToken,
      };
      await new Verify(verifyParams).verify();
      const { response, errors } = await new Login({
        email: "invalid",
        password,
      }).authenticate();
      restoreMock();
      expect(response).toBeNull();
      expect(errors).toBeTruthy();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("Invalid email/password");
      expect(errors.code).toEqual(400);
    });
    it("wrong password", async () => {
      const restoreMock = mockEnv({ JWT_KEY: "mockedKey" });
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response: registered } = await new Register(params).register();
      const accountFound = await Account.findByPk(registered.id);
      const verifyParams = {
        accountId: accountFound.id,
        token: accountFound.verificationToken,
      };
      await new Verify(verifyParams).verify();
      const { response, errors } = await new Login({
        email,
        password: "invalid",
      }).authenticate();
      restoreMock();
      expect(response).toBeNull();
      expect(errors).toBeTruthy();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("Invalid email/password");
      expect(errors.code).toEqual(400);
    });
  });
});
