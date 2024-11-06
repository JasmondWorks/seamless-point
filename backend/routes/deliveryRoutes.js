const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(
    authController.authenticate,
    authController.authorize("admin"),
    deliveryController.getAllDelivery
  )
  .post(authController.authenticate, deliveryController.createDelivery);

router.patch(
  "/:id/assignDriver",
  authController.authenticate,
  authController.authorize("admin"),
  deliveryController.assignDriver
);
module.exports = router;
