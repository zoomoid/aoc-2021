const { readFileSync } = require("fs");

/**
 * Counts increments in a list of numbers
 * Task (1)
 * @param {number[]} numbers filename
 * @returns {number}
 */
function countIncrements(numbers){
  return numbers.reduce((p, c, ci, a) => {
    if(a[ci - 1]){
      if(c > a[ci - 1]){
        return p + 1;
      } else {
        return p;
      }
    } else {
      return p;
    }
  }, 0);
}

/**
 * Counts increments in with 3-part sliding windows
 * Task (2)
 * @param {number[]} numbers
 * @returns {number}
 */
function slidingWindowIncrements(numbers){
  const slidingTriples = numbers.map((x, i, a) => {
    if(a[i + 1] && a[i + 2]){
      return [x, a[i+1], a[i+2]];
    }
    return [];
  }).filter((x) => x.length === 3);

  const slidingTriplesSum = slidingTriples.map((x) => {
    return x.reduce((p, c) => p + c, 0);
  });

  return countIncrements(slidingTriplesSum);
}

/**
 * Reads input data and 
 * @param {string} filename 
 */
function readListOfNumbers(filename = "day-01/input.txt"){
  const input = readFileSync(filename);
  return input.toString().split('\n').filter((x) =>  x !== "").map((x) => Number(x));
}

(() => {
  console.log("(1): %d", countIncrements(readListOfNumbers()));
  console.log("(2): %d", slidingWindowIncrements(readListOfNumbers()));
})();