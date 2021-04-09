const URL = 'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'
const sortedWordsDictionary = []
let dict = []

function preCalculate(dict){
  for (let word2 of (dict || [])) {
    // sort each word for comparison
    const sortedWord2 = word2.split("").sort().join("")
    const tuple = {sorted: sortedWord2, original: word2}
    sortedWordsDictionary.push(tuple)
  }
}

fetch(URL).then(
  (res) => res.text()
).then(
  (text) => {
  dict = text.split('\n');
}).then(
  () => preCalculate(dict)
);

function onInput(input) {
  const word = input.value
  const o = []

  const sortedWord = word.split("").sort().join("")

  for (let sortedWord2 of (sortedWordsDictionary || [])) {
    if (sortedWord == sortedWord2.sorted) {
      o.push(sortedWord2.original)
    }
  }

  document.getElementById('output').innerHTML = JSON.stringify(o, null, 2)
}