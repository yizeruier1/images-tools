const fs = require('fs')
const childProcess = require('child_process')
const util = require('util')
const exec = util.promisify(childProcess.execFile)
const mvdir = require('mvdir')
const { resizeOppoImg } = require('../resize')
const { isDir, delDir } = require('../config')


const oneKeyScreenShot = function (req,res) {
    const path = req.query.path
    exec('C:/tools/bats/一键截图.bat', { cwd: path}).then(() => {
        console.log('一键截图成功！')
        res.send({
            code: 100,
            msg: '执行 一键截图.bat 成功！'
        })
    }).catch(err =>{
        console.log('一键截图失败！')
        res.send({
            code: 0,
            msg: '执行 一键截图.bat 失败！原因：' + err
        })
    })
}

const vivoScreenShot = function (req,res) {
    const path = req.query.path
    exec('C:/tools/bats/vivo截图.bat', { cwd: path}).then(() => {
        console.log('vivo截图成功！')
        res.send({
            code: 100,
            msg: '执行 vivo截图.bat 成功！'
        })
    }).catch(err =>{
        console.log('vivo截图失败！')
        res.send({
            code: 0,
            msg: '执行 vivo截图.bat 失败！原因：' + err
        })
    })
}

const hw1920ScreenShot = function (req,res) {
    const path = req.query.path
    exec('C:/tools/bats/EMUI1920截图.bat', { cwd: path}).then(() => {
        console.log('华为1920截图成功！')
        res.send({
            code: 100,
            msg: '执行 华为1920截图.bat 成功！'
        })
    }).catch(err =>{
        console.log('华为1920截图失败！')
        res.send({
            code: 0,
            msg: '执行 华为1920截图.bat 失败！原因：' + err
        })
    })
}

const hw2160ScreenShot = function (req,res) {
    const path = req.query.path
    exec('C:/tools/bats/EMUI2160截图.bat', { cwd: path}).then(() => {
        console.log('华为2160截图成功！')
        res.send({
            code: 100,
            msg: '执行 华为2160截图.bat 成功！'
        })
    }).catch(err =>{
        console.log('华为2160截图失败！')
        res.send({
            code: 0,
            msg: '执行 华为2160截图.bat 失败！原因：' + err
        })
    })
}

const oppoAutoScreenShot = function (req,res) {
    const path = req.query.path
    exec('C:/tools/bats/OPPO自动截图.bat', { cwd: path}).then(() => {
        res.send({
            code: 100,
            msg: '执行 OPPO自动截图.bat 成功！'
        })
        // 处理截取图大小
        resizeOppoImg(path)
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '执行 OPPO自动截图.bat 失败！原因：' + err
        })
    })
}

const oppoHalfAutoScreenShot = function (req,res) {
    const path = req.query.path
    mvdir('C:/tools/bats/OPPO半自动截图.bat', path + '/OPPO半自动截图.bat', { copy: true }).then(() => {
        res.send({
            code: 100,
            msg: 'OPPO半自动截图.bat 拷贝成功！'
        })
    }).catch(err => {
        res.send({
            code: 100,
            msg: 'OPPO半自动截图.bat 拷贝失败！' + err
        })
    })
}


const needCopyFiles = [
    { name: '/lockscreen', origin: 'C:/tools/bats/自检工具锁屏测试/lockscreen' }
]

// vivo 自动截图
const vivoAutoScreenshot = function (req, res) {
    const path = req.query.path
    const vivourl = req.query.vivourl
    isDir(path).then(() => {
        const copyTasks = needCopyFiles.map(item => {
            return mvdir(item.origin, path + item.name, { copy: true })
        })
        copyTasks.push(mvdir('C:/tools/bats/vivo自动截图.bat', path + '/vivo自动截图.bat', { copy: true }))
        copyTasks.push(mvdir(vivourl, path + '/vivo', { copy: true }))
        Promise.all(copyTasks).then(() => {
            // 执行 bat 文件 进行推送
            exec(path + '/vivo自动截图.bat', {cwd: path+'/'}).then(() => {
                res.send({
                    code: 100,
                    msg: 'vivo自动截图成功！'
                })
                // 删除文件
                setTimeout(() => {
                    needCopyFiles.forEach(item => delDir(path + item.name))
                    fs.unlinkSync(path + '/vivo自动截图.bat')
                    fs.unlinkSync(path + '/vivo.itz')
                }, 1000)
                return false
            }).catch(err =>{
                res.send({
                    code: 0,
                    msg: 'vivo自动截图失败！原因：' + err
                })
                // 删除文件
                setTimeout(() => {
                    needCopyFiles.forEach(item => delDir(path + item.name))
                    fs.unlinkSync(path + '/vivo自动截图.bat')
                    fs.unlinkSync(path + '/vivo.itz')
                }, 1000)
                return false
            })
        }).catch(err => {
            console.log(`拷贝文件失败！${err}`)
            res.send({
                code: 0,
                msg: `拷贝文件失败！${err}`
            })
            return false
        })
    }).catch(err => {
        res.send(err)
    })
}

// 处理 oppo 预览图
const generateOppoImg = function (req, res) {
    const path = req.query.path
    resizeOppoImg(path)
    setTimeout(() => {
        res.send({
            code: 100,
            msg: 'OPPO 预览图处理成功！'
        })
    }, 1000)
}

module.exports = {
    oneKeyScreenShot,
    vivoScreenShot,
    hw1920ScreenShot,
    hw2160ScreenShot,
    oppoAutoScreenShot,
    oppoHalfAutoScreenShot,
    generateOppoImg,
    vivoAutoScreenshot
}
