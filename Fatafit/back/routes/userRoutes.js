const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlware/authMiddleware");
const router = express.Router();
const { getUserCount, getUserCountByRole } = require("../controllers/userController");
const userController = require("../controllers/userController");


router.post("/login", auth.login);
router.post("/change-password", authMiddleware, auth.changePassword);
router.get("/me", authMiddleware, auth.getLoggedInUser);
router.get("/check", authMiddleware, auth.checkAuth);
router.post("/logout", auth.logout);
router.get("/all", auth.getAllUsers);
router.get("/count", getUserCount);
router.get("/count-by-role/user", getUserCountByRole);
router.put("/:id", userController.updateUserStatus);
router.put("/me", authMiddleware, userController.updateProfile);


  
module.exports = router;
