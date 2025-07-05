const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    requestedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual field لحساب عدد الأشخاص يلي طلبوا الخدمة
serviceSchema.virtual("requestsCount").get(function () {
  return this.requestedBy.length;
});

module.exports = mongoose.model("Service", serviceSchema);
