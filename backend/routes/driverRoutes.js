const express = require("express");
const driverController = require("../controllers/driverController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(
    authController.authenticate,
    authController.authorize("admin"),
    driverController.getAllDrivers
  )
  .post(authController.authenticate, driverController.createDriver);

router.get(
  "/:id",
  authController.authenticate,
  authController.authorize("admin"),
  driverController.getDriver
);
module.exports = router;
