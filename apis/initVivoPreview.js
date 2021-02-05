const images = require('images')
const fs = require('fs')
const { pxMap, delDir } = require('../config')

const savePath = [
    'lockscreen/1080x1920/lockscreen_1.jpg',
    'lockscreen/1080x2160/lockscreen_1.jpg',
    'lockscreen/1080x2256/lockscreen_1.jpg',
    'lockscreen/1080x2280/lockscreen_1.jpg',
    'lockscreen/1080x2316/lockscreen_1.jpg',
    'lockscreen/1080x2340/lockscreen_1.jpg',
    'lockscreen/1080x2376/lockscreen_1.jpg',
    'lockscreen/1080x2400/lockscreen_1.jpg',
    'lockscreen/1080x2408/lockscreen_1.jpg',
    'lockscreen/1080x2460/lockscreen_1.jpg'
]
function geSavePath(name, path){
    if (name.indexOf('1920') > -1) return path + '/' + savePath[0]
    if (name.indexOf('2160') > -1) return path + '/' + savePath[1]
    if (name.indexOf('2256') > -1) return path + '/' + savePath[2]
    if (name.indexOf('2280') > -1) return path + '/' + savePath[3]
    if (name.indexOf('2316') > -1) return path + '/' + savePath[4]
    if (name.indexOf('2340') > -1) return path + '/' + savePath[5]
    if (name.indexOf('2376') > -1) return path + '/' + savePath[6]
    if (name.indexOf('2400') > -1) return path + '/' + savePath[7]
    if (name.indexOf('2408') > -1) return path + '/' + savePath[8]
    if (name.indexOf('2460') > -1) return path + '/' + savePath[9]
}

function vivoPreview (req, res) {
    const path = req.query.path
    fs.readdir(path, (err, files) => {
        if (err) {
            console.log(`读取路径 ${path} 失败，原因：${err}！`)
            return false
        }
        delDir(path + '/lockscreen')
        fs.mkdirSync(path + '/lockscreen/')
        fs.mkdirSync(path + '/lockscreen/1080x1920/')
        fs.mkdirSync(path + '/lockscreen/1080x2160/')
        fs.mkdirSync(path + '/lockscreen/1080x2256/')
        fs.mkdirSync(path + '/lockscreen/1080x2280/')
        fs.mkdirSync(path + '/lockscreen/1080x2316/')
        fs.mkdirSync(path + '/lockscreen/1080x2340/')
        fs.mkdirSync(path + '/lockscreen/1080x2376/')
        fs.mkdirSync(path + '/lockscreen/1080x2400/')
        fs.mkdirSync(path + '/lockscreen/1080x2408/')
        fs.mkdirSync(path + '/lockscreen/1080x2460/')

        fs.access(`${path}/电池.png`, (err1) => {
            if (err1) {
                console.log('缺少 电池.png')
            } else {
                // 电池 信号图标
                const batImg = images(`${path}/电池.png`)
                // const vivoSignal = images('./assets/vivo_preview_signal.png')

                files.forEach((item, index) => {
                    if (item.indexOf('.png') > -1 && pxMap.some(ele => item.indexOf('vivo' + ele) > -1)) {
                        const ctx = images(`${path}/${item}`)
                        const sp = geSavePath(item, path)
                        // tinyPng('', ctx.draw(vivoSignal, 0, 0).draw(batImg, 950, 4), sp)
                        tinyPng('', ctx.draw(batImg, 954, 4), sp)
                    }
                })
            }
        })
    })
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
    vivoPreview
}
