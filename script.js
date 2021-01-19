const TO_CHARACTER = 'm'

function translateToLang (reversed) {
  const origin = document.getElementById('origin').value
  const parsed = document.getElementById('parsed').value
  if (reversed) {
    document.getElementById('origin').value = parseToLangs(parsed)
    return
  }
  document.getElementById('parsed').value = convertToLangs(origin)
}
const convertToLangs = (sentence = '') => {
  let parsed = ''
  const origin = sentence.split(' ')
  for (const s of origin) {
    parsed += convertToLang(s) + ' '
  }
  return parsed
}

const parseToLangs = (sentence = '') => {
  let origin = ''
  const parsed = sentence.split(' ')
  for (const s of parsed) {
    origin += parseToLang(s) + ' '
  }
  return origin
}
const parseToLang = (word = '') => {
  if (!detectToLang(word)) {
    return word
  }
  // remove to_character
  const vowels = word.match(/[aeiou]/gi)
  if (!vowels) {
    return word
  }
  const index = word.indexOf(vowels[0])
  if (index <= 0) {
    return word
  }
  const toCharacter = word[index - 1]
  if (toCharacter !== TO_CHARACTER) {
    return word
  }
  return word.removeCharAt(index)
}
const convertToLang = (word = '') => {
  if (detectToLang(word)) {
    return word
  }
  const vowels = word.match(/[aeiou]/gi)
  if (!vowels || !vowels.length) {
    return word + TO_CHARACTER
  }
  const index = word.indexOf(vowels[0])
  if (index === -1) {
    return word + TO_CHARACTER
  }
  if (index === 0) {
    return TO_CHARACTER + word
  }
  return word.splice(index, 0, TO_CHARACTER)
}
const detectToLang = (word = '') => {
  const vowels = word.match(/[aeiou]/gi)
  if (!vowels) {
    return false
  }
  const index = word.indexOf(vowels[0])
  if (index <= 0) {
    return false
  }
  const toCharacter = word[index - 1]
  if (toCharacter !== TO_CHARACTER) {
    return false
  }
  return true
}
String.prototype.removeCharAt = function (i) {
  var tmp = this.split('') // convert to an array
  tmp.splice(i - 1, 1) // remove 1 element from the array (adjusting for non-zero-indexed counts)
  return tmp.join('') // reconstruct the string
}
String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
}
