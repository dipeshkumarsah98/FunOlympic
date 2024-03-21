import Queue from "bull";
import { passwordResetOtpJob, processOtpJob } from "../utils/jobProcessor.js";
import { MAIL_QUEUE, RESET_OTP, SENT_OTP } from "../constants/mail.constant.js";

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const emailQueue = new Queue(MAIL_QUEUE, {
  redis: { port: +REDIS_PORT, host: REDIS_HOST, password: REDIS_PASSWORD },
});

emailQueue.on("active", (job) => {
  console.log(`Processing job ${job.id} of type ${job.name}`);
});

emailQueue.on("completed", (job) => {
  console.log(`Completed job ${job.id} of type ${job.name}`);
});

emailQueue.on("failed", (job, error) => {
  console.log(
    `Failed job ${job.id} of type ${job.name}: ${error.message}`,
    error.stack
  );
});

emailQueue.process(SENT_OTP, processOtpJob);
emailQueue.process(RESET_OTP, passwordResetOtpJob);

export default function createJob(name, data) {
  const options = {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: true,
  };
  emailQueue.add(name, data, options);
}
