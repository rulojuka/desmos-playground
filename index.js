const URL = 'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'

function sortWord(word){
  return word.split("").sort().join("")
}

// ~ 130 ms to preCalculate 58110 words
// ~ 12 ms to preCalculate 3000 words

function preCalculate(dictionary){
  console.time('preCalculate')
  const sortedWordsToAnagramListMap = new Map();
  for (let word of (dictionary || [])) {
    const sortedWord = sortWord(word)

    if(!sortedWordsToAnagramListMap.has(sortedWord)){
      sortedWordsToAnagramListMap.set(sortedWord,[])
    }

    sortedWordsToAnagramListMap.get(sortedWord).push(word)
  }
  console.timeEnd('preCalculate')
  return sortedWordsToAnagramListMap
}

function getAnagramListForWordInMap(word,map){
  const sortedWord = word.split("").sort().join("")
  return map.get(sortedWord) || [];
}

//Some primitive tests
const unsortedWord = "though"
const sortedWord = "ghhotu"
console.assert(sortedWord === sortWord(unsortedWord), "Oops, sortWord is not working correctly!")

const sampleDictionary = ["a","act","cat"] // This should come already sorted
const testMap = preCalculate(sampleDictionary)
console.assert(2 === testMap.get("act").length, "Oops, preCalculate is not working correctly!")
console.assert(1 === testMap.get("a").length, "Oops, preCalculate is not working correctly!")
console.assert(2 === testMap.size, "Oops, preCalculate is not working correctly!")

const anagramListForCat = getAnagramListForWordInMap("cat", testMap)
const expectedArray = ["act","cat"]
console.assert(expectedArray.length === anagramListForCat.length, "Oops, getAnagramListForWordInMap is not working correctly!")
console.assert(expectedArray[0] === anagramListForCat[0], "Oops, getAnagramListForWordInMap is not working correctly!")
console.assert(expectedArray[1] === anagramListForCat[1], "Oops, getAnagramListForWordInMap is not working correctly!")

let sortedWordsToAnagramListMap;

const dictionary = fetch(URL).then(
  (res) => res.text()
).then(
  (text) => {
  const dictionary = text.split('\n');
  sortedWordsToAnagramListMap = preCalculate(dictionary) 
}).catch( 
  (error) => console.error("Could not fetch and calculate dictionary" + error)
);

function onInput(input) {
  const word = input.value
  const anagramList = getAnagramListForWordInMap(word, sortedWordsToAnagramListMap)
  document.getElementById('output').innerHTML = JSON.stringify(anagramList, null, 2)
}