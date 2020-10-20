const express = require('express')
const ejs = require('ejs')
const app = express()
const routesArr = require('./apis/index')
const fs = require('fs')
const { resizeIcon } = require('./resize')
app.use(express.static("assets"))

//把./views目录设置为模板文件的根，html文件模板放在view目录中
app.set('views','./views')
app.set('view engine','ejs')
//为html扩展名注册ejs
app.engine('html',ejs.renderFile)

//加入本地对象
// app.locals.uname = "Brad"


app.get('/', function(req,res){
    res.render('index.html')
})
app.get('/logs', function(req,res){
    fs.readFile('./工具箱升级日志.txt', 'utf-8', (err, data) => {
        if (err) console.log('读取日志文件出错：' + err)

        res.render('logs.html', {
            data: err ? '读取日志文件出错：' + err : data
        })
    })
})
routesArr.forEach(item => {
    app.get(item.path, item.ctx)
})
app.get('/resizeIcon', function(req,res){
    resizeIcon(req.query.path)
})

app.listen(80, () => console.log(`欢迎使用炫橙科技工具箱：网页地址 -> http://localhost！`))
