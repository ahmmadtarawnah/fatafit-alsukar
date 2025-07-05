const express = require("express");
const router = express.Router();
const {
  getVolunteerRequestCount,
  getAllVolunteerRequests,
  updateVolunteerRequestStatus,
  approveVolunteerRequest,
} = require("../controllers/volunteerRequestController");

// Route: GET /api/requests/volunteer/count
router.get("/volunteer/count", getVolunteerRequestCount);

// GET العدد
router.get("/count", getVolunteerRequestCount);

// GET جميع الطلبات
router.get("/", getAllVolunteerRequests);

// PUT لتحديث الحالة
router.put("/:id", updateVolunteerRequestStatus);

router.post("/:id/approve", approveVolunteerRequest); // الموافقة أو التعليق

module.exports = router;
