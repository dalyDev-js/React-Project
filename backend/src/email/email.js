import { createTransport } from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export default async function sendEmail(email) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "daly.dev.911@gmail.com",
      pass: "vbph tvzp bley gmog",
    },
  });
  // send mail with defined transport object
  let token = jwt.sign(email, "Don");
  const info = await transporter.sendMail({
    from: '"Don 👻" <daly.dev.911@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: template(token), // html body
  });

  console.log("Message sent: %s", info.messageId);
}
