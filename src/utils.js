// Generates random numbers between min and max (inclusive)
export const randomIntInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Adds 0 before integer
export const pad = (val) => {
  let valString = val + "";

  if (valString.length < 2) {
    return "0" + valString;
  }

  return valString;
}