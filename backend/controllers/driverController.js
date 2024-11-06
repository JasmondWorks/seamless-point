const Driver = require("../models/driverModel");
const { catchAsync, sendSuccessResponseData } = require("../utils/helpers");
const APIFEATURES = require("../utils/apiFeatures");
const Delivery = require("../models/deliveryModel");

module.exports.getAllDrivers = catchAsync(async (req, res) => {
  const apiFeatures = new APIFEATURES(Driver, req.query)
    .sort()
    .filter()
    .limitFields()
    .paginate();

  const totalCount = await Driver.countDocuments();

  const data = await apiFeatures.query;

  sendSuccessResponseData(res, "driver", data, totalCount);
});

module.exports.getDriver = catchAsync(async (req, res) => {
  const driver = await Driver.findById(req.params.id);

  if (!driver) throw new AppError("No Driver was found with that ID", 404);

  sendSuccessResponseData(res, "driver", driver);
});

module.exports.createDriver = catchAsync(async (req, res) => {
  const newDriver = await Driver.create(req.body);
  sendSuccessResponseData(res, "driver", newDriver);
});
