const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middlware/authMiddleware");
const {
  createSuccessStory,
  getSuccessStories,
  getSuccessStory,
  deleteSuccessStory,
  likeSuccessStory,
  addCommentToStory,
  getCommentsForStory
} = require("../controllers/SuccessStoryController");

router.post("/", upload.single('image'), createSuccessStory);
router.get("/", getSuccessStories);
router.get("/:id", getSuccessStory);
router.delete("/:id", deleteSuccessStory);

// Routes for likes and comments
router.post("/:id/like", authMiddleware, likeSuccessStory);
router.post("/:id/comments", authMiddleware, addCommentToStory);
router.get("/:id/comments", authMiddleware, getCommentsForStory); // Assuming comments require authentication to view

module.exports = router;