const { createCanvas, loadImage } = require('canvas')
const { delDir } = require('../config')
const fs = require('fs')

function createFrameAnimation (req, res) {
    let { path, frameRate } = req.query
    frameRate = Number(frameRate)
    const arr = path.split('/')
    const imgName = arr[arr.length - 1].split('.png')[0]
    arr.pop()

    loadImage(path).then(async img =>{
        const w = img.width
        const h = img.height
        const r = h / 2
        const unitW = w / frameRate
        const outputPath = `${arr.join('/')}/${imgName}/`
    
        // 创建目录
        delDir(outputPath)
        fs.mkdir(outputPath, () => {
            for (let i = 1; i < frameRate; i++) {
                const canvas = createCanvas(w, h)
                const ctx = canvas.getContext('2d')
                ctx.beginPath()
                ctx.moveTo(r, 0)
                ctx.lineTo(unitW * i - r, 0)
                ctx.arcTo(unitW * i, 0, unitW * i, r, r)   // 右上角
                ctx.lineTo(unitW * i, r)
                ctx.arcTo(unitW * i, h, unitW * i - r, h, r)   // 右下角
                ctx.lineTo(r, h)
                ctx.arcTo(0, h, 0, r, r)   // 左上角
                ctx.lineTo(0, r)
                ctx.arcTo(0, 0, r, 0, r)   // 左下角
                ctx.lineTo(r, 0)
                ctx.closePath()
                ctx.clip()
                ctx.drawImage(img, 0, 0, w, h)
    
                fs.writeFile(`${outputPath}${imgName}_${i}.png`, canvas.toBuffer(), (err) => {
                    if (err) {
                        console.log(`${imgName}_${i}.png -- 处理失败，原因：${err}`)
                    } else {
                        console.log(`${imgName}_${i}.png -- 处理成功`)
                    }
                })
            }
            fs.rename(path, `${outputPath}${imgName}_${frameRate}.png`, (err) => {
                if (err) console.log(`${imgName}_${frameRate}.png -- 处理失败，原因：${err}`)
                console.log(`${imgName}_${frameRate}.png -- 处理成功`)
            })
        })
    })
}

module.exports = {
    createFrameAnimation
}
