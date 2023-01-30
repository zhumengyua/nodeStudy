const http = require('http')
const querystring = require('querystring')
const url = require('url')
const fs = require('fs')
const PORT = 8000
const express = require("express")
const cors = require("cors");

let app = express();
app.use(cors());
app.get("/", function (req, res) {
    let {username} = req.query
    let {password} = req.query
    if (username === 'admin' && password === '123456') {
        res.end('登录成功')
        return
    } else res.end('登录失败')

})
http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/plain'});

    const url = req.url
    const query = querystring.parse(url.split('?')[1])
    const method = req.method

    // if (method === 'GET') {
    //     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    //
    //     // 返回的数据
    //     let resData = {
    //         error: 0, message: 'GET返回成功', data: {
    //             query: query
    //         }
    //     }
    //     res.write(JSON.stringify(resData))
    //     res.end(JSON.stringify(resData));
    //
    //
    // } else {
        //post
        var str = ''
        var i = 0
        // data 表示每当有一段数据发送的时候，就触发一次（一共会发生很多次）
        req.on('data', function (data) {        // console.log(`第${i++}次发送数据`)
            str += data
        })    // 数据全部到达时，只发生一次
        req.on('end', function () {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            var post = querystring.parse(str)
            let {user} = post
            let {pass} = post
            let {text} = post
            res.write('user:' + user + ',password:' + pass + ',text:' + text)
            res.end();

        })
    // }
    // res.end()

}).listen(PORT)


// res.end('hello node222js')

// server.listen(PORT);
// console.log('node-server started at port http://localhost:' + PORT)

//
app.listen(8888);
