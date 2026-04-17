const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/play", (req, res) => {
  let random = Math.random();

  let result;
  let win = 0;

  if (random > 0.7) {
    win = 200;
    result = "🎉 You Win!";
  } else {
    win = -100;
    result = "❌ You Lose!";
  }

  res.json({
    win: win,
    message: result
  });
});

app.listen(3000, () => console.log("Server running"));
