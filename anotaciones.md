<!-- Primer paso -->

```js

// Todo debe estar entre las clausulas begin y close Path
ctx.beginPath();
// Se define un rectangulo (params: posicion ejes => x, y, tamaño => width, height)
ctx.rect(20, 40, 50, 50);
// Se guarda un color que se utilizara por el método fill()
ctx.fillStyle = "#F8CD45";
ctx.fill();
ctx.closePath();

// ? Ejemplo de circulo
ctx.beginPath();
/_ Se define un circulo
Params:
Coordenadas: x e y
el radio del arco
Los ángulos inicial y final
La dirección hacia la que se dibujará _/
ctx.arc(240, 160, 20, 0, Math.PI \* 2, false);
ctx.fillStyle = "#2b42a4";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 225, 0.7)";
ctx.stroke();
ctx.closePath();
```
