// External imports
const Departement = require("../Models/Departement");
const Staff = require("../Models/Staff");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc  get all staff by hospital
// @route   get /api/v1/staff
// @access  public
exports.getStaff = asyncHandler(async (req, res, next) => {
  // get all staff from the hospital use the following route "/:id/departements/:departementId/staff"
  const staff = await Departement.find({
    _id: req.params.departementId,
  }).populate("staff");

  return res.status(200).send(staff[0].staff);
});

// @desc  get single staff
// @route   get /api/v1/staff/:id
// @access  public
exports.getStaffById = asyncHandler(async (req, res, next) => {
  const { departementId, id, staffId } = req.params;

  const department = await Departement.findOne({
    _id: departementId,
    hospital: id,
  }).populate({
    path: "staff",
    match: { _id: staffId },
  });

  if (!department || !department.staff || department.staff.length === 0) {
    return next(
      new ErrorResponse(`Staff not found with id of ${staffId}`, 404)
    );
  }

  res.status(200).send(department.staff);
});

// @desc  create staff
// @route   post /api/v1/staff
// @access  private
exports.createStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.create(req.body);
  res.status(201).send(staff);
});

// @desc  update staff
// @route   put /api/v1/staff/:id
// @access  private
exports.updateStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    return next(
      new ErrorResponse(`Staff not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send(staff);
});

// @desc  delete staff
// @route   delete /api/v1/staff/:id
// @access  private
exports.deleteStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.findByIdAndDelete(req.params.id);
  if (!staff) {
    return next(
      new ErrorResponse(`Staff not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).send({});
});
