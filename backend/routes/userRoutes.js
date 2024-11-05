const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", authController.userLogin);

router.post("/signup", authController.userSignUp);

router.post("/signIn", authController.userSignIn);

router.post("/forgotPassword", authController.forgotUserPassword);

router.patch("/resetPassword/:token", authController.resetUserPassword);

router.get(
  "/myDeliveries",
  user.authenticate,
  user.authorize("user"),
  userController.getMyDeliveries
);

router.patch(
  "/updateMyPassword",
  authController.authenticate,
  authController.authorize("user"),
  authController.updateMyPassword
);

router.get(
  "/me",
  authController.authenticate,
  authController.authorize("user"),
  userController.Me
);

router.patch(
  "/updateMe",
  authController.authenticate,
  authController.authorize("user"),
  userController.updateMe
);

router.delete(
  "/deleteMe",
  authController.authenticate,
  authController.authorize("user"),
  userController.deleteMe
);

router.get(
  "/",
  authController.authenticate,
  authController.authorize("admin"),
  userController.getAllUser
);

module.exports = router;
