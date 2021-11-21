const nodemailer = require("nodemailer");

async function sendConfirmationEmail(email, payload) {
  const { id, token } = payload;
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    if (process.env.NODE_ENV !== "test") {
      await transporter.sendMail({
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: "Todos Email Verification",
        html: `Welcome to <b>Todos</b>
              <br>
              <br>
              Click <a href="${process.env.SERVER_URL}/verify/${id}/${token}">here<a/> to verify your account
              <br>
              <br>
              Glad to welcome you =)
              <br>
              <br>
              <b>Kinerjaqu Team</b>
              <br>
              <br>
              For further inquirires: <a href="https://www.linkedin.com/in/hubbusysyuhada">Linkedin</a>, <a href="https://github.com/hubbusysyuhada">Github</a>, or <a href="wa.me/+6282233197540">Whatsapp</a>
              `,
      });
    }
  } catch (error) {
    console.log(error, "<<< confirmation error");
  }
}

module.exports = {
  sendConfirmationEmail,
};
