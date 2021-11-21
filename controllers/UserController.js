const { Account } = require("../models");
const { validatePassword } = require("../helpers/bcrypt");
const { encoding } = require("../helpers/jwt");
const { sendConfirmationEmail } = require("../helpers/confirmation");
const Register = require("../services/Account/Register");
const Verify = require("../services/Account/Verify");

class UserController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    const user = await Account.findOne({ where: { email } });
    if (user) {
      const passCompare = validatePassword(password, user.password);
      if (!user.isActive && passCompare)
        return next({
          name: "custom error",
          code: 403,
          message: `please verify your email first/${user.id}`,
        });
      if (passCompare)
        return res.status(200).json({
          id: user.id,
          name: user.name,
          token: encoding({
            id: user.id,
            email,
            name: user.name,
            birthdate: user.birthdate,
          }),
        });
    }
    return next({
      name: "custom error",
      code: 400,
      message: "Invalid email/password",
    });
  }

  static async register(req, res, next) {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
      return next({
        name: "custom error",
        code: 400,
        message: "All field are required",
      });

    const { response, errors } = await new Register(req.body).register();
    if (errors) next(errors);
    else res.status(201).json(response);
  }

  static async verify(req, res, next) {
    const { errors } = await new Verify(req.params).verify();
    if (errors) next(errors);
    else res.status(200).redirect(process.env.SERVER_URL);
  }

  static async changePassword(req, res, next) {
    const { accountId } = req.params;
    const { newPassword, securityAnswer } = req.body;
    const user = await Account.findByPk(accountId);
    if (user) {
      const securityAnswerCheck = securityAnswer === user.securityAnswer;
      if (securityAnswerCheck) {
        await Account.update(
          {
            password: newPassword,
          },
          {
            where: { id: accountId },
            individualHooks: true,
          }
        );
        return res.status(200).json({ status: "ok" });
      }
      return next({
        name: "custom error",
        code: 400,
        message: "Invalid security answer",
      });
    }
    return next({
      name: "custom error",
      code: 400,
      message: "Invalid id",
    });
  }

  static async resendMail(req, res, next) {
    const { accountId } = req.params;
    const user = await Account.findByPk(accountId);
    if (!user)
      return next({
        name: "custom error",
        code: 404,
        message: "user not found",
      });
    await sendConfirmationEmail(user.email, user.activationCode);
    return res.status(200).json({ status: "ok" });
  }
}

module.exports = UserController;
