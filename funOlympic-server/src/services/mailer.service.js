import createJob from "../config/queue.config.js";
import { RESET_OTP, SENT_OTP } from "../constants/mail.constant.js";

// { name, email }
// const sendWelcome = (welcomeMailerDto) => {
//   createJob(WELCOME_MSG, welcomeMailerDto);
// };

// { name, email, otp }
const sendOtp = (otpDto) => {
  createJob(SENT_OTP, otpDto);
};

// { name, email, otp }
const sendResetOtp = (resetOtp) => {
  createJob(RESET_OTP, resetOtp);
};

export { sendOtp, sendResetOtp };
