const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  paid: { type: Boolean, default: false }
});

const summerClubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  moreInfo: { type: String, required: true },
  maxChildren: { type: Number, required: true },
  costPerChild: { type: Number, required: true },
  image: { type: String, required: true },
  registrations: [registrationSchema]
});

module.exports = mongoose.model('SummerClub', summerClubSchema); 