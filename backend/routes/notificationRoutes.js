const authController = require("../controllers/authController");
const notificationController = require("../controllers/notificationController");

const router = require("express").Router();

router.get(
  "/",
  authController.authenticate,
  authController.authorize("admin"),
  notificationController.getAllNotifications
);

router
  .route("/:id")
  .patch(
    authController.authenticate,
    authController.authorize("admin"),
    notificationController.getNotification
  )
  .delete(
    authController.authenticate,
    authController.authorize("admin"),
    notificationController.deleteNotification
  );

module.exports = router;
