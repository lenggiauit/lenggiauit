const functions = require('firebase-functions');
import { Response } from "express"
//import { db } from "../data/firebase"
const nodemailer = require('nodemailer');

 
const mailTransport = nodemailer.createTransport({
  // Update this with your SMTP credentials and settings
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
  logger: true
});
 
 
type ContactInfo = {
  email: string,
  title: string,
  content: string,
}
type Request = {
  body: ContactInfo,
}

const sendContact = async (req: Request, res: Response) => {

  const { email} = req.body;

  try { 
    await mailTransport.sendMail({
      from: functions.config().gmail.email,
      to: email,
      subject: "Hello from node",
      text: "Hello world?",
      html: "<strong>Hello world?</strong>",
      headers: { 'x-myheader': 'test header' }
    });

    res.status(200).send({
      status: 'success',
      message: 'Sent email successfully'
    })
  } catch (e) {
    res.status(500).json((e as Error).message)
  }
}

export { sendContact }



