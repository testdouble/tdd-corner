const assert = require("assert")
const readFile = require("../src/io")

function tripleUp(input) {
  if(input.length < 3) return []
  var triples = [];
  for (var a = 0; a < input.length; a++) {
    for (var b = a+1; b < input.length; b++) {
      for (var c = b+1; c < input.length; c++) {
        triples.push([input[a], input[b], input[c]])
      }
    }
  }
  return triples;
}

function doesMatch2020(numbers) {
  if (numbers.length != 3) return false;
  return numbers.reduce((acc, n) => n + acc, 0) === 2020
}

function repair(expenses) {
  const triples = tripleUp(expenses)
  const matchedTriple = triples.find(triple => doesMatch2020(triple))
  return matchedTriple.reduce((acc, n) => n * acc, 1)
}

function repairFile(fileName) {
  const expenses = readFile(fileName)
  return repair(expenses)
}

module.exports = {
  itReturnsAListWithThreeItems: () => {
     const value = tripleUp([1, 2, 3])
     assert.deepEqual([[1, 2, 3]], value)
  },
  itWillReturnAnEmptyArrayIfThereAreFewerThanThreeItems:() => {
    const value = tripleUp([1, 2])
    assert.deepEqual([], value)
  },
  itWillReturnTriplesIfWeSendIt4: () => {
    const value = tripleUp([1,2,3,4])
    assert.deepEqual([[1,2,3],[1,2,4],[1,3,4],[2,3,4]], value)
  },
  itVerifiesThreeNumbersAddUpTo2020: () => {
    const numbers = [1, 1, 2018]
    assert(doesMatch2020(numbers))
  },
  itVerifiesThreeNumbersDoNotAddUpTo2020: () => {
    const numbers = [1, 1, 2019]
    assert(!doesMatch2020(numbers))
  },
  itRequiresATripleToCheckFor2020: () => {
    const allNumbers = [
      [1, 2019],
      [1, 1, 1, 2017],
    ]

    allNumbers.forEach(numbers => {
      assert(!doesMatch2020(numbers))
    })
  },
  itRepairsAnExpenseReportWithThreeValues: () => {
    const values = [1, 1, 2018]
    assert.equal(2018, repair(values))
  },
  itRepairsAnExpenseReportWithFourValues: () => {
    const values = [0, 1, 1, 2018]
    assert.equal(2018, repair(values))
  },
  itReadsAFileAndRepairsTheReport: () => {
    assert.equal(195700142, repairFile('input-kenny.txt'))
  },
}