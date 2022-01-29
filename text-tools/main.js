const convert = () => {
  const text = document.getElementById('text_1').value
  const numberAdder = document.getElementById('number-adder').value
  var textArr = text.split(/\.\r?\n/)
  var result = ''
  var sentenceIndex = 0
  for (let i = 0; i < textArr.length; i++) {
    var paragraph = textArr[i]
    paragraph = paragraph.replace(/\n|\r/g, ' ')
    paragraph = paragraph.replace('. ', '.\n')
    if (numberAdder === 'all-lines') {
      paragraph = paragraph.split('\n').map(line => {
        return `${++sentenceIndex}. ${line.trim()}`
      }).join('\n')
    } else if (numberAdder === 'none-empty') {
      paragraph = paragraph.split('\n').map(line => {
        if (!/\S/.test(line)) {
          return ''
        }
        return `${++sentenceIndex}. ${line.trim()}`
      }).join('\n')
    } else {
      paragraph = paragraph.split('\n').map(line => line.trim()).join('\n')
    }
    result += paragraph
    if (i !== textArr.length - 1) {
      result += '.\n-----\n'
    }
  }
  document.getElementById('text_2').value = result
  navigator.clipboard.writeText(result).then(function () {
    Toastify({
      text: "Copying to clipboard was successful!",
      duration: 3000,
      gravity: "top",
      position: "left",
      close: true,
    }).showToast()
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
    Toastify({
      text: "Could not copy text",
      duration: 3000,
      gravity: "top",
      position: "left",
      close: true,
    }).showToast()
  });
}