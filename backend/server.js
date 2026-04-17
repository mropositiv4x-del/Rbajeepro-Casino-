const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("../frontend"));

let users = [];

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../frontend/index.html");
});

// Register
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password, balance: 1000 });
  res.json({ message: "Registered" });
});

// Login
app.post("/api/login", (req, res) => {
  const user = users.find(
    u => u.username === req.body.username && u.password === req.body.password
  );

  if (!user) return res.status(401).json({ message: "Invalid" });

  res.json({ user });
});

// Balance
app.get("/api/balance/:username", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  res.json({ balance: user.balance });
});

// Bet
app.post("/api/bet", (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  const amount = req.body.amount;

  if (user.balance < amount) {
    return res.json({ result: "No balance" });
  }

  const win = Math.random() > 0.5;

  if (win) {
    user.balance += amount;
    res.json({ result: "WIN 🎉", balance: user.balance });
  } else {
    user.balance -= amount;
    res.json({ result: "LOSE ❌", balance: user.balance });
  }
});

app.listen(5000, () => console.log("Server running 🚀"));
