import { Player } from "./player.js";
import { Ball, Grid } from "./level.js";
import { keyPresses } from "./bind.js";

const grid = new Grid(1280, 720);
const player = new Player(128, 24, (grid.Width - 100) / 2, (grid.Height / 10));
const ball = new Ball(20, 20, player.X + (player.Width / 2) - (20 / 2), player.Y + player.Height);
const devConsole = document.querySelector(".console");

// Appends new player to the grid
player.Element.classList.add("player");
grid.Element.appendChild(player.Element);

// Appends ball to the grid
ball.Element.classList.add("ball");
grid.Element.appendChild(ball.Element);

// Sets game loop
const FPS_MAX = 60;
var now;
var then = Date.now();
var interval = 1000 / FPS_MAX;
var delta, dt;

window.requestAnimationFrame(gameLoop);
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  now = Date.now();
  delta = now - then;
  dt = delta / interval;

  if (delta > interval) {
    then = now - (delta % interval);

    player.update(keyPresses, grid.Width, dt);
    ball.update(dt);

    if (ball.collides(player)) {
      ball.Y = player.Y + ball.Height
      ball.dy = -ball.dy

      if (ball.X < player.X + (player.Width / 2) && player.dx < 0) {
        ball.dx = -5 + -(0.1 * (player.X + player.Width / 2 - ball.X))
      } else if (ball.X > player.X + (player.Width / 2) && player.dx > 0) {
        ball.dx = 5 + (0.1 * Math.abs(player.X + player.Width / 2 - ball.X))
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
  devConsole.querySelector(".player-x").innerHTML = "Player X: " + player.X;
  devConsole.querySelector(".player-y").innerHTML = "Player Y: " + player.Y;
  devConsole.querySelector(".player-w").innerHTML = "Player Width: " + player.Width;
  devConsole.querySelector(".player-h").innerHTML = "Player Height: " + player.Height;
  devConsole.querySelector(".player-dx").innerHTML = "Player dx: " + player.dx;  
  devConsole.querySelector(".ball-dx").innerHTML = "Ball dx: " + ball.dx;
  devConsole.querySelector(".ball-dy").innerHTML = "Ball dy: " + ball.dy;  
}