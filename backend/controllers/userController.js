const Delivery = require("../models/deliveryModel");
const User = require("../models/userModel");
const APIFEATURES = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/helpers");
const { sendSuccessResponseData } = require("../utils/helpers");

const filterObj = function (obj, ...allowedFields) {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

module.exports.getAllUser = catchAsync(async function (req, res) {
  const apiFeatures = new APIFEATURES(User, req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const users = await apiFeatures.query;

  const totalUsers = await User.countDocuments({ active: true });

  sendSuccessResponseData(res, "users", users, totalUsers);
});

module.exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Throw error if user Post password data
  if (req.body.password || req.body.passwordConfirm)
    throw new AppError(
      "This route is not for password updates. Please use /updateMyPassword",
      400
    );

  // 2) We dont want to update the email and name and other sensitive info
  const filteredBody = filterObj(req.body, "dob");

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  sendSuccessResponseData(res, "user", updatedUser);
});

module.exports.deleteMe = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  if (!user) throw new AppError("User not found", 404);

  res.status(204).json({});
});

module.exports.getUser = catchAsync(async function (req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) throw new AppError("No user was found", 404);

  sendSuccessResponseData(res, "user", user);
});

module.exports.getUserByEmail = catchAsync(async function (req, res) {
  const email = req.query.email;
  const user = await User.findOne({ email });
  if (!user) throw new AppError("No user was found", 404);

  sendSuccessResponseData(res, "user", user);
});

module.exports.Me = catchAsync(async function (req, res) {
  const user = await User.findById(req.user.id);
  if (!user) throw new AppError("No user was found", 404);

  sendSuccessResponseData(res, "user", user);
});

module.exports.getMyDeliveries = catchAsync(async function (req, res) {
  const apiFeatures = new APIFEATURES(
    Delivery.find({ user: req.user.id }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();

  const deliveries = await apiFeatures.query;

  sendSuccessResponseData(res, "deliveries", deliveries);
});

module.exports.getUserDeliveries = catchAsync(async function (req, res) {
  const apiFeatures = new APIFEATURES(
    Delivery.find({ user: req.params.guestId }),
    req.query
  )
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const deliveries = await apiFeatures.query;

  sendSuccessResponseData(res, "deliveries", deliveries);
});

// module.exports.updateGuest = catchAsync(async function (req, res) {
//   return res.status(500).json({
//     status: "error",
//     data: "This route is not yet defined",
//   });
// });

// module.exports.deleteGuest = catchAsync(async function (req, res) {
//   return res.status(500).json({
//     status: "error",
//     data: "This route is not yet defined",
//   });
// });
