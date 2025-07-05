const SuccessStory = require("../models/SuccessStroy");
const fs = require('fs');
const path = require('path');

exports.createSuccessStory = async (req, res) => {
  try {
    const { title, name, age, story } = req.body;
    const image = req.file ? `/uploads/success-stories/${req.file.filename}` : '';
    
    const newStory = new SuccessStory({ 
      title, 
      name, 
      age, 
      story,
      image 
    });
    
    await newStory.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single success story by ID
exports.getSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id).populate('comments.user', 'fullName');
    if (!story) {
      return res.status(404).json({ error: "القصة غير موجودة" });
    }
    res.json(story);
  } catch (err) {
    console.error('Error fetching story:', err);
    res.status(500).json({ error: err.message });
  }
};

// Like or unlike a success story
exports.likeSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "القصة غير موجودة" });
    }

    const userId = req.user._id; // Assuming user ID is available from auth middleware
    const likedIndex = story.likes.indexOf(userId);

    if (likedIndex === -1) {
      // User hasn't liked, add like
      story.likes.push(userId);
    } else {
      // User has liked, remove like
      story.likes.splice(likedIndex, 1);
    }

    await story.save();
    res.json({ likes: story.likes.length, liked: likedIndex === -1 });
  } catch (err) {
    console.error('Error liking story:', err);
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to a success story
exports.addCommentToStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "القصة غير موجودة" });
    }

    const userId = req.user._id; // Assuming user ID is available from auth middleware
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "نص التعليق مطلوب" });
    }

    const newComment = {
      user: userId,
      text: text,
    };

    story.comments.push(newComment);
    await story.save();
    
    // Populate user info for the added comment before returning
    const populatedStory = await story.populate('comments.user', 'fullName');
    const addedComment = populatedStory.comments[populatedStory.comments.length - 1];

    res.status(201).json(addedComment);
  } catch (err) {
    console.error('Error adding comment to story:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get comments for a success story
exports.getCommentsForStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id).populate('comments.user', 'fullName');
    if (!story) {
      return res.status(404).json({ error: "القصة غير موجودة" });
    }
    res.json(story.comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "القصة غير موجودة" });
    }

    // Delete the image file if it exists
    if (story.image) {
      const imagePath = path.join(__dirname, '..', story.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await SuccessStory.findByIdAndDelete(req.params.id);
    res.json({ message: "تم حذف القصة بنجاح" });
  } catch (err) {
    console.error('Error deleting story:', err);
    res.status(500).json({ error: err.message });
  }
};