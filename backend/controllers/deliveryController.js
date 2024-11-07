const Delivery = require("../models/deliveryModel");
const Driver = require("../models/driverModel");
const APIFEATURES = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const { catchAsync, sendSuccessResponseData } = require("../utils/helpers");

module.exports.createDelivery = catchAsync(async (req, res) => {
  // Add logic to check available balance before creating a delivery

  const newDelivery = await Delivery.create(req.body);

  sendSuccessResponseData(res, "delivery", newDelivery);
});

module.exports.getAllDelivery = catchAsync(async (req, res) => {
  const apiFeatures = new APIFEATURES(Delivery, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();

  const totalCount = await Delivery.countDocuments();

  const deliveries = await apiFeatures.query;

  sendSuccessResponseData(res, "delivery", deliveries, totalCount);
});

module.exports.getDelivery = catchAsync(async (req, res) => {
  const delivery = await Delivery.findOne({
    trackingId: req.params.id,
  }).populate("driver");

  if (!delivery) throw new AppError("Delivery could not be found", 404);

  sendSuccessResponseData(res, "delivery", delivery);
});

module.exports.updateDelivery = catchAsync(async (req, res) => {
  const { status, driver, user, ...rest } = req.body;

  if (driver)
    throw new AppError(
      "This route is not for assigning drivers. Use /assignDriver"
    );

  if (status && req.user.role === "user")
    throw new AppError(
      "You are not permitted to edit the status of a delivery",
      400
    );

  if (status)
    throw new AppError(
      "This route is not meant for status updates. Use /assignDriver, /complete",
      400
    );

  const delivery = await Delivery.findOneAndUpdate(
    { trackingId: req.params.id },
    rest,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!delivery) throw new AppError("Delivery could not be found", 404);

  if (delivery.status !== "unconfirmed") {
    throw new AppError("You cannot update this delivery", 400);
  }

  sendSuccessResponseData(res, "delivery", delivery);
});

module.exports.assignDriver = catchAsync(async (req, res) => {
  const { driverId } = req.body;

  if (!driverId) throw new AppError("Please specify a driver");

  const delivery = await Delivery.findOne({ trackingId: req.params.id });

  if (!delivery) throw new AppError("Delivery does not exist", 404);

  // To assign a driver;
  //1.  Check if the driver exists
  const driver = await Driver.findById(driverId);

  if (!driver) throw new AppError("No Driver was found with that ID", 404);

  //2.  Check if the driver is already assigned to another trip
  const currDelivery = await Delivery.find({
    driver: driverId,
    status: "ongoing",
  });

  console.log(currDelivery);
  //   const driver = await Driver.findOne({ id: driverId, status: "available" });

  if (currDelivery.length)
    throw new AppError("Driver is already assigned to another delivery", 400);

  //3. Update the delivery status to ongoing and assign the driver

  delivery.driver = driverId;
  delivery.status = "ongoing";
  driver.status = "on-duty";

  await driver.save({ validateBeforeSave: true });

  await delivery.save({ validateBeforeSave: true });

  // send email to user that their package has been assigned a rider

  sendSuccessResponseData(res, "delivery", delivery);
});

module.exports.completed = catchAsync(async (req, res) => {
  const delivery = await Delivery.findOne({ trackingId: req.params.id });

  const driver = await Driver.findById(delivery.driver);

  if (!driver) throw new AppError("No Driver was found with that ID", 404);

  driver.status = "available";
  delivery.status = "completed";

  await driver.save({ validateBeforeSave: true });
  await delivery.save({ validateBeforeSave: true });

  sendSuccessResponseData(res, "delivery", delivery);

  // Send an email to inform the user about the status of their delivery
});

module.exports.cancelled = catchAsync(async (req, res) => {
  const delivery = await Delivery.findOne({ trackingId: req.params.id });
  if (!delivery) throw new AppError("This delivery dosen't exist", 404);

  delivery.status = "cancelled";

  if (user.role === "admin") {
    // allow admin to cancel deliveries that are already processed but cannot be completed for some reason
    if (delivery.driver) {
      const driver = await Driver.findById(delivery.driver);
      if (!driver) throw new AppError("No Driver was found with that ID", 404);

      delivery.driver = "";
      driver.status = "available";

      await driver.save({ validateBeforeSave: true });
    }
  } else {
    if (delivery.status !== "unconfirmed")
      throw new AppError(
        "This delivery has already been processed and cannot be cancelled. If you are sure you want to cancel your delivery contact support.",
        400
      );
  }

  await delivery.save({ validateBeforeSave: true });
});

module.exports.deleteDelivery = catchAsync(async (req, res) => {
  // Only let drivery that are unconfirmed be deleted

  const delivery = await Delivery.findOne({ trackingId: req.params.id });

  if (!delivery) throw new AppError("This delivery dosen't exist", 404);

  if (delivery.status !== "unconfirmed")
    throw new AppError(
      "This delivery has already been processed and cannot be deleted",
      400
    );

  await Delivery.findOneAndDelete({ trackingId: req.params.id });

  res.status(200).json({});
});
