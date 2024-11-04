const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.userLogin);

router.post("/signup", authController.userSignUp);

router.post("/signIn", authController.userSignIn);

router.post("/forgotPassword", authController.forgotUserPassword);

router.patch("/resetPassword/:token", authController.resetUserPassword);

router.patch(
  "/updateMyPassword",
  authController.authenticate,
  authController.authorize("user"),
  authController.updateMyPassword
);

// router.get("/me", authController.authenticate, authController.authorize("guest"), authController.Me);

// router.patch("/updateMe", authController.authenticate, authController.authorize("guest"), authController.updateMe);

// router.get("/", authController.authenticate, authController.authorize("admin"), guestController.getAllGuest);

module.exports = router;
