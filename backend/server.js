const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Fake database (for demo)
let users = [];

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Register API
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.json({ message: "User already exists" });
  }

  const user = {
    username,
    password,
    balance: 1000
  };

  users.push(user);

  res.json({ message: "Registered successfully", user });
});

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login success", user });
});

// Get Balance
app.get("/api/balance/:username", (req, res) => {
  const user = users.find(u => u.username === req.params.username);

  if (!user) {
    return res.json({ balance: 0 });
  }

  res.json({ balance: user.balance });
});

// Bet API 🎰
app.post("/api/bet", (req, res) => {
  const { username, amount } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.balance < amount) {
    return res.json({ result: "Not enough balance ❌" });
  }

  // Random win/lose
  const win = Math.random() > 0.5;

  if (win) {
    user.balance += amount;
    res.json({ result: "WIN 🎉", balance: user.balance });
  } else {
    user.balance -= amount;
    res.json({ result: "LOSE ❌", balance: user.balance });
  }
});

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
