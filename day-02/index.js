const { readFileSync } = require("fs");

/**
 * Reads input data and
 * @param {string} filename
 */
function readInstructions(filename = "day-02/input.txt") {
  const input = readFileSync(filename);
  return input
    .toString()
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => {
      const [direction, amount] = x.split(" ");
      return {
        direction,
        amount: Number(amount),
      };
    });
}

/**
 * computes depth over a list of instructions
 * @param {{direction: "forward" | "up" | "down", amount: number}[]} instructions
 * @returns {number} depth
 */
function depth(instructions) {
  return instructions
    .filter((i) => i.direction !== "forward")
    .reduce((p, c) => (c.direction === "up" ? p - c.amount : p + c.amount), 0);
}

/**
 * computes depth over a list of instructions
 * @param {{direction: "forward" | "up" | "down", amount: number}[]} instructions
 * @returns {{direction: "forward" | "up" | "down", amount: number,aim: number}[]} depth
 */
function aim(instructions) {
  let n = [];
  instructions
    .map((x) => ({
      ...x,
      aim: 0,
    }))
    .forEach((v, i, a) => {
      if (v.direction == "down") {
        n[i] = {
          direction: v.direction,
          amount: v.amount,
          aim: (n[i - 1]?.aim || 0) + v.amount,
        };
      } else if (v.direction == "up") {
        n[i] = {
          direction: v.direction,
          amount: v.amount,
          aim: (n[i - 1]?.aim || 0) - v.amount,
        };
      } else {
        n[i] = {
          direction: v.direction,
          amount: v.amount,
          aim: n[i - 1]?.aim || 0,
        };
      }
    });
  return n;
}

/**
 * computes depth over a list of instructions
 * @param {{direction: "forward" | "up" | "down", amount: number,aim: number}[]} augmentedInstructions
 * @returns {number}
 */
function depth2(augmentedInstructions) {
  return augmentedInstructions
    .filter((i) => i.direction == "forward")
    .reduce((p, c) => p + c.aim * c.amount, 0);
}

/**
 * computes distance over a set of instructions
 * @param {{direction: "forward" | "up" | "down", amount: number}[]} instructions
 * @returns {number} distance
 */
function distance(instructions) {
  return instructions
    .filter((i) => i.direction === "forward")
    .reduce((p, { amount }) => p + amount, 0);
}

(() => {
  const instructions = readInstructions();
  let x = distance(instructions),
    y = depth(instructions);
  let augmentedInstructions = aim(instructions);
  let y2 = depth2(augmentedInstructions);
  console.log("(1) %d * %d = %d", x, y, x * y);
  console.log("(2) %d * %d = %d", x, y2, x * y2);
})();
