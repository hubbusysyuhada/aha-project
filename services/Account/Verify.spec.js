const TestHelper = require("../../helpers/testHelper");
const { Account } = require("../../models");
const Register = require("./Register");
const Verify = require("./Verify");

describe("Account/Verify Spec", () => {
  beforeEach(async () => {
    await TestHelper.truncate();
  });
  describe("success case", () => {
    it("verify account success", async () => {
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response } = await new Register(params).register();
      const accountFound = await Account.findByPk(response.id);
      const verifyParams = {
        accountId: accountFound.id,
        token: accountFound.verificationToken,
      };
      const { response: verifyResponse, errors } = await new Verify(
        verifyParams
      ).verify();
      const accountFound2 = await Account.findByPk(response.id);
      expect(accountFound2.isActive).toBeTruthy();
      expect(verifyResponse.ok).toBeTruthy();
      expect(errors).toBeNull();
    });
  });
  describe("failed case", () => {
    it("account already verified", async () => {
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response } = await new Register(params).register();
      const accountFound = await Account.findByPk(response.id);
      const verifyParams = {
        accountId: accountFound.id,
        token: accountFound.verificationToken,
      };
      await new Verify(verifyParams).verify();
      const { response: verifyResponse, errors } = await new Verify(
        verifyParams
      ).verify();
      expect(verifyResponse).toBeNull();
      expect(errors).toBeTruthy();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("Email already verified");
      expect(errors.code).toEqual(400);
    });
    it("invalid account id", async () => {
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response } = await new Register(params).register();
      const accountFound = await Account.findByPk(response.id);
      const verifyParams = {
        accountId: "invalid id",
        token: accountFound.verificationToken,
      };
      const { response: verifyResponse, errors } = await new Verify(
        verifyParams
      ).verify();
      expect(verifyResponse).toBeNull();
      expect(errors).toBeTruthy();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("Invalid id/token");
      expect(errors.code).toEqual(400);
    });
    it("invalid account token", async () => {
      const email = "johndoe@example.com";
      const password = "ThisIsJ0hn!";
      const name = "John Doe";
      const params = { email, password, name };
      const { response } = await new Register(params).register();
      const accountFound = await Account.findByPk(response.id);
      const verifyParams = {
        accountId: accountFound.id,
        token: "invalid token",
      };
      const { response: verifyResponse, errors } = await new Verify(
        verifyParams
      ).verify();
      expect(verifyResponse).toBeNull();
      expect(errors).toBeTruthy();
      expect(errors.name).toBe("custom error");
      expect(errors.message).toBe("Invalid id/token");
      expect(errors.code).toEqual(400);
    });
  });
});
