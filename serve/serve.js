var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, '../')));
http.listen(88);


let arr = []
io.on('connection', function(client){
    //message 为自定义事件，供客户端调用
	client.on('message', function(_person){
		if(_person){
			arr.push(_person)
			console.log(arr)
		}
		// 返回信息给客户端
		io.emit('msgObj', JSON.stringify(arr));
	})
})