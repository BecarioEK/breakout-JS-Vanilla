export function canvas() {
  let canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  let ballRadius = 10;

  console.log(ctx);

  let x = canvas.width / 2;
  let y = canvas.height - 30;

  let dx = 2;
  let dy = -2;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#F8CD45";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dy = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }

    x += dx;
    y += dy;
  }

  setInterval(draw, 15);
}
