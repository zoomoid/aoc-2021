const { readFileSync } = require("fs");

/**
 * Reads input data and
 * @param {string} filename
 */
function readData(filename = "day-03/input.txt") {
  const input = readFileSync(filename);
  return input
    .toString()
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => x.split("").map((b) => Number(b)))
}

/**
 * computes gamma rates
 * @param {number[][]} data 
 */
function gamma(data){
  let bits = Array(data[0].length).fill(0);

  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data[i].length; j++){
      bits[j] += data[i][j];
    }
  }
  return bits.map((i) => i < data.length / 2 ? 0 : 1);
}

/**
 * computes delta rate by inversion of gamma
 * @param {number[][]} bits 
 * @returns {(0|1)[]}
 */
function delta(bits){
  const g = gamma(bits);
  return g.map((i) => Math.abs(i - 1)); // this is a really dirty bitflip on integer numbers lol
}

/**
 * oxygen rating
 * @param {(0 | 1)[][]} data 
 */
function oxygen(data){
  let i = 0;
  const l = data[0].length
  while(data.length > 1 && i < l)
  {
    const msb = gamma(data);
    data = data.filter((x) => x[i] == msb[i]);
    i++;
  }
  return data[0];
}

/**
 * co2 rating
 * @param {(0 | 1)[][]} data 
 */
 function co2rating(data){
  let i = 0;
  const l = data[0].length
  while(data.length > 1 && i < l)
  {
    const msb = delta(data);
    data = data.filter((x) => x[i] == msb[i]);
    i++;
  }
  return data[0];
}


(() => {
  let data = readData();
  const gammaRate = gamma(data);
  const deltaRate = delta(gammaRate);
  const gammaR = parseInt(gammaRate.join(""), 2);
  const deltaR = parseInt(deltaRate.join(""), 2)
  console.log("(1) %d * %d = %d", gammaR, deltaR, gammaR * deltaR);
  const ox = oxygen(data);
  const co2 = co2rating(data);
  const oxR = parseInt(ox.join(""), 2);
  const co2R = parseInt(co2.join(""), 2);
  console.log("(2) %d * %d = %d", oxR, co2R, oxR * co2R);
})();
