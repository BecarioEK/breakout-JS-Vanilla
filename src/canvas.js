export function canvas() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let ballRadius = 10;

  // console.log(ctx);

  let x = canvas.width / 2;
  let y = canvas.height - 30;

  let dx = 2;
  let dy = -2;

  // * Generar un color HEX

  function getRandomHexColor() {
    const randomInt = Math.floor(Math.random() * 16777215);
    const hexCode = randomInt.toString(16);
    return `#${hexCode.padStart(6, "0")}`;
  }

  let myRandomColor = getRandomHexColor();

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = myRandomColor;
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
      myRandomColor = getRandomHexColor();
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
      myRandomColor = getRandomHexColor();
    }

    x += dx;
    y += dy;
  }

  // setInterval(draw, 10);

  // * Mejora en las animaciones
  // Usar requestAnimationFrame en lugar de setInterval para animaciones más suaves
  // y para que el navegador optimice el repintado según la pestaña / pantalla.
  let animationId = null;

  function loop() {
    draw();
    animationId = requestAnimationFrame(loop);
  }

  // Inicia la animación
  animationId = requestAnimationFrame(loop);

  // Opcional: devolver un objeto con stop para poder cancelar la animación desde fuera
  return {
    stop() {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}
