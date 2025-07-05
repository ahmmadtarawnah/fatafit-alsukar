const Activity = require("../models/Activity");

// إنشاء نشاط جديد
const createActivity = async (req, res) => {
  try {
    const { name, description, date, category, beneficiaries, image } =
      req.body;
    const newActivity = new Activity({
      name,
      description,
      date,
      category,
      beneficiaries,
      image,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// الحصول على جميع الأنشطة
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// الحصول على نشاط معين حسب الـ ID
const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// تحديث نشاط
const updateActivity = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// حذف نشاط
const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
