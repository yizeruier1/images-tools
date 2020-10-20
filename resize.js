const fs = require('fs')
const childProcess = require('child_process')
const mvdir = require('mvdir')
const util = require('util')
const { createCanvas, loadImage } = require('canvas')
const config = require('./config')
const { vivo, oppo } = require('./config')

const exec = util.promisify(childProcess.execFile)
const { isDir } = require('./config')
const readDir = util.promisify(fs.readdir)

// 读取目标目录  调用 A图标分类7.5.bat 
async function resizeIcon(url){
    isDir(url).then(async res => {
        const files = fs.readdirSync(url)
        // 文件数量超过 54， 执行 bat 进行分类
        if (files.length > 54) {
            // 有 分类bat 直接执行   没有则从桌面复制一份
            if (!files.some(item => item === 'A图标分类7.5.bat')) {
                await copyBat(url)
            }
            exec(url + '/A图标分类7.5.bat', {cwd: url+'/'}).then(() => {
                console.log('图标分类bat  完成')
                imageHandler(url)
            })
        } else {
            imageHandler(url)
        }
    })
}

// 从桌面复制 bat 到目标路径
async function copyBat(url) {
    return new Promise((resolve, reject) => {
        fs.access(config.deskBatPath, fs.constants.F_OK, async err => {
            if (err) {
                throw Error('没有找到 --图标分类7.5.bat-- 文件')
            } else {
                await mvdir(config.deskBatPath, url + '/A图标分类7.5.bat', { copy: true })
                resolve()
            }
        })
    })
}

// 处理图标
function imageHandler(url){
    console.log('开始处理图标')
    const vivoDir = `${url}/vivo`
    const oppoDir = `${url}/OPPO`

    readDir(vivoDir).then(files => {
        generateImg(files, vivoDir, vivo.width, vivo.height)
    }).catch(err => {
        console.log(`读取目录 ${vivoDir} 出错, 原因 ${err}`)
    })

    readDir(oppoDir).then(files => {
        generateImg(files, oppoDir, oppo.width, oppo.height)
    }).catch(err => {
        console.log(`读取目录 ${oppoDir} 出错, 原因 ${err}`)
    })
}


function generateImg(imgArr, path, w, h) {
    imgArr.forEach((item) => {
        item.indexOf('.png') > -1 && fs.readFile(`${path}/${item}`, (err, data) => {
            if (err) throw err
            loadImage(data).then((image) => {
                const canvas = createCanvas(w, h)
                const ctx = canvas.getContext('2d')
                const x = (w - image.width)/2
                const y = (h - image.height)/2
                ctx.drawImage(image, x, y, image.width, image.height)

                fs.writeFile(`${path}/${item}`, canvas.toBuffer(), (err) => {
                    if (err) {
                        console.log(`${item} - 处理失败，原因：${err}`)
                    } else {
                        console.log(`${item} -> ${w}x${h} 处理成功`)
                    }
                    canvas.width = w
                    canvas.height = h
                })
            }).catch(err1 => {
                console.log(err1)
            })
        })
    })
}


function resizeOppoImg(path){
    const files = fs.readdirSync(path)
    const tasks = []
    let has2400 = ''  // 保存2400的路径，用来放大为3168
    imgs = [ 1920, 2160, 2280, 2340, 2400 ]
    for(let i = 0; i < files.length; i++) {
        imgs.forEach(item => {
            if (files[i].indexOf(item + '') > -1) tasks.push({ src: `${path}/${files[i]}`, h: item })
        })
        const fileName = files[i].toLowerCase()
        // 保存 OPPO2400 路径
        if (fileName.indexOf('oppo2400') > -1 && fileName.indexOf('.png') > -1) has2400 = `${path}/${files[i]}`
        // 删除 3168
        if (fileName.indexOf('oppo3168') > -1) fs.unlinkSync(`${path}/${files[i]}`)
    }

    if (tasks.length > 0) {
        tasks.forEach((item) => {
            item.src.indexOf('.png') > -1 && fs.readFile(item.src, (err, data) => {
                if (err) throw err
                loadImage(data).then((image) => {
                    const canvas = createCanvas(1080, item.h)
                    const ctx = canvas.getContext('2d')
                    const x = (1080 - image.width)/2
                    const y = (item.h - image.height)/2
                    ctx.drawImage(image, x, y, image.width, image.height)
    
                    fs.writeFile(item.src, canvas.toBuffer(), (err) => {
                        if (err) {
                            console.log(`${item.src} - 处理失败，原因：${err}`)
                        } else {
                            console.log(`${item.src} -> 1080x${item.h} 处理成功`)
                        }
                    })
                }).catch(err1 => {
                    console.log(err1)
                })
            })
        })
    }

    // 放大 2400 -> 3168
    if (has2400 !== '') {
        fs.readFile(has2400, (err, data) => {
            if (err) throw err
            loadImage(data).then((image) => {
                const canvas = createCanvas(1440, 3168)
                const ctx = canvas.getContext('2d')
                const x = 0
                const y = -16
                ctx.drawImage(image, x, y, 1440, 3200)

                fs.writeFile(`${path}/OPPO3168.png`, canvas.toBuffer(), (err) => {
                    if (err) {
                        console.log(`${has2400} - 处理失败，原因：${err}`)
                    } else {
                        console.log(`${has2400} -> 1440x3168 处理成功`)
                    }
                })
            }).catch(err1 => {
                console.log(err1)
            })
        })
    }
}

// resizeIcon('C:/Users/10/Desktop/多壁纸 灿若星辰/图标模板7.3-assets')
module.exports = {
    resizeIcon,
    resizeOppoImg
}
