const Delivery = require("../models/deliveryModel");
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
  const delivery = await Delivery.findByIdAndUpdate(
    req.body.id,
    req.body.update,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!delivery) throw new AppError("Delivery could not be found", 404);

  sendSuccessResponseData(res, "delivery", delivery);
});

// module.exports.deleteDelivery = catchAsync(async (req, res) => {});
