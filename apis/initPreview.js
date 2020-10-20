const images = require('images')
const fs = require('fs')
const { pxMap } = require('../config')

function generatePreview (req, res) {
    const path = req.query.path
    fs.readdir(path, (err, files) => {
        if (err) {
            console.log(`读取路径 ${path} 失败，原因：${err}！`)
            return false
        }

        files.forEach(item => {
            // 如果目录下有电池图标 则生成 vivo 预览图
            if (item === '电池.png') {
                generateVivoPreview(`${path}/${item}`, path)
            } else {
                if (item.indexOf('.png') > -1 && pxMap.some(ele => item.indexOf(ele + '') > -1)) {
                    tinyPng(`${path}/${item}`)
                }
            }
        })
    })
}

function generateVivoPreview (path, originPath) {
    const vivoSignal = images('./assets/vivo_preview_signal.png')
    const ctx = images(`${originPath}/vivo.png`)
    const batImg = images(path)

    tinyPng('', ctx.draw(vivoSignal, 0, 0).draw(batImg, 946, 20), `${originPath}/vivo1920.jpg`)
}

// 参数1 - 图片路径
// 参数2 - images 实例
// 参数3 - vivo预览图保存路径
function tinyPng (path, instance, vivoPath) {
    const img = path ? images(path) : instance
    const limitSize = 300
    let outputPath = path ? path.replace('.png', '.jpg') : vivoPath
    let qua = 95
    let imgBuf = img.encode('jpg', {
        quality: qua
    })
    let imgSize = Math.floor(Buffer.byteLength(imgBuf)/1024)

    while (imgSize > limitSize) {
        qua -= 5
        imgBuf = img.encode('jpg', {
            quality: qua
        })
        imgSize = Math.floor(Buffer.byteLength(imgBuf)/1024)
    }
    img.save(outputPath, {
        quality: qua
    })
    console.log(`${outputPath} -- 处理完成，大小：${imgSize}kb，jpg 保存质量 ${qua}`)
}

module.exports = {
    generatePreview
}
