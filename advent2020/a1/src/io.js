const fs = require("fs")

function readFile(fileName) {
  return fs.readFileSync(fileName).toString().split("\n").map(s => parseInt(s, 10));
}

module.exports = readFile