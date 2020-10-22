const fs = require('fs')
const util = require('util')
const stat = util.promisify(fs.stat)

// 检查目标路径是否存在
async function isDir(path){
    return new Promise(async (resolve, reject) => {
        try {
            const dir = await stat(path)
            if (dir.isDirectory()) {
                resolve(100)
            } else {
                console.log(`请检查路径 - ${path} 是否正确`)
                reject(`请检查路径 - ${path} 是否正确`)
            }
        } catch (error) {
            console.log(error)
            console.log(`请检查路径 - ${path} 是否正确`)
            reject(`请检查路径 - ${path} 是否正确`)
        }
    })
}

// 删除文件夹
function delDir(path){
    let files = []
    if(fs.existsSync(path)){
        files = fs.readdirSync(path)
        files.forEach((file, index) => {
            let curPath = path + "/" + file
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath) //递归删除文件夹
            } else {
                fs.unlinkSync(curPath) //删除文件
            }
        })
        fs.rmdirSync(path)
    }
}

module.exports = {
    vivo: {
        width: 204,
        height: 204
    },
    oppo: {
        width: 180,
        height: 180
    },
    pxMap: [1920, 2160, 2280, 2340, 2400, 2640, 3168],

    // 图标分类bat 路径
    deskBatPath: 'C:/tools/bats/A图标分类7.5.bat',
    isDir,
    delDir
}
