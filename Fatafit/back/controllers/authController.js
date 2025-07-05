const jwt = require("jsonwebtoken");
  
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "431998@@";
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
