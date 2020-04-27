const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = mongoose.connection;
mongoose.connect("mongodb://localhost/medicalCenter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Our database is connected!");
});

const patientSchema = new mongoose.Schema({
  firstName: String,
  LastName: Number,
  phoneNumber: String,
  hasCovid19: { type: Boolean, default: false },
  hasSOB: { type: Boolean, default: false },
  created: { type: Date, default: new Date() }
});

const Patient = mongoose.model("Patient", patientSchema);

const addPatient = record => {
  return new Promise((resolve, reject) => {
    let patient = new Patient(record);
    patient.save().exec();
  });
};

const findAndUpdateStatus = (phoneNumber, status) => {
  return new Promise((resolve, reject) => {
    Patient.findOneAndUpdate(phoneNumber, status).exec();
  });
};

module.exports = { db, addPatient, findAndUpdateStatus };
