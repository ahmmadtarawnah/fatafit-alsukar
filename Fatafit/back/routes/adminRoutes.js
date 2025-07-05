const express = require('express');
const router = express.Router();
const summerClubController = require('../controllers/summerClubController');
const upload = require('../middleware/upload');

// Add a new summer club (admin only)
router.post('/summer-clubs', upload.single('image'), summerClubController.createSummerClub);

// Get all summer clubs
router.get('/summer-clubs', summerClubController.getAllSummerClubs);

// Get a single summer club
router.get('/summer-clubs/:id', summerClubController.getSummerClub);

router.post('/summer-clubs/:id/register', summerClubController.registerForClub);

// Confirm payment for a registration
router.post('/summer-clubs/:id/confirm-payment', summerClubController.confirmPayment);

router.delete('/summer-clubs/:id', summerClubController.deleteSummerClub);

module.exports = router; 