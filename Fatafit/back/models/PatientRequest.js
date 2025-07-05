const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    additionalInfo: {
      type: String,
    },
    attachments: [{
      type: String, // اسم الملف
      default: [],
    }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientRequest", requestSchema);
