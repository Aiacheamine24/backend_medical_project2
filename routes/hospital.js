// create routing for the hospital controller

const express = require("express");
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospital");
const {
  getDepartements,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departement");

const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient");

const {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staff");

const Hospital = require("../Models/Hospital");

const router = express.Router({ mergeParams: true });
const Patient = require("../Models/Patient");
const advancedResults = require("../middleware/advancedResults");

const { authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Hospital, "departments"), getHospitals)
  .post(authorize("admin"), createHospital);

router
  .route("/:id")
  .get(getHospital)
  .put(authorize("admin"), updateHospital)
  .delete(authorize("admin"), deleteHospital);

router
  .route("/:id/departements")
  .get(getDepartements)
  .post(authorize("admin"), createDepartment);

router
  .route("/:id/departements/:departmentId")
  .get(getDepartment)
  .put(authorize("admin"), updateDepartment)
  .delete(authorize("admin"), deleteDepartment);

router
  .route("/:id/departements/:departementId/staff")
  .get(getStaff)
  .post(authorize("admin"), createStaff);
router
  .route("/:id/departements/:departementId/staff/:staffId")
  .get(getStaffById)
  .put(authorize("admin"), updateStaff)
  .delete(authorize("admin"), deleteStaff);

router
  .route("/:id/departements/:departementId/patients")
  .get(getPatients)
  .post(authorize("admin"), createPatient);

router
  .route("/:id/departements/:departementId/patients/:patientId")
  .get(getPatientById)
  .put(authorize("admin"), updatePatient)
  .delete(authorize("admin"), deletePatient);

module.exports = router;
