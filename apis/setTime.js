const childProcess = require('child_process')
const util = require('util')
const exec = util.promisify(childProcess.execFile)


const set0706 = function(req, res){
    exec('C:/tools/bats/0706.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置时间 0706 成功！'
        })
    }).catch(() => {
        res.send({
            code: 0,
            msg: '设置时间 0706 失败！'
        })
    })
}

const set0808 = function(req, res){
    exec('C:/tools/bats/0808.bat').then(() => {
        res.send({
            code: 100,
            msg: '设置时间 0808 成功！'
        })
    }).catch(() => {
        res.send({
            code: 0,
            msg: '设置时间 0808 失败！'
        })
    })
}

module.exports = {
    set0706,
    set0808
}
