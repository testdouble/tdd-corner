const assert = require('assert')
const fs = require('fs')

function doesMatch2020(i1, i2) {
  return i1 + i2 === 2020
}

function repair(expenses) {
  let pairs = pairUp(expenses)
  let matchedPair = pairs.find(pair => doesMatch2020(...pair))
  return matchedPair[0] * matchedPair[1]
}

function pairUp(inputs) {
  let index1 = 0
  let index2 = 1
  let pairs = [];
  for (index1 = 0; index1 < inputs.length -1; index1++) {
    for (index2 = index1 +1; index2 < inputs.length; index2++) {
      pairs.push([inputs[index1], inputs[index2]])
    }
  }
  return pairs
}

function readFile(fileName) {
  return fs.readFileSync(fileName).toString().split("\n").map(s => parseInt(s, 10));
}

function repairFile(fileName) {
  const expenses = readFile(fileName)
  return repair(expenses)
}

module.exports = {
  itReadsAFileAndReturnsAnArrayOfInts: () => {
    assert.strictEqual(1895, readFile("input.txt")[0])
  },
  itReadsAFileAndRepairsTheReport: () => {
    assert.equal(1016131, repairFile('input.txt'))
  },
  itRepairsAZeroExpenseReport: () => {
    assert.equal(0, repair([0, 2020]))
  },
  itRepairsAnExpenseReportWithOne: () => {
    assert.equal(2019, repair([1, 2019]))
  },
  itRepairsAnExpenseReportWithMoreThanTwoValues: () => {
    assert.equal(2019, repair([0, 1, 2019]))
  },
  itRepairsAnExpenseReportWithMoreThanTwoValues10s: () => {
    assert.equal(1020100 , repair([1010, 1, 1010, 0, 2]))
  },
  itRepairsDemoExpenseReport: () => {
    assert.equal(514579, repair([1721,979,366,299,675,1456]))
  },
  itRunsFinds2020: () => {
    assert.equal(true, doesMatch2020(2020, 0))
  },
  itKnowsWhenItsNot2020: () => {
    assert.equal(false, doesMatch2020(233, 0))
  },
  itReturnsListOfAllPairs:() => {
    const inputs = [1,2];
    const expectedPairs = [[1,2]]
    assert.deepEqual(expectedPairs, pairUp(inputs))
  },
  itReturnsListOfThreePairs:() => {
    const inputs = [1,2,3];
    const expectedPairs = [[1,2],[1,3],[2,3]];
    assert.deepEqual(expectedPairs, pairUp(inputs));
  },
}

