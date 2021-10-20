const assert = require('assert')
const readFile = require("../src/io")

module.exports = {
  itReadsAFileAndReturnsAnArrayOfInts: () => {
    assert.strictEqual(1895, readFile("input-steve.txt")[0])
  },
}