import { consts } from "./dependencies.js";

export const generateQuads = (startX, startY, rows, cols, width, height) => {
  let result = []

  for (let i = 0; i < rows; i++) {
    let tempY = startY - (height * i)
    for (let y = 0; y < cols; y++) {
      let tempX = startX - (width * y);
      result.push({
        x: tempX,
        y: tempY
      })
    }
  }

  return result
}

export const generateBrickQuads = (types, tiers) => {
  let result = [];

  let width = consts.BRICK_WIDTH;
  let height = consts.BRICK_HEIGHT;

  let tempY = 0;
  let tempX = 0;
  for (let i = 0; i < types; i++) {
    let brickTile = {
      tier: []
    }

    for (let y = 0; y < tiers; y++) {
      brickTile.tier.push({
        x: -tempX * width,
        y: -tempY * height
      })

      tempX++;
      if (tempX * width >= consts.TILESET_WIDTH) {
        tempX = 0;
        tempY++;
      }
    }

    result.push(brickTile);
  }

  return result
}