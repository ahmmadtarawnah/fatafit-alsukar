const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // صورة مرفقة بالنشرة
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
//نشرات توعويه