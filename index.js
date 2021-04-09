const URL = 'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'
const sortedWordsToAnagramListMap = new Map();

function sortWord(word){
  return word.split("").sort().join("")
}

function preCalculate(dictionary){
  console.time('preCalculate')
  for (let word of (dictionary || [])) {
    const sortedWord = sortWord(word)

    if(!sortedWordsToAnagramListMap.has(sortedWord)){
      sortedWordsToAnagramListMap.set(sortedWord,[])
    }

    sortedWordsToAnagramListMap.get(sortedWord).push(word)
  }
  console.timeEnd('preCalculate')
}

function getAnagramListForWord(word){
  const sortedWord = word.split("").sort().join("")
  return sortedWordsToAnagramListMap.get(sortedWord) || [];
}

function onInput(input) {
  const word = input.value
  const anagramList = getAnagramListForWord(word)
  document.getElementById('output').innerHTML = JSON.stringify(anagramList, null, 2)
}

fetch(URL).then(
  (res) => res.text()
).then(
  (text) => {
  const dictionary = text.split('\n');
  preCalculate(dictionary)
});