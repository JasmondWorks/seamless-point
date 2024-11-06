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

module.exports = router;
