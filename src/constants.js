// General settings
export const TEXTURE_SCALE = 1.5;
export const GRID_WIDTH = 1280;
export const GRID_HEIGHT = 720;
export const FPS_MAX = 60;

// Player settings
export const START_HEALTH = 3;
export const PADDLE_COLORS = 3;
export const PADDLE_SPEED = 5;

// Ball settings
export const BALL_COLORS = 5;
export const [BALL_MIN_START_DX, BALL_MAX_START_DX] = [-10, 10];
export const [BALL_MIN_START_DY, BALL_MAX_START_DY] = [4, 5];

// Brick settings
export const BRICK_SCORE = 100;
export const BRICK_COLORS = 4;
export const BRICK_TIERS = 3;
export const MAX_BRICK_TIER = 3;
export const MAX_BRICK_COLOR = 4;

// Settings for tiles dimensions and coordinates
export const PLAYER_TILE_GAP = 16 * TEXTURE_SCALE;
export const [TILESET_WIDTH, TILESET_HEIGHT] = [192 * TEXTURE_SCALE, 256 * TEXTURE_SCALE];
export const [PLAYER_TILE_START_X, PLAYER_TILE_START_Y] = [0 * TEXTURE_SCALE, -80 * TEXTURE_SCALE];
export const [BALL_TILE_START_X, BALL_TILE_START_Y] = [96 * TEXTURE_SCALE, -48 * TEXTURE_SCALE];

// Settings for objects dimensions and spawnpoints
export const [PLAYER_WIDTH, PLAYER_HEIGHT] = [128 * TEXTURE_SCALE, 16 * TEXTURE_SCALE];
export const [BRICK_WIDTH, BRICK_HEIGHT] = [32 * TEXTURE_SCALE, 16 * TEXTURE_SCALE];
export const [BALL_WIDTH, BALL_HEIGHT] = [8 * TEXTURE_SCALE, 8 * TEXTURE_SCALE];
export const [PLAYER_SPAWN_X, PLAYER_SPAWN_Y] = [(GRID_WIDTH / 2) - (PLAYER_WIDTH / 2), GRID_HEIGHT / 10];
export const [BALL_SPAWN_X, BALL_SPAWN_Y] = [PLAYER_SPAWN_X + (PLAYER_WIDTH / 2) - (BALL_WIDTH / 2), PLAYER_SPAWN_Y + PLAYER_HEIGHT];

// Settings for grid and map
export const [MIN_MAP_ROWS, MAX_MAP_ROWS] = [1, 5];
export const [MIN_BRICK_IN_ROW, MAX_BRICK_IN_ROW] = [7, 20];
export const MAX_GRID_CAPACITY = Math.floor(GRID_WIDTH / BRICK_WIDTH);
export const GRID_LEFT_PADDING = BRICK_HEIGHT / (TEXTURE_SCALE * 2);
export const GRID_TOP_PADDING = BRICK_WIDTH;
