// 從陣列中隨機取一元素回傳
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// 隨機產生5碼英數字串
function generateUrl() {

  // 產生隨機碼用的候選字母
  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperLetters = lowerLetters.toUpperCase()
  const numbers = '0123456789'

  let collection = []

  collection = collection.concat(lowerLetters.split(''))
  collection = collection.concat(upperLetters.split(''))
  collection = collection.concat(numbers.split(''))

  // 從候選字母中產生隨機碼
  let randomString = ''

  for (let i = 0; i < 5; i++) {
    randomString += sample(collection)
  }

  console.log(randomString)
  return randomString
}

// 把這個函式的的最後，加上以下，就可以透過它匯出，之後便能在 app.js 中使用 require 載入
module.exports = generateUrl