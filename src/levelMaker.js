import { randomIntInRange, Brick, consts } from "./dependencies.js"

export const createMap = () => {
  let res = [];

  let numRows = randomIntInRange(1, 5);
  let numCols = randomIntInRange(7, 39);
  numCols = numCols % 2 == 0 && numCols + 1 || numCols; // ensure, what only odd number of columns

  let highestTier = randomIntInRange(1, 3);
  let highestColor = randomIntInRange(1, 4);

  for (let y = 0; y < numRows; y++) {
    let skipPattern = randomIntInRange(0, 1);
    let alternatePattern = randomIntInRange(0, 1);

    let alternateColor1 = randomIntInRange(0, highestColor);
    let alternateColor2 = randomIntInRange(0, highestColor);
    let alternateTier1 = randomIntInRange(0, highestTier);
    let alternateTier2 = randomIntInRange(0, highestTier);

    let skipFlag = randomIntInRange(0, 1);
    let alternateFlag = randomIntInRange(0, 1);

    let solidColor = randomIntInRange(1, highestColor);
    let solidTier = randomIntInRange(0, highestTier);

    for (let x = 0; x < numCols; x++) {
      let colorToAppend = 0;
      let tierToAppend = 0;

      if (skipPattern && skipFlag) {
        skipFlag = !skipFlag;
        continue;
      } else {
        skipFlag = !skipFlag;
      }

      if (alternatePattern && alternateFlag) {
        colorToAppend = alternateColor1;
        tierToAppend = alternateTier1;
        alternateFlag = !alternateFlag;
      } else {
        colorToAppend = alternateColor2;
        tierToAppend = alternateTier2;
        alternateFlag = !alternateFlag;
      }

      if (!alternatePattern) {
        colorToAppend = solidColor;
        tierToAppend = solidTier;
      }

      let brick = new Brick(
        consts.BRICK_WIDTH,
        consts.BRICK_HEIGHT,
        (x * consts.BRICK_WIDTH) + ((40 - numCols) * consts.BRICK_HEIGHT),
        y * consts.BRICK_WIDTH,
        colorToAppend,
        tierToAppend)

      res.push(brick);
    }
  }

  return res;
}