// Player class
class Player {
  constructor(xStartPos, yStartPos) {
    this.Height = 20;
    this.Width = 100;
    this.X = xStartPos;
    this.Y = yStartPos;
    this.Element = document.createElement("div");
  }
}

// Grid class
class Grid {
  constructor(w, h) {
    this.Width = w;
    this.Height = h;
    this.Element = document.querySelector(".grid")

    this.Element.style.height = this.Height + "px";
    this.Element.style.width = this.Width + "px";
  }
}

const grid = new Grid(560, 300)
const player = new Player(230, 10);

// append new player
player.Element.classList.add("player")
grid.Element.appendChild(player.Element)
drawPlayer()

// bind movement keys
document.addEventListener("keydown", movePlayer)
function movePlayer(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (player.X > 0) {
        player.X -= 10
        drawPlayer()
      }
      break
    case "ArrowRight":
      if (player.X < (grid.Width - player.Width)) {
        player.X += 10
        drawPlayer()
      }
      break
  }
}

// draw player
function drawPlayer() {
  player.Element.style.left = player.X + "px"
  player.Element.style.bottom = player.Y + "px"
}