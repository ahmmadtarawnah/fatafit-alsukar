const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

// إضافة نشاط
router.post("/activities", activityController.createActivity);

// الحصول على جميع الأنشطة
router.get("/activities", activityController.getActivities);

// الحصول على نشاط معين
router.get("/activities/:id", activityController.getActivityById);

// تحديث نشاط
router.put("/activities/:id", activityController.updateActivity);

// حذف نشاط
router.delete("/activities/:id", activityController.deleteActivity);

module.exports = router;

