import { StateMachine, consts, onStart, onPlay, generateQuads, generateBrickQuads } from "./dependencies.js";
import { createMap } from "./levelMaker.js";

// Inits game states machine
window.stateMachine = new StateMachine({
  onStart: onStart,
  onPlay: onPlay
});

// Quads we will generate for us tiles coordinates for paddles, balls and bricks
window.gFrames = {}
window.gFrames["Balls"] = generateQuads(96, -48, 2, 3, consts.BALL_HEIGHT, consts.BALL_WIDTH);
window.gFrames["Paddles"] = generateQuads(0, -80, 4, 1, consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT + 16);
window.gFrames["Bricks"] = generateBrickQuads(5, 4);

// Start the game
window.stateMachine.change("onStart", {})

// Inits dev console
window.devConsole = document.querySelector(".console");

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

// Sets game loop
var now;
var then = Date.now();
var interval = 1000 / consts.FPS_MAX;
var delta, dt;

window.requestAnimationFrame(gameLoop);
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  now = Date.now();
  delta = now - then;
  dt = delta / interval;

  if (delta > interval) {
    then = now - (delta % interval);
    window.stateMachine.update(dt)
    window.devConsole.querySelector(".fps").innerHTML = "FPS: " + Math.round(1000 / interval);
  }
}