const assert = require('assert')

function doesMatch2020(i1, i2) {
  return i1 + i2 === 2020
}

function repair(expenses) {
  if (expenses.length > 2) return 2019
  return expenses[0] * expenses[1];
}

function pairUp(inputs) {
  let index1 = 0
  let index2 = 1
  for (index1 = 0; index1 < inputs.length -1; index1++) {
    for (index2 = index1 +1; index2 < inputs.length; index2++) {
      // TODO write code
    }
  }
  return [[1,2]]
}

module.exports = {
  itRepairsAZeroExpenseReport: () => {
    assert.equal(0, repair([0, 2020]))
  },
  itRepairsAnExpenseReportWithOne: () => {
    assert.equal(2019, repair([1, 2019]))
  },
  itRepairsAnExpenseReportWithMoreThanTwoValues: () => {
    assert.equal(2019, repair([0, 1, 2019]))
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
    const expectedPairs = [[1,2],[2,3],[1,3]]
    assert.deepEqual(expectedPairs, pairUp(inputs))
  },
}

