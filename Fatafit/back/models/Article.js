const mongoose = require("mongoose");

// Define a sub-schema for comments
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["قصص نجاح", "الصحة", "التغذية", "التمارين"],
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  archivedAt: {
    type: Date,
    default: null,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the article
  comments: [commentSchema] // Array of embedded comment objects
});

module.exports = mongoose.model("Article", articleSchema);
