export let generateQuads = (startX, startY, rows, cols, width, height) => {
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