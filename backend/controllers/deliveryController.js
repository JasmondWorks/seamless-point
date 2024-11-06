const Delivery = require("../models/deliveryModel");
const Driver = require("../models/driverModel");
const APIFEATURES = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const {
  catchAsync,
  sendSuccessResponseData,
  filterObj,
} = require("../utils/helpers");

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

  const totalCount = Delivery.countDocuments();

  const deliveries = await apiFeatures.query;

  sendSuccessResponseData(res, "deliveries", deliveries, totalCount);
});

module.exports.getDelivery = catchAsync(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id).populate("driver");

  if (!delivery) throw new AppError("Delivery could not be found", 404);

  sendSuccessResponseData(res, "delivery", delivery);
});

module.exports.updateDelivery = catchAsync(async (req, res) => {
  const { status, user, ...rest } = req.body;

  if (status)
    throw new AppError(
      "You are not permitted to edit the status of a delivery",
      400
    );

  const delivery = await Delivery.findByIdAndUpdate(req.params.id, rest, {
    new: true,
    runValidators: true,
  });

  if (!delivery) throw new AppError("Delivery could not be found", 404);

  if (delivery.status !== "unconfirmed") {
    throw new AppError("You cannot update this delivery", 400);
  }

  sendSuccessResponseData(res, "delivery", delivery);
});

module.exports.assignDriver = catchAsync(async (req, res) => {
  const { driverId } = req.body;

  if (!driverId) throw new AppError("Please specify a driver");

  const delivery = await Delivery.findById(req.params.id);

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
  //   const driver = await Driver.findOne({ id: driverId, status: "available" });

  console.log(currDelivery);

  if (currDelivery.length)
    throw new AppError("Driver is already assigned to another delivery", 400);

  delivery.driver = driverId;
  delivery.status = "ongoing";
  driver.status = "on-duty";

  await driver.save({ validateBeforeSave: true });

  await delivery.save({ validateBeforeSave: true });

  sendSuccessResponseData(res, "delivery", delivery);
});

// module.exports.deleteDelivery = catchAsync(async (req, res) => {
// });
