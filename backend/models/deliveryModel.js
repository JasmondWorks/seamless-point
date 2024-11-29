const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");

const generateTrackingID = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  8
);

const deliverySchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
      default: generateTrackingID,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: String,
      required: true,
    },
    aptUnit: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    deliveryTitle: {
      type: String,
      required: true,
    },
    amountOfItems: {
      type: Number,
      required: true,
    },
    instructions: {
      type: String,
    },
    toCountry: {
      type: String,
      required: true,
    },
    toState: {
      type: String,
      required: true,
    },
    toFirstname: {
      type: String,
      required: true,
    },
    toLastname: {
      type: String,
      required: true,
    },
    toCity: {
      type: String,
      required: true,
    },
    toStreet: {
      type: String,
      required: true,
    },
    toAptUnit: {
      type: String,
    },
    toEmail: {
      type: String,
      required: true,
    },
    toPhone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unconfirmed", "completed", "ongoing", "cancelled"],
      default: "unconfirmed",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
