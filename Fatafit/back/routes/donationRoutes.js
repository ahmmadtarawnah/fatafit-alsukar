const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// POST /api/donations/items
router.post("/items", async (req, res) => {
  try {
    const {
      deviceName,
      deviceStatus,
      deliveryMethod,
      address, // { governorate, address, street, buildingNumber }
      donorName,
      donorPhone,
    } = req.body;

    const donation = new Donation({
      type: "in-kind",
      description: deviceStatus,
      item: deviceName,
      donorName,
      donorPhone,
      deliveryMethod,
      address,
    });

    await donation.save();
    res.status(201).json({ message: "تم استلام تبرعك العيني بنجاح!" });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء الإرسال.", error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: 'فشل في جلب التبرعات' });
  }
});
module.exports = router; 