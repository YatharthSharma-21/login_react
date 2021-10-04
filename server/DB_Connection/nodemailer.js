import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let smtpTrans = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export default smtpTrans;
