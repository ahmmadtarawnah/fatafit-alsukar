const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const membershipRoutes = require("./routes/membershipRequests");
const patientRequestRoutes = require("./routes/patientRequests");
const volunteerRequestRoutes = require("./routes/volunteerRequests");
const contactRoutes = require('./routes/contactRoutes');
const articlesRoutes = require("./routes/articlesRoutes");
const donationRoutes = require("./routes/donationRoutes");
const path = require("path");
const fs = require("fs");

const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const serviceRoutes = require("./routes/serviceRoutes")
const activityRoutes = require("./routes/activityRoutes");
const successStoryRoutes = require("./routes/SuccessStroyRoutes");
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require("./routes/authRoutes");

/****************************************************************** */

// CORS middleware should be here, before any routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use('/api', adminRoutes);
/****************************************************************** */

//************************************************************************************************** */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
//************************************************************************************************** */

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads/success-stories');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", activityRoutes);
app.use("/api/articles", articlesRoutes);

// المسارات الخاصة بأنواع الطلبات
app.use("/api/requests/membership", membershipRoutes);
app.use("/api/requests/patient", patientRequestRoutes);
app.use("/api/requests/volunteer", volunteerRequestRoutes);

app.use("/api/requests", patientRequestRoutes);
app.use("/api/requests", volunteerRequestRoutes);

app.use('/api/contact', contactRoutes);

app.use("/api/donations", donationRoutes);
app.use("/api/success-stories", successStoryRoutes);

/*******************************************************************/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
