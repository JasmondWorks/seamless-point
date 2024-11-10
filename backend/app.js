const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const globalErrorHandler = require("./controllers/errorController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const AppError = require("./utils/appError");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const driverRoutes = require("./routes/driverRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(
  hpp({
    whitelist: [],
  })
);

app.use(express.static(`${__dirname}/public`));

// Routes
app.use("/api/v1/users", userRoutes);

app.use("/api/v1/admins", adminRoutes);

app.use("/api/v1/delivery", deliveryRoutes);

app.use("/api/v1/drivers", driverRoutes);

app.use("/api/v1/notifications", notificationRoutes);

app.get("/", (_req, res) => {
  res.send("<h1>Deployment Check</h1>");
});

app.get("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
