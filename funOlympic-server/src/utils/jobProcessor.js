import mailer from "../config/mailer.config.js";
import { sendOtpTemplate, sendPasswordResetTemplate } from "./emailTemplate.js";

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const APP_NAME = process.env.APP_NAME;

const processOtpJob = async (job) => {
  console.log(`Sending verification Otp email to '${job.data.email}'`);
  try {
    const message = {
      from: EMAIL_ADDRESS,
      to: job.data.email,
      subject: `Registration OTP for ${APP_NAME}`,
      html: sendOtpTemplate(job.data),
    };
    return await mailer.sendMail(message);
  } catch (error) {
    console.log(`Failed to send Otp to '${job.data.email}'`);
  }
};

const passwordResetOtpJob = async (job) => {
  try {
    console.log(`Sending password reset otp email to '${job.data.email}'`);

    const message = {
      from: EMAIL_ADDRESS,
      to: job.data.email,
      subject: `OTP to reseat password ${APP_NAME}`,
      html: sendPasswordResetTemplate(job.data),
    };
    return await mailer.sendMail(message);
  } catch (error) {
    console.log(
      `Failed to send payment confirmation mail to '${job.data.email}'`
    );
  }
};

export { passwordResetOtpJob, processOtpJob };
