const mongoose = require('mongoose');

const membershipRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phonenumber: { type: String, required: true },
    birthDate: { type: Date, required: true }, // 👈 تمت إضافته
    additionalInfo: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }, { timestamps: true });

  module.exports = mongoose.model('MembershipRequest', membershipRequestSchema);
  