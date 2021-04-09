const URL = 'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'
const sortedWordsDictionary = new Map();
let dict = []

function preCalculate(dict){
  console.time('preCalculate')
  for (let word2 of (dict || [])) {
    // sort each word for comparison
    const sortedWord2 = word2.split("").sort().join("")

    if(!sortedWordsDictionary.has(sortedWord2)){
      sortedWordsDictionary.set(sortedWord2,[])
    }

    sortedWordsDictionary.get(sortedWord2).push(word2)

  }
  console.timeEnd('preCalculate')
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

  const sortedWord = word.split("").sort().join("")

  const anagramArray = sortedWordsDictionary.get(sortedWord) || [];
  console.log(anagramArray)

  document.getElementById('output').innerHTML = JSON.stringify(anagramArray, null, 2)
}