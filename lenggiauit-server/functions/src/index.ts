import * as functions from "firebase-functions"; 
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);   
const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
// const cors = require("cors")({
//   origin: true
// });
// //const express = require("express"); 
// //const app = express()
// // my routings
// // const apiRoute = require("./api")

// // // add routes to the express app.
// // app.use("/api", apiRoute)
 
// // exports.api = functions.https.onRequest(app);


const smtpTransport = require('nodemailer-smtp-transport');
const cors = require("cors")({
  origin: true
});

var mailTransport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'lenggiauit@gmail.com',
    pass: 'Gi@u29128800',
  }
}));

 
 
 
export const sendcontact = functions.https.onRequest(async (req, res) => {

  const { email} = req.body;

  try { 
    return cors(req, res, async () => {
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
    })
  } catch (e) {
    res.status(500).json((e as Error).message)
  }
 
});
 
  


exports.emailMessage = functions.https.onRequest(async (req, res) => {
  const { name, email, phone, message } = req.body;
  return cors(req, res, async () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${name || ""}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Phone - ${phone || ""}
        </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ""}</p>
    </div>`;
     var sesAccessKey = 'lenggiauit88@gmail.com';
     var sesSecretKey = '29128800';

     var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
          user: sesAccessKey,
          pass: sesSecretKey
      }
    }));
    const mailOptions = {
      to: "nastories.vn@gmail.com",
      from: "lenggiauit@gmail.com",
      subject: `${name} sent you a new message`,
      text: text,
      html: text
    };
    
    await transporter.sendMail(mailOptions, function(error: { message: any; }, info: any){
     if(error){
        console.log(error.message);
        res.status(200).send({
          message: "failed: " + error.message
        })
     }
     else{
     res.status(200).send({
       message: "success"
     })
    }
    });
  }) 



});