import { createTransport } from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;
