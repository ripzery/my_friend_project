//var io = require('socket.io')(8080);
var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.emit('msg', {user: 'krucamper', message: 'hello world'});
});