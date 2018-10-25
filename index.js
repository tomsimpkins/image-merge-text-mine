const Jimp = require('jimp')
const fs = require("fs")
const lodash = require("lodash")

// // const arr = fs.readdirSync("./pics").map(x => `./pics/${x}`)
// const arr = fs.readdirSync("./favepics").map(x => `./favepics/${x}`)
// const promises = arr.map(x => Jimp.read(x))
// Promise.all(promises).then(allImages => {
//   allImages.reduce((acc, image, ind) =>
//     acc.composite(image, 0, 0, {
//       // mode: Jimp.BLEND_SOURCE_OVER,
//       opacitySource: 1 / (ind + 1),
//       opacityDest: 1
//     }
//     )
//   ).write("./out/res2.jpg")
// })


const lda = require("lda")
const text = fs.readFileSync("./text/whatsapp.txt")
const doc = text.toString().replace(/\d\d\/\d\d\/\d\d\d\d, \d\d:\d\d - (Tom Simpkins|Jess Edwards): /g, "").split("\n").filter(n => !/Media omitted/.test(n))
const sampled = lodash.sampleSize(doc, 3000)
// lda(sampled, 2, 5)
// 1 love
// 2 maw, good; lol
// 3 yay, run

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stem = natural.PorterStemmer.stem
// console.log(doc[10])
const clean = doc.reduce((acc, sentence) => {
  Array.prototype.push.apply(acc, tokenizer.tokenize(sentence))
  return acc
}, []).map(x => x.toLowerCase())

const frequencyDict = clean.reduce((acc, w) => {
  if (!acc.has(w)) acc.set(w, 0)
  acc.set(w, acc.get(w) + 1)

  return acc
}, new Map())

console.log([...frequencyDict.entries()].sort((a, b) => b[1] - a[1]))
  // [ 'i', 7899 ],
  // [ 'you', 5722 ],
  // [ 'to', 4779 ],
  // [ 'and', 3058 ],
  // [ 'a', 2697 ],
  // [ 'the', 2651 ],
  // [ 'it', 2281 ],
  // [ 'for', 2098 ],
  // [ 'is', 1918 ],
  // [ 'my', 1880 ],
  // [ 'in', 1863 ],
  // [ 'so', 1802 ],
  // [ 'on', 1617 ],
  // [ 's', 1526 ],
  // [ 'love', 1499 ],
  // [ 'how', 1470 ],
  // [ 'at', 1426 ],
  // [ 't', 1421 ],
  // [ 'm', 1361 ],
  // [ 'have', 1343 ],
  // [ 'of', 1333 ],
  // [ 'me', 1313 ],
  // [ 'was', 1308 ],
  // [ 'maw', 1301 ],
  // [ 'we', 1134 ],
  // [ 'be', 1106 ],
  // [ 'good', 1101 ],
  // [ 'with', 1082 ],
  // [ 'that', 973 ],
  // [ 'do', 948 ],
  // [ 'going', 936 ],
  // [ 'can', 910 ],
  // [ 'just', 878 ],
  // [ 'but', 858 ],
  // [ 'not', 832 ],
  // [ 'lol', 828 ],
  // [ 'what', 789 ],
  // [ 'will', 784 ],
  // [ 'now', 747 ],
  // [ 'one', 717 ],
  // [ 'no', 709 ],
  // [ 'get', 699 ],
  // [ 'about', 670 ],
  // [ 'think', 662 ],
  // [ 'he', 630 ],
  // [ 'yay', 611 ],
  // [ 'like', 611 ],
  // [ 'she', 596 ],
  // [ 'go', 596 ],
  // [ 'got', 594 ],
  // [ 'if', 589 ],
  // [ 'much', 588 ],
  // [ 'are', 585 ],
  // [ 'up', 580 ],
  // [ 'yes', 558 ],
  // [ 'from', 555 ],
  // [ 'time', 534 ],
  // [ 'as', 526 ],
  // [ 'well', 503 ],
  // [ 'this', 497 ],
  // [ 'll', 480 ],
  // [ 'don', 476 ],
  // [ 'had', 472 ],
  // [ 'they', 471 ],
  // [ 'day', 469 ],
  // [ 'wahoo', 469 ],
  // [ 'snook', 467 ],
  //
  //
