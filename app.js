import * as consts from "./constants.js";
import { Player } from "./player.js";
import { Ball, Grid } from "./level.js";

const grid = new Grid(consts.GRID_WIDTH, consts.GRID_HEIGHT);
const player = new Player(consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, consts.PLAYER_SPAWN_X, consts.PLAYER_SPAWN_Y);
const ball = new Ball(consts.BALL_WIDTH, consts.BALL_HEIGHT, consts.BALL_SPAWN_X, consts.BALL_SPAWN_Y);
const devConsole = document.querySelector(".console");

window.onload = function () {
  init();
  window.requestAnimationFrame(gameLoop);
};

function init() {
  // Binds keys press
  window.keyPresses = {};

  window.addEventListener('keydown', keyDownListener);
  function keyDownListener(event) {
    window.keyPresses[event.key] = true;
  }

  window.addEventListener('keyup', keyUpListener);
  function keyUpListener(event) {
    window.keyPresses[event.key] = false;
  }

  // Appends new player to the grid
  player.element.classList.add("player");
  grid.element.appendChild(player.element);

  // Appends ball to the grid
  ball.element.classList.add("ball");
  grid.element.appendChild(ball.element);
}

// Sets game loop
var now;
var then = Date.now();
var interval = 1000 / consts.FPS_MAX;
var delta, dt;
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  now = Date.now();
  delta = now - then;
  dt = delta / interval;

  if (delta > interval) {
    then = now - (delta % interval);

    player.update(grid.width, dt);
    ball.update(dt);

    if (ball.collides(player)) {
      ball.y = player.y + ball.height
      ball.dy = -ball.dy

      if (ball.x < player.x + (player.width / 2) && player.dx < 0) {
        ball.dx = -5 + -(0.1 * (player.x + player.width / 2 - ball.x))
      } else if (ball.x > player.x + (player.width / 2) && player.dx > 0) {
        ball.dx = 5 + (0.1 * Math.abs(player.x + player.width / 2 - ball.x))
      } else {
        ball.dx = Math.random() * (7 - -7) + -7;
      }
    }

    updateConsole(1000 / interval);
  }
}

// Developer console
function updateConsole(fps) {
  devConsole.querySelector(".fps").innerHTML = "FPS: " + Math.round(fps);
  devConsole.querySelector(".player-x").innerHTML = "Player X: " + player.x;
  devConsole.querySelector(".player-y").innerHTML = "Player Y: " + player.y;
  devConsole.querySelector(".player-w").innerHTML = "Player Width: " + player.width;
  devConsole.querySelector(".player-h").innerHTML = "Player Height: " + player.height;
  devConsole.querySelector(".player-dx").innerHTML = "Player dx: " + player.dx;  
  devConsole.querySelector(".ball-dx").innerHTML = "Ball dx: " + ball.dx;
  devConsole.querySelector(".ball-dy").innerHTML = "Ball dy: " + ball.dy;  
}