const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const db = require("../db/index.js");
const http = require("http");
const morgan = require("morgan");
const port = 4000;
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const app = express();

var accountSid = "ACeb037a93a8528cec109c437c0916f848"; // Your Account SID from www.twilio.com/console
var authToken = "d05f6d5257e89de0c0df562298c6e72e"; // Your Auth Token from www.twilio.com/console

var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

app.use(morgan());

app.use(express.json());
app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/patient", (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  console.log(req.body);
  console.log("hello");
  db.addPatient({
    firstName,
    lastName,
    phoneNumber: `+1${phoneNumber}`
  }).then(() => res.status(201).send("A new patient record has been created!"));
  client.messages
    .create({
      body: `Hello ${firstName}!\nAre or any of your family members currently experiencing any COVID-19 symptoms (e.g. fever, dry cough, shortness of breath)\nReply YES\nIf No symptoms\nReply NO`,
      to: `+1${phoneNumber}`, // Text this number
      from: `+12018842532` // From a valid Twilio number
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      console.log(err);
      res.status(404).end();
    });
});

app.post("/sms", (req, res) => {
  const incomingMsg = req.body;
  const twiml = new MessagingResponse();
  if (incomingMsg.Body.toLowerCase() === "yes") {
    twiml.message(
      `If you or your family member have fever and/or dry cough only\nReply ONLY.\nIf you have difficulty breathing in addition to the other symptoms\nReply BREATH `
    );
    db.findAndUpdateStatus(incomingMsg.From, { hasCovid19: true });
  }
  if (incomingMsg.Body.toLowerCase() === "no") {
    twiml.message(
      `That's great to hear!\nIf you or any of your family members experiance any of these symptoms in the following days or weeks.\nReply NOW whenever that happen!`
    );
  }

  if (
    incomingMsg.Body.toLowerCase() === "only" ||
    incomingMsg.Body.toLowerCase() === "now"
  ) {
    twiml.message(
      `Please follow this link https://app.greenhouse.io/availability/ to schedule your virtual appointment with one of our doctors.\nBecause you have a fever and/or cough, you might have COVID-19. Most people have mild illness and are able to recover at home. Keep track of your symptoms. if you ever feel that you have an emergency warning sign (including trouble breathing)\nReply BREATH to this chat thread to have one of our doctors call you IMMEDIATLEY\nFor the timebeing, do not leave your home for at least 14 days from the day the symptoms started.`
    );
    db.findAndUpdateStatus(incomingMsg.From, { hasCovid19: true });
  }
  if (incomingMsg.Body.toLowerCase() === "breath") {
    twiml.message(
      `Hang in there! The doctor will give you a call in 10-15 minutes`
    );
    db.findAndUpdateStatus(incomingMsg.From, { hasSOB: true });
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
