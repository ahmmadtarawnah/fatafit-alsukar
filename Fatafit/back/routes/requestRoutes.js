const express = require("express");
const router = express.Router();
const request = require("../controllers/requestController");
const { upload } = require("../middlware/uploadMiddleware");


router.post("/", upload.array("attachments", 5), request.createRequest);
router.post("/volunteer", request.createVolunteerRequest);
router.post("/membership", request.createMembershipRequest);

module.exports = router;
