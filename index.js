const URL = 'https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt'

function sortWord(word){
  return word.split("").sort().join("").toLowerCase()
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
  const sortedWord = sortWord(word)
  return map.get(sortedWord) || [];
}

// Some primitive tests
function getTestMap(){
  const sampleDictionary = ["a","act","cat"] // This should come already sorted
  return preCalculate(sampleDictionary)
}

function testSortWord(){
  const unsortedWord = "though"
  const sortedWord = "ghhotu"
  const errorMessage = "Oops, sortWord is not working correctly!"
  console.assert(sortedWord === sortWord(unsortedWord), errorMessage)
}

function testPreCalculate(){
  const testMap = getTestMap()
  const errorMessage = "Oops, preCalculate is not working correctly!"
  console.assert(2 === testMap.get("act").length, errorMessage)
  console.assert(1 === testMap.get("a").length, errorMessage)
  console.assert(2 === testMap.size, errorMessage)
}

function testGetAnagramListForWordInMap(){
  const testMap = getTestMap()
  const anagramListForCat = getAnagramListForWordInMap("cat", testMap)
  const expectedArray = ["act","cat"]
  const errorMessage = "Oops, getAnagramListForWordInMap is not working correctly!"
  console.assert(expectedArray.length === anagramListForCat.length, errorMessage)
  console.assert(expectedArray[0] === anagramListForCat[0], errorMessage)
  console.assert(expectedArray[1] === anagramListForCat[1], errorMessage)
}

testSortWord()
testPreCalculate()
testGetAnagramListForWordInMap()

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