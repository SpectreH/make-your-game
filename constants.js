export const GRID_WIDTH = 1280
export const GRID_HEIGHT = 720
export const FPS_MAX = 60
export const PADDLE_SPEED = 5
export const [PLAYER_WIDTH, PLAYER_HEIGHT] = [128, 24]
export const [BALL_WIDTH, BALL_HEIGHT] = [20, 20]
export const [PLAYER_SPAWN_X, PLAYER_SPAWN_Y] = [(GRID_WIDTH - 100) / 2, GRID_HEIGHT / 10]
export const [BALL_SPAWN_X, BALL_SPAWN_Y] = [PLAYER_SPAWN_X + (PLAYER_WIDTH / 2) - (BALL_WIDTH / 2), PLAYER_SPAWN_Y + PLAYER_HEIGHT]