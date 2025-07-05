const express = require("express");
const router = express.Router();
const {
  getPatientRequestCount,
  getPatientRequestsGrouped,
  getRequestsByServiceType,
  updatePatientRequestStatus,
  approveRequest,
} = require("../controllers/patientRequestController");

// Route: GET /api/requests/patient/count
router.get("/patient/count", getPatientRequestCount);
router.get("/grouped", getPatientRequestsGrouped);
router.get("/by-type/:serviceType", getRequestsByServiceType);
router.put("/:id", updatePatientRequestStatus);
router.post("/:id/approve", approveRequest);
module.exports = router;
