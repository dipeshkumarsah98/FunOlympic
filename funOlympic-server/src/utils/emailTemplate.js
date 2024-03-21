import Mailgen from "mailgen";

const APP_NAME = process.env.APP_NAME;
const CLIENT_URL = process.env.CLIENT_URL;

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: `${APP_NAME}`,
    link: "http://localhost:3000/",
    copyright: `Copyright © 2024 ${APP_NAME}. All rights reserved.`,
  },
});

export function sendOtpTemplate(otpMailerDto) {
  const { name, otp } = otpMailerDto;

  const template = {
    body: {
      name,
      title: "Verify your email address",
      intro:
        "Confirm it's you by entering the code. Ignore if you're not making an account.",
      action: {
        instructions: `<br><strong>To get started with ${APP_NAME}, Verify this OPT:</strong>`,
        button: {
          color: "#48cfad",
          text: otp,
          link: "#",
        },
      },
      outro:
        "We will never email you and ask you to disclose or verify your password.",
    },
  };

  return MailGenerator.generate(template);
}

export function sendPasswordResetTemplate(passwordResetDto) {
  const { name, email, opt } = passwordResetDto;

  const template = {
    body: {
      name,
      title: `Reset your password`,
      intro: `If you are not trying to reset your password please ignore this mail.`,
      action: {
        instructions: `<br><strong>You can reset your password using the button below. Your email will be expired in 3 Minute</strong>`,
        button: {
          color: "#414141",
          text: "Reset Password",
          link: `https://${CLIENT_URL}/passwordReset?token=${opt}`,
        },
      },
      outro:
        "Please do not reply to this email. Emails sent to this address will not be answered. <br>",
    },
  };

  return MailGenerator.generate(template);
}
