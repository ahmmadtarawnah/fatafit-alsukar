const express = require("express");
const router = express.Router();
const {
  getMembershipRequestCount,
  getAllMembershipRequests,
  updateMembershipRequestStatus,
  approveMembershipRequest,
} = require("../controllers/membershipRequestController");

// مثال على المسارات:
// GET /api/requests/membership/ → جلب الكل
// GET /api/requests/membership/count → العد
// PUT /api/requests/membership/:id → تحديث الحالة

router.get("/count", getMembershipRequestCount); // عد الطلبات
router.get("/", getAllMembershipRequests); // جلب الكل
router.put("/:id", updateMembershipRequestStatus); // تحديث الحالة
router.post("/:id/approve", approveMembershipRequest); // الموافقة أو التعليق

module.exports = router;
