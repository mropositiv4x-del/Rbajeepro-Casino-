let balance = 1000;

function play() {
  fetch("https://YOUR_BACKEND_URL/play", {
    method: "POST"
  })
  .then(res => res.json())
  .then(data => {
    balance += data.win;
    document.getElementById("balance").innerText = balance;
    document.getElementById("result").innerText = data.message;
  });
}
