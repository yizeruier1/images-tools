const { createCanvas, registerFont, loadImage } = require('canvas')
const fs = require('fs')


function generateOriginal (req, res) {
    const {name, path} = req.query
    const names = name.split('--')
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    const nameX = 308  // 名字范围在 308 - 472  ->  166
    const letterWidth = 18  // 单个文字宽度
    const letterWidthEn = 9  // 单个英文字母宽度

    registerFont('./assets/simhei.ttf', { family: 'simhei' })
    loadImage('./assets/originalStatement.jpg').then(img => {
        const imgw = img.width
        const imgh = img.height
        names.forEach((item, index) => {
            const canvas = createCanvas(imgw, imgh)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, imgw, imgh)
            ctx.fillStyle = "#838381"
            ctx.font = '18px simhei'
            const x = index === 0 ? (166 - item.length * letterWidth) / 2 : (166 - item.length * letterWidthEn) / 2
            // 名字
            ctx.fillText(item, nameX + x, 197)
            //时间
            ctx.font = '20px simhei'
            ctx.fillText(year, 538, 882)
            ctx.fillText(month, 614, 882)
            ctx.fillText(date, 668, 882)

            const outputName = index === 0 ? '/原创声明.jpg' : '/原创声明_EN.jpg'
            fs.writeFile(path + outputName, canvas.toBuffer(), (err) => {
                if (err) {
                    console.log(`${outputName} 处理失败，原因：${err}`)
                } else {
                    console.log(`${outputName} 处理成功！`)
                }
            })
        })
    })
}

module.exports = {
    generateOriginal
}
