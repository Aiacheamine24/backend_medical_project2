// External imports
const asyncHandler = require("../middleware/async");
const Patient = require("../Models/Patient");
const Departement = require("../Models/Departement");
const ErrorResponse = require("../utils/errorResponse");

// make a crud for patients use the staff.js in the controllers folder as a template

// @desc  get all patients by hospital
// @route   get /api/v1/patients
// @access  public
exports.getPatients = asyncHandler(async (req, res, next) => {
  // get all patients from the hospital use the following route "/:id/departements/:departementId/staff"
  const departments = await Departement.find({
    _id: req.params.departementId,
  }).populate("patients");

  if (!departments || departments.length === 0) {
    return next(
      new ErrorResponse(`Patients not found with id of ${req.params.id}`, 404)
    );
  }

  return res.status(200).send(departments[0].patients);
});

// @desc  get single patient
// @route   get /api/v1/patients/:id
// @access  public
exports.getPatientById = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  if (patient === null) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(patient);
});

// @desc  create patient
// @route   post /api/v1/patients
// @access  private
exports.createPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.create(req.body);
  res.status(201).send(patient);
});

// @desc  update patient
// @route   put /api/v1/patients/:id
// @access  private
exports.updatePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(patient);
});

// @desc  delete patient
// @route   delete /api/v1/patients/:id
// @access  private
exports.deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) {
    return next(
      new ErrorResponse(`Patient not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(patient);
});
