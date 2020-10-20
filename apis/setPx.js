const childProcess = require('child_process')
const util = require('util')
const exec = util.promisify(childProcess.execFile)

const set1920Px = function (req,res) {
    exec('C:/tools/bats/1920.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 1920 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 1920 分辨率失败！原因：' + err
        })
    })
}

const set2160Px = function (req,res) {
    exec('C:/tools/bats/2160.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2160 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2160 分辨率失败！原因：' + err
        })
    })
}

const set2280Px = function (req,res) {
    exec('C:/tools/bats/2280.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2280 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2280 分辨率失败！原因：' + err
        })
    })
}

const set2340Px = function (req,res) {
    exec('C:/tools/bats/2340.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2340 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2340 分辨率失败！原因：' + err
        })
    })
}

const set2400Px = function (req,res) {
    exec('C:/tools/bats/2400.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2400 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2400 分辨率失败！原因：' + err
        })
    })
}

const set2430Px = function (req,res) {
    exec('C:/tools/bats/2430.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2430 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2430 分辨率失败！原因：' + err
        })
    })
}

const set2520Px = function (req,res) {
    exec('C:/tools/bats/2520.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2520 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2520 分辨率失败！原因：' + err
        })
    })
}

const set2640Px = function (req,res) {
    exec('C:/tools/bats/2640.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2640 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2640 分辨率失败！原因：' + err
        })
    })
}

const set3168Px = function (req,res) {
    exec('C:/tools/bats/3168.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 3168 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 3168 分辨率失败！原因：' + err
        })
    })
}

const setDefaultPx = function (req,res) {
    exec('C:/tools/bats/恢复默认分辨率.bat').then(() => {
        res.send({
            code: 100,
            msg: '恢复默认分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '恢复默认分辨率失败！原因：' + err
        })
    })
}


module.exports = {
    set1920Px,
    set2160Px,
    set2280Px,
    set2340Px,
    set2400Px,
    set2430Px,
    set2520Px,
    set2640Px,
    set3168Px,
    setDefaultPx
}
