// 导入http和fs模块:
const http = require('http');
const fs = require('fs');
const path = require('path');

// 定义图片目录的路径
const imgDir = path.join(__dirname, '/img');

// 创建http server，并传入回调函数:
const server = http.createServer((request, response) => {    
    // 读取图片目录中的所有文件
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
            return;
        }

        // 过滤出图片文件（根据扩展名）
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));


        // 构造图片的路径
        const imagePaths = images.map(file => path.join('/img', file));
        

        // 返回图片路径列表
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(imagePaths.sort()));
    });
});

// 让服务器监听4090端口:
server.listen(4090);

console.log('Server is running at http://127.0.0.1:4090/');
