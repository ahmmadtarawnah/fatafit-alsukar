// const express = require("express");
// const router = express.Router();
// const serviceController = require("../controllers/serviceController");

// router.post("/", serviceController.createService);
// router.get("/", serviceController.getAllServices);
// router.get("/:id", serviceController.getServiceById);
// router.put("/:id", serviceController.updateService);
// router.delete("/:id", serviceController.deleteService);

// module.exports = router;


// serviceRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  requestService
} = require('../controllers/serviceController');

// Middleware for authentication (should be implemented separately)
// const { protect, authorize } = require('../middleware/auth');

// Service routes
router.route('/')
  .get(getAllServices)
  .post(createService); // In production, add authentication: .post(protect, authorize('admin'), createService)

router.route('/:id')
  .get(getServiceById)
  .put(updateService) // In production, add authentication: .put(protect, authorize('admin'), updateService)
  .delete(deleteService); // In production, add authentication: .delete(protect, authorize('admin'), deleteService)

// Route for requesting a service
router.route('/:id/request')
  .post(requestService); // In production, add authentication: .post(protect, requestService)

module.exports = router;