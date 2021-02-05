const { createCanvas, loadImage } = require('canvas')
const { delDir } = require('../config')
const fs = require('fs')

function createFrameAnimation (path, frameRate) {
    const arr = path.split('/')
    const imgName = arr[arr.length - 1].split('.png')[0]
    arr.pop()

    fs.readFile(path, (err, file) => {
        if (err) throw Error(err)

        loadImage(file).then(async img =>{
            const w = img.width
            const h = img.height
            const r = 40
            const unitH = h / frameRate
            const outputPath = `${arr.join('/')}/${imgName}/`

            // 创建目录
            delDir(outputPath)
            fs.mkdir(outputPath, () => {
                for (let i = 1; i < frameRate; i++) {
                    const canvas = createCanvas(w, h)
                    const ctx = canvas.getContext('2d')
                    ctx.beginPath()
                    // 不带圆角
                    ctx.moveTo(0, 0)
                    ctx.lineTo(w, 0)
                    ctx.lineTo(w, unitH*i)
                    ctx.lineTo(0, unitH*i)
                    ctx.lineTo(0, 0)

                    // 带圆角
                    // ctx.moveTo(r, unitH*(frameRate - i))
                    // ctx.lineTo(w - r, unitH*(frameRate - i))
                    // ctx.arcTo(w, unitH*(frameRate - i), w, unitH*(frameRate - i) + r, r)   // 右上角
                    // ctx.lineTo(w, h - r)
                    // ctx.arcTo(w, h, w - r, h, r)   // 右下角
                    // ctx.lineTo(r, h)
                    // ctx.arcTo(0, h, 0, h - r, r)   // 左上角
                    // ctx.lineTo(0, unitH*(frameRate - i) + r)
                    // ctx.arcTo(0, unitH*(frameRate - i), r, unitH*(frameRate - i), r)   // 左下角
                    // ctx.moveTo(r, unitH*(frameRate - i))
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
    })
}

createFrameAnimation('D:/projects/一诺-15-充电特效-可爱冲牛年/锁屏/vivo/couplets2.png', 50)
