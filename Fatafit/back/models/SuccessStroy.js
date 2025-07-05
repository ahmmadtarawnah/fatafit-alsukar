const mongoose = require("mongoose");

// Define a sub-schema for comments
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const successStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  story: { type: String, required: true },
  image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the story
  comments: [commentSchema] // Array of embedded comment objects
});

module.exports = mongoose.model("SuccessStory", successStorySchema);