const { catchAsync, sendSuccessResponseData } = require("../utils/helpers");
const APIFEATURES = require("../utils/apiFeatures");
const Notifications = require("../models/notificationModel");

module.exports.getAllNotifications = catchAsync(async (req, res) => {
  const apiFeatures = new APIFEATURES(Notifications, req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const totalCount = await Notifications.countDocuments();

  const notifications = await apiFeatures.query;

  sendSuccessResponseData(res, "notifications", notifications, totalCount);
});

module.exports.getUserNotifications = catchAsync(async function (req, res) {
  const apiFeatures = new APIFEATURES(
    Notifications.find({ user: req.params.id }),
    req.query
  )
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const notifications = await apiFeatures.query;

  sendSuccessResponseData(res, "notifications", notifications);
});

module.exports.getNotification = catchAsync(async (req, res) => {
  const notificationId = req.params.id;

  const notification = await Notifications.findById(notificationId);

  if (!notification) throw new AppError("Notification could not be found", 404);

  sendSuccessResponseData(res, "notification", notification);
});

module.exports.updateNotification = catchAsync(async (req, res) => {
  const notificationId = req.params.id;

  const notification = await Notifications.findByIdAndUpdate(
    notificationId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!notification) throw new AppError("Notification could not be found", 404);

  sendSuccessResponseData(res, "notification", notification);
});

module.exports.deleteNotification = catchAsync(async (req, res) => {
  const notificationId = req.params.id;

  const notification = await Notifications.findByIdAndDelete(notificationId);

  if (!notification) throw new AppError("Notification could not be found", 404);

  res.status(200).json({});
});
