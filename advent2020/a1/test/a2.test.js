const assert = require("assert")

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
  return numbers.reduce((acc, n) => n + acc, 0) === 2020
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
    // TODO
  },
}