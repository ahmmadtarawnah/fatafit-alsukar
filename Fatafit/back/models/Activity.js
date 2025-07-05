const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  beneficiaries: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
