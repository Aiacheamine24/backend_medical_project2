// Externals Imports
const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Publication = require("./models/Publication");
const Hospital = require("./models/Hospital");
const Department = require("./models/Departement");
const Staff = require("./models/Staff");
const Patient = require("./models/Patient");
// Load ENV Variables
dotenv.config({ path: "./config/config.env" });

// Load models

// Read JSON Files
const hospitals = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/hospitals.json`, "utf-8")
);
const departements = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/departements.json`, "utf-8")
);
const staffs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/staffs.json`, "utf-8")
);
const patients = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/patients.json`, "utf-8")
);

// Import Data Into Database
const importData = async () => {
  try {
    await Hospital.create(hospitals);
    await Department.create(departements);
    await Staff.create(staffs);
    await Patient.create(patients);
    await console.log("Data Imported...".green.inverse);
  } catch (error) {
    console.error(error);
  }
};

// Delete Data From Database
const deleteData = async () => {
  try {
    await Publication.deleteMany();
    await Hospital.deleteMany();
    await Department.deleteMany();
    await Staff.deleteMany();
    await Patient.deleteMany();
    console.log("Data Destroyed...".red.inverse);
  } catch (error) {
    console.error(error);
  }
};

// Main Function
const main = async () => {
  // Connect To MongoDB Database
  await mongoose.connect(process.env.MONGO_URI);
  switch (process.argv[2]) {
    case "-i":
      await importData();
      break;
    case "-d":
      await deleteData();
      break;
    case "-b":
      await deleteData();
      await importData();
      break;
    default:
      console.log("Invalid Command".red.inverse);
  }
  // Close Connection
  process.exit();
};
// Run Main Function
main();
