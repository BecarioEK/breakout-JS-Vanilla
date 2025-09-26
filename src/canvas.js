export function canvas() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let ballRadius = 10;

  // console.log(ctx);

  let x = canvas.width / 2;
  let y = canvas.height - 30;

  let dx = 2;
  let dy = -2;
  // id del frame y bandera para controlar el estado del juego
  let animationId = null;
  let isGameOver = false;

  // Definicion de la paleta del jugador
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;
  // Controles
  let leftPressed = false;
  let rightPressed = false;

  // Bloques
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOfsetTop = 30;
  const brickOfsetLeft = 30;

  const bricks = [];

  for (let col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
      bricks[col][row] = { x: 0, y: 0 };
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }

  // * Generar un color HEX
  function getRandomHexColor() {
    const randomInt = Math.floor(Math.random() * 16777215);
    const hexCode = randomInt.toString(16);
    return `#${hexCode.padStart(6, "0")}`;
  }

  let myRandomColor = getRandomHexColor();

  // * FN draw
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = myRandomColor;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000f45ff";
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let col = 0; col < brickColumnCount; col++) {
      for (let row = 0; row < brickRowCount; row++) {
        const brickX = col * (brickWidth + brickPadding) + brickOfsetLeft;
        const brickY = row * (brickHeight + brickPadding) + brickOfsetTop;
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        ctx.beginPath();
        ctx.rect(0, 0, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  // * Dibuja un mensaje de Game Over en el centro del canvas
  function drawGameOverText() {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }

  // Detener la animación y limpiar listeners
  function gameOver() {
    isGameOver = true;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    // quitar listeners de teclado para que no se pueda mover la paleta
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyUpHandler, false);
    // mostrar texto de fin de juego
    drawGameOverText();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBricks();
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
      // myRandomColor = getRandomHexColor();
    }
    // if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    if (y + dy < ballRadius) {
      dy = -dy;
      // myRandomColor = getRandomHexColor();
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dx -= 1;
        dy += 1;
        dy = -dy;
        myRandomColor = getRandomHexColor();
      } else {
        console.log("GAME OVER");
        gameOver();
      }
    }

    // Paleta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 10;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 10;
    }

    x += dx;
    y += dy;
  }

  // setInterval(draw, 10);

  // * Mejora en las animaciones
  // Usar requestAnimationFrame en lugar de setInterval para animaciones más suaves
  // y para que el navegador optimice el repintado según la pestaña / pantalla.

  function loop() {
    draw();
    // Sólo programar el siguiente frame si el juego no ha terminado
    if (!isGameOver) {
      animationId = requestAnimationFrame(loop);
    }
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
