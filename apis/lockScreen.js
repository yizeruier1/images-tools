const childProcess = require('child_process')
const util = require('util')
const mvdir = require('mvdir')
const exec = util.promisify(childProcess.execFile)
const { isDir, delDir } = require('../config')
const fs = require('fs')

const needCopyFiles = [
    { name: '/lockscreen', origin: 'C:/tools/bats/自检工具锁屏测试/lockscreen' },
    { name: '/lockscreen2.5', origin: 'C:/tools/bats/自检工具锁屏测试/lockscreen2.5'},
    { name: '/vivo2.5', origin: 'C:/tools/bats/自检工具锁屏测试/vivo2.5'},
    { name: '/vivo3.0', origin: 'C:/tools/bats/自检工具锁屏测试/vivo3.0'}
]

const vivoLocks = function (req,res) {
    const path = req.query.path
    isDir(path).then(() => {
        // 拷贝文件
        const copyTasks = needCopyFiles.map(item => {
            return mvdir(item.origin, path + item.name, { copy: true })
        })
        copyTasks.push(mvdir('C:/tools/bats/自检工具锁屏测试/vivo国内测试.bat', path + '/vivo国内测试.bat', { copy: true }))
        Promise.all(copyTasks).then(() => {
            // 执行 bat 文件 进行推送
            exec(path + '/vivo国内测试.bat', {cwd: path+'/'}).then(() => {
                res.send({
                    code: 100,
                    msg: 'vivo国内锁屏测试推送成功！'
                })
                // 删除文件
                needCopyFiles.forEach(item => delDir(path + item.name))
                fs.unlinkSync(path + '/vivo国内测试.bat')
                return false
            }).catch(err =>{
                res.send({
                    code: 0,
                    msg: 'vivo国内锁屏测试推送失败！原因：' + err
                })
                // 删除文件
                needCopyFiles.forEach(item => delDir(path + item.name))
                fs.unlinkSync(path + '/vivo国内测试.bat')
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

const vivoLocksEn = function (req,res) {
    const path = req.query.path
    isDir(path).then(() => {
        // 拷贝文件
        const copyTasks = needCopyFiles.map(item => {
            return mvdir(item.origin, path + item.name, { copy: true })
        })
        copyTasks.push(mvdir('C:/tools/bats/自检工具锁屏测试/vivo海外.bat', path + '/vivo海外.bat', { copy: true }))
        Promise.all(copyTasks).then(() => {
            // 执行 bat 文件 进行推送
            exec(path + '/vivo海外.bat', {cwd: path+'/'}).then(() => {
                res.send({
                    code: 100,
                    msg: 'vivo海外锁屏测试推送成功！'
                })
                // 删除文件
                needCopyFiles.forEach(item => delDir(path + item.name))
                fs.unlinkSync(path + '/vivo海外.bat')
                return false
            }).catch(err =>{
                res.send({
                    code: 0,
                    msg: 'vivo海外锁屏测试推送失败！原因：' + err
                })
                // 删除文件
                needCopyFiles.forEach(item => delDir(path + item.name))
                fs.unlinkSync(path + '/vivo海外.bat')
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

const emuiLocks = function (req,res) {
    const path = req.query.path
    isDir(path).then(() => {
        // 拷贝文件
        const copyTasks = [
            mvdir('C:/tools/bats/自检工具锁屏测试/EMUI_lock', path + '/EMUI_lock', { copy: true }),
            mvdir('C:/tools/bats/自检工具锁屏测试/lockscreen', path + '/lockscreen', { copy: true }),
            mvdir('C:/tools/bats/自检工具锁屏测试/EMUI国内.bat', path + '/EMUI国内.bat', { copy: true })
        ]
        Promise.all(copyTasks).then(() => {
            // 执行 bat 文件 进行推送
            exec(path + '/EMUI国内.bat', {cwd: path+'/'}).then(() => {
                res.send({
                    code: 100,
                    msg: 'EMUI国内锁屏测试推送成功！'
                })
                // 删除文件
                delDir(path + '/EMUI_lock')
                delDir(path + '/lockscreen')
                fs.unlinkSync(path + '/EMUI国内.bat')
                return false
            }).catch(err =>{
                console.log(err)
                res.send({
                    code: 0,
                    msg: 'EMUI国内锁屏测试推送失败！未连接华为手机！'
                })
                // 删除文件
                delDir(path + '/EMUI_lock')
                delDir(path + '/lockscreen')
                fs.unlinkSync(path + '/EMUI国内.bat')
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
        console.log(err)
        res.send(err)
    })
}

const emuiLocksEn = function (req,res) {
    const path = req.query.path
    isDir(path).then(() => {
        // 拷贝文件
        const copyTasks = [
            mvdir('C:/tools/bats/自检工具锁屏测试/EMUI_lock_int', path + '/EMUI_lock_int', { copy: true }),
            mvdir('C:/tools/bats/自检工具锁屏测试/lockscreen', path + '/lockscreen', { copy: true }),
            mvdir('C:/tools/bats/自检工具锁屏测试/EMUI_int.bat', path + '/EMUI_int.bat', { copy: true })
        ]
        Promise.all(copyTasks).then(() => {
            // 执行 bat 文件 进行推送
            exec(path + '/EMUI_int.bat', {cwd: path+'/'}).then(() => {
                res.send({
                    code: 100,
                    msg: 'EMUI海外锁屏测试推送成功！'
                })
                // 删除文件
                delDir(path + '/EMUI_lock_int')
                delDir(path + '/lockscreen')
                fs.unlinkSync(path + '/EMUI_int.bat')
                return false
            }).catch(err =>{
                console.log(err)
                res.send({
                    code: 0,
                    msg: 'EMUI海外锁屏测试推送失败！！未连接华为手机！'
                })
                // 删除文件
                delDir(path + '/EMUI_lock_int')
                delDir(path + '/lockscreen')
                fs.unlinkSync(path + '/EMUI_int.bat')
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
        console.log(err)
        res.send(err)
    })
}

const oppoLocks = function (req,res) {
    const path = req.query.path
    isDir(path).then(() => {
        // 拷贝文件
        const copyTasks = [
            mvdir('C:/tools/bats/自检工具锁屏测试/1OPPOTEST', path + '/1OPPOTEST', { copy: true }),
            mvdir('C:/tools/bats/自检工具锁屏测试/lockscreen', path + '/lockscreen', { copy: true }),
            // mvdir('C:/tools/bats/自检工具锁屏测试/output', path + '/output', { copy: true }),
            mvdir('C:/tools/bats/自检工具锁屏测试/OPPO国内测试.bat', path + '/OPPO国内测试.bat', { copy: true })
        ]
        Promise.all(copyTasks).then(() => {
            // 执行 bat 文件 进行推送
            exec(path + '/OPPO国内测试.bat', {cwd: path+'/'}).then(() => {
                res.send({
                    code: 100,
                    msg: 'OPPO国内锁屏测试推送成功！'
                })
                // 删除文件
                delDir(path + '/1OPPOTEST')
                delDir(path + '/lockscreen')
                // delDir(path + '/output')
                fs.unlinkSync(path + '/OPPO国内测试.bat')
                return false
            }).catch(err =>{
                console.log(err)
                res.send({
                    code: 0,
                    msg: 'OPPO国内锁屏测试推送失败！'
                })
                // 删除文件
                delDir(path + '/1OPPOTEST')
                delDir(path + '/lockscreen')
                // delDir(path + '/output')
                fs.unlinkSync(path + '/OPPO国内测试.bat')
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
        console.log(err)
        res.send(err)
    })
}

module.exports = {
    vivoLocks,
    vivoLocksEn,
    emuiLocks,
    emuiLocksEn,
    oppoLocks
}
