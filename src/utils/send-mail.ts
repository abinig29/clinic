import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { validateEnv } from "../config/config";
import { logger } from "./logger";

interface MailOptions {
  email: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export const sendMail = async (options: MailOptions): Promise<void> => {
  const env = validateEnv()?.smtp
  const transporter = nodemailer.createTransport({
    host: env.host,
    port: Number(env.port),
    service: env.service,
    auth: {
      user: env.mail,
      pass: env.password,
    },
  });
  const { email, subject, template, data } = options;
  const paths = `./src/mails/${template}`
  const html = await ejs.renderFile(paths, data);
  const mailOption = {
    from: env.mail,
    to: email,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOption);
    logger.info("Email sent: " + info.response);
  } catch (error) {
    logger.error({ error });
  }
};
