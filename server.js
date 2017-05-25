var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  // console.log(path);

  // response.end("hi");

  if(path === "/index.html") {
    response.setHeader('Content-Type', 'text/html; charset="utf-8"');
    response.end('\
      <h1>Here is Index.html</h1> \
      <button id="btn">点我</button>\
      <link rel="stylesheet" href="/style.css" /> \
      <script src="/main"></script> \
      <script src="/demo"></script> \
      ');
  }
  else if(path === '/style.css') {
    response.setHeader('Content-Type', 'text/css');
    response.end('body{color: #52da21}');
  }
  else if(path === '/main') {    // main,js => 可以不要后缀  main
    response.setHeader('Content-Type', 'text/javascript');
    response.end('var a = 2; alert(a);')
  }
  else if(path === '/demo') {
    response.setHeader('Content-Type', 'text/javascript')
    response.end(`
        var btn = document.getElementById("btn");
        btn.onclick = function() {
          var httpRequest = new XMLHttpRequest();  // 获取实例
          httpRequest.open("GET", "/data");  // 设置GET路径
          httpRequest.onreadystatechange = function() {  // 一般不用onload， 用onreadystatechange，有四个阶段 1,2,3,4
            console.log(httpRequest.readyState);
            if(httpRequest.readyState === XMLHttpRequest.DONE) {
              if(httpRequest.status === 200) {
                var string = arguments[0].target.response;
                var object = JSON.parse(string);
                console.log(object);
                console.log("加载成功");
                console.log(httpRequest.status);
              }
              else {
                console.log("加载失败");
                console.log(httpRequest.status);
              }
            }
          }
          httpRequest.send();  // 发送请求
        }
      `)
  }
  else if(path === "/data") {
    response.end('{"name": "Frank", "age": 18}')
  }
  else {
    response.statusCode = 404;
    response.end('Nothing');
  }

  // if(path === '/'){  // 如果用户请求的是 / 路径
  //   var string = fs.readFileSync('./index.html')  
  //   response.setHeader('Content-Type', 'text/html;charset=utf-8')  
  //   response.end(string)   
  // }else if(path === '/style.css'){   
  //   var string = fs.readFileSync('./style.css')
  //   response.setHeader('Content-Type', 'text/css')
  //   response.end(string)
  // }else if(path === '/main.js'){  
  //   var string = fs.readFileSync('./main.js')
  //   response.setHeader('Content-Type', 'application/javascript')
  //   response.end(string)
  // }else{  
  //   response.statusCode = 404
  //   response.setHeader('Content-Type', 'text/html;charset=utf-8') 
  //   response.end('找不到对应的路径，你需要自行修改 index.js')
  // }

  // 代码结束，下面不要看
  // console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)