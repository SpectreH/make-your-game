import { Player } from "./player.js";
import { Grid } from "./grid.js";
import { keyPresses } from "./bind.js";

const grid = new Grid(1280, 720)
const player = new Player(20, 100, (grid.Width - 100) / 2, (grid.Height / 10));
const console = document.querySelector(".console")

// Appends new player to the grid
player.Element.classList.add("player")
grid.Element.appendChild(player.Element)

// Sets game loop
window.requestAnimationFrame(gameLoop);
function gameLoop() {
  console.querySelector(".player-x").innerHTML = "Player X: " + player.X;
  console.querySelector(".player-y").innerHTML = "Player Y: " + player.Y;
  console.querySelector(".player-w").innerHTML = "Player Width: " + player.Width;
  console.querySelector(".player-h").innerHTML = "Player Height: " + player.Height;

  if (keyPresses.a && player.X > 0) {
    player.X -= player.Speed;
    player.Element.style.left = player.X + "px"
  }
  if (keyPresses.d && (grid.Width - player.Width) - player.X > 0) {
    player.X += player.Speed;
    player.Element.style.left = player.X + "px"
  }

  window.requestAnimationFrame(gameLoop);
}