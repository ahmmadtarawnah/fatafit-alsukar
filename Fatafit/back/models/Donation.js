const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["cash", "in-kind"],
    required: true,
  },
  description: {
    type: String,
  },
  value: {
    type: Number, // في حالة التبرع النقدي
  },
  item: {
    type: String, // في حالة التبرع العيني (مثل: مضخة، إبر إنسولين)
  },
  donorName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryMethod: { type: String }, // "bring_to_association" or "association_pickup"
  address: {
    governorate: String,
    address: String,
    street: String,
    buildingNumber: String,
  },
  donorPhone: String,
});

module.exports = mongoose.model("Donation", donationSchema);
