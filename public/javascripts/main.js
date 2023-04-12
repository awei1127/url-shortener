const successBlock = document.querySelector('.success-block')

// copy按鈕掛監聽器 被點就找到前一個兄弟元素的text 並複製到剪貼簿 且修改提示內容為已複製
successBlock.addEventListener('click', (event) => {
  if (event.target.id === 'copy') {
    const textToCopy = event.target.previousElementSibling.textContent
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard')
      }).catch(error => {
        console.log(error)
      })
  }
})
