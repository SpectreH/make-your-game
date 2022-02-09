import * as consts from "./constants.js";
import { Player } from "./player.js";
import { Ball, Grid } from "./level.js";

class GameStates {
  constructor() {
    this.test = 1000
    this.states = {
      onStart: {
        parentThis: this,
        enter: function (params) {
          this.grid = new Grid(consts.GRID_WIDTH, consts.GRID_HEIGHT);
          while (this.grid.element.firstChild) {
            this.grid.element.removeChild(this.grid.element.firstChild);
          }

          this.player = new Player(consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, consts.PLAYER_SPAWN_X, consts.PLAYER_SPAWN_Y);
          this.ball = new Ball(consts.BALL_WIDTH, consts.BALL_HEIGHT, consts.BALL_SPAWN_X, consts.BALL_SPAWN_Y);

          this.player.element.classList.add("player");
          this.grid.element.appendChild(this.player.element);

          // Appends ball to the grid
          this.ball.element.classList.add("ball");
          this.grid.element.appendChild(this.ball.element);
        },
        upd: function (dt) {
          this.parentThis.changeState("onPlay", {
            grid: this.grid,
            player: this.player,
            ball: this.ball
          })
        },
      },
      
      onPlay: {
        parentThis: this,
        enter: function (params) {
          this.grid = params.grid;
          this.player = params.player;
          this.ball = params.ball;
          
          this.paused = false;
        },
        upd: function (dt) {
          if (!this.paused) {
            this.player.update(this.grid.width, dt);
            this.ball.update(dt);

            if (this.ball.collides(this.player)) {
              this.ball.y = this.player.y + this.ball.height
              this.ball.dy = -this.ball.dy

              if (this.ball.x < this.player.x + (this.player.width / 2) && this.player.dx < 0) {
                this.ball.dx = -5 + -(0.1 * (this.player.x + this.player.width / 2 - this.ball.x))
              } else if (this.ball.x > this.player.x + (this.player.width / 2) && this.player.dx > 0) {
                this.ball.dx = 5 + (0.1 * Math.abs(this.player.x + this.player.width / 2 - this.ball.x))
              } else {
                this.ball.dx = Math.random() * (7 - -7) + -7;
              }
            }

            if (this.ball.y <= 0) { 
              this.parentThis.changeState("onStart", {});
            }
          }
          window.keyPresses.p ? this.paused = true : this.paused = false;
        }
      },
    },
    this.currentState = undefined
  }
  changeState(state, params) {
    this.states[state].enter(params)
    this.currentState = this.states[state]
  }
}

const statesMachine = new GameStates();
statesMachine.changeState("onStart", {})
const devConsole = document.querySelector(".console");

window.onload = function () {
  initBinds();
  window.requestAnimationFrame(gameLoop);
};

function initBinds() {
  // Binds keys press
  window.keyPresses = {};

  // Detects only when key is down
  window.addEventListener('keydown', keyDownListener);
  function keyDownListener(event) {
    if (event.key != "p")
      window.keyPresses[event.key] = true;
  }

  // Detects only when key is up
  window.addEventListener('keyup', keyUpListener);
  function keyUpListener(event) {
    if (event.key != "p")
      window.keyPresses[event.key] = false;
  }

  // Detects only once when key pressed
  document.addEventListener('keypress', keyPressedListener);
  function keyPressedListener(event) {
    if (event.key == "p")
      window.keyPresses[event.key] ? window.keyPresses[event.key] = false : window.keyPresses[event.key] = true
  }
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
    statesMachine.currentState.upd(dt)
    // updateConsole(1000 / interval);
  }
}

// // Developer console
// function updateConsole(fps) {
//   devConsole.querySelector(".fps").innerHTML = "FPS: " + Math.round(fps);
//   devConsole.querySelector(".player-x").innerHTML = "Player X: " + player.x;
//   devConsole.querySelector(".player-y").innerHTML = "Player Y: " + player.y;
//   devConsole.querySelector(".player-w").innerHTML = "Player Width: " + player.width;
//   devConsole.querySelector(".player-h").innerHTML = "Player Height: " + player.height;
//   devConsole.querySelector(".player-dx").innerHTML = "Player dx: " + player.dx;  
//   devConsole.querySelector(".ball-dx").innerHTML = "Ball dx: " + ball.dx;
//   devConsole.querySelector(".ball-dy").innerHTML = "Ball dy: " + ball.dy;  
// }