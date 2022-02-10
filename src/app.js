import { StateMachine, consts, onStart, onPlay, generateQuads, generateBrickQuads, Sound } from "./dependencies.js";

// Inits game states machine
window.stateMachine = new StateMachine({
  onStart: onStart,
  onPlay: onPlay
});

// Load sounds
window.gSounds = {};
window.gSounds["player_hit"] = new Sound("./audio/player_hit.wav");
window.gSounds["brick_destroy"] = new Sound("./audio/brick_destroy.wav");
window.gSounds["brick_hit"] = new Sound("./audio/brick_hit.wav");
window.gSounds["hurt"] = new Sound("./audio/hurt.wav");
window.gSounds["wall_hit"] = new Sound("./audio/wall_hit.wav");
window.gSounds["pause"] = new Sound("./audio/pause.wav");

// Quads will generate for us tiles coordinates for backgroundX and backgroundY of paddles, balls and bricks
window.gFrames = {};
window.gFrames["Balls"] = generateQuads(consts.BALL_TILE_START_X, consts.BALL_TILE_START_Y, 2, 3, consts.BALL_HEIGHT, consts.BALL_WIDTH);
window.gFrames["Paddles"] = generateQuads(consts.PLAYER_TILE_START_X, consts.PLAYER_TILE_START_Y, 4, 1, consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT + consts.PLAYER_TILE_GAP);
window.gFrames["Bricks"] = generateBrickQuads(consts.BRICK_COLORS+1, consts.BRICK_TIERS+1);

// Starts the game
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