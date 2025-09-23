import "./style.css";
import { canvas } from "./canvas";
// import { setupCounter } from './counter.js'

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Breakout</h1>
    <canvas id="myCanvas" width="480" height="320"></canvas>
  </div>
`;

// setupCounter(document.querySelector('#counter'))

canvas();
