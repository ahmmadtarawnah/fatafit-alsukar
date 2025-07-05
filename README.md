
# Fatafeet - MERN Stack Web Application

Welcome to **Fatafeet**, a community-driven platform dedicated to supporting children with diabetes in Jordan through awareness, educational tools, and community engagement.

---

## 🛠️ Tech Stack

This project is built with the **MERN** stack:

- **MongoDB** – NoSQL database
- **Express.js** – Backend web framework
- **React.js** – Frontend library
- **Node.js** – Runtime environment

---

## 📁 Project Structure

```
fatafeet/
├── front/            # React frontend
├── back/            # Express backend & API
└── README.md          # Project documentation
```
---

## 📌 Key Features

- 🏥 Success stories, Support content for diabetic children and their families
- 🗓️ Event management for workshops, awareness days, and camps
- 🧑‍⚕️ Volunteer and donation system
- 📚 Admin dashboard for managing website content and users
- 🔒 User authentication & protected routes

---

## 🚀 How to Run (Quick Setup)

1. Install dependencies:

```bash
cd back && npm install
cd ../front && npm install
```

2. Setup your `.env` in `/back` (refer to setup instructions).

3. Restore the local database backup:

```bash
mongorestore --db fatafeet ./database-backup
```

4. Run the app:

```bash
# Backend
cd back && npm run dev

# Frontend
cd ../front && npm start
```


# Fatafeet - Local Setup Instructions

These instructions are tailored for setting up the "Fatafeet" MERN stack project using local files, not from a Git repository.

---

## ✅ 1. Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (installed locally)
- **Code Editor** (e.g., Visual Studio Code)

---

## 📦 2. Extract the Project Files

If the client received a `.zip` file (e.g., `fatafeet.zip`):

1. Unzip it to your desired location, for example:
   ```
   Documents/
   └── fatafeet/
   ```

---

## 🧾 3. Environment Variables

Navigate to the `server/` directory and create a file named `.env` with this content:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fatafeet
JWT_SECRET=your_secure_secret_here
CLIENT_URL=http://localhost:3000
```

> You may update the `MONGO_URI` if you're using MongoDB Atlas instead of local MongoDB.

---

## 📁 4. Install Project Dependencies

Run the following commands to install the dependencies:

### Backend (Node.js + Express)

```bash
cd fatafeet/back
npm install
```

### Frontend (React)

```bash
cd ../front
npm install
```

---

## 💾 5. Restore MongoDB Database

If a database backup is provided under `fatafeet/backup/`, follow these steps:

1. Ensure MongoDB is running locally. (install MongoDB tools if needed)
2. Use this command to restore the data:

```bash
mongorestore --db fatafeet ./backup
```

---

## ▶️ 6. Run the Application

### Start Backend:

```bash
cd fatafeet/back
npm run dev
```

### Start Frontend:

```bash
cd ../front
npm start
```

Visit the application in your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 7. Optional: Build for Production

To generate a production build of the React frontend:

```bash
cd front
npm run build
```

You can then serve the contents of the `client/back/` folder using any static server or integrate it with the backend.

---

## ✅ Notes

- Double-check that MongoDB contains the correct data after restore.
- Make sure `.env` values are customized before running in production.
- You may configure deployment separately based on hosting (optional).

---

If any issues arise during setup, consult developers

---

## 📄 License

This project is intended for educational and non-profit use. Please consult the project owner for commercial usage.

---

## 🤝 Acknowledgments

Thanks to all the contributors, medical advisors, developers, volunteers, and children who made this platform possible.

---
