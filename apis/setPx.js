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

const set2256Px = function (req,res) {
    exec('C:/tools/bats/2256.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2256 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2256 分辨率失败！原因：' + err
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

const set2316Px = function (req,res) {
    exec('C:/tools/bats/2316.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2316 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2316 分辨率失败！原因：' + err
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

const set2376Px = function (req,res) {
    exec('C:/tools/bats/2376.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2376 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2376 分辨率失败！原因：' + err
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

const set2408Px = function (req,res) {
    exec('C:/tools/bats/2408.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2408 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2408 分辨率失败！原因：' + err
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

const set2460Px = function (req,res) {
    exec('C:/tools/bats/2460.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 2460 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 2460 分辨率失败！原因：' + err
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

const set3216Px = function (req,res) {
    exec('C:/tools/bats/3216.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置 3216 分辨率成功！'
        })
    }).catch(err =>{
        res.send({
            code: 0,
            msg: '设置 3216 分辨率失败！原因：' + err
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
    set2256Px,
    set2280Px,
    set2316Px,
    set2340Px,
    set2376Px,
    set2400Px,
    set2408Px,
    set2430Px,
    set2460Px,
    set2520Px,
    set2640Px,
    set3168Px,
    set3216Px,
    setDefaultPx
}
