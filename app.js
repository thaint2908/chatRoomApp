const express = require('express');
const app = express();
const http = require("http");
// const {Server} = require("socket.io");
const server  = http.createServer(app);
// const io = new Server(server);
const io = require("socket.io")(server);



app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', (req, res) => {
	res.render('index')
})
server.listen(3000,() => {
    console.log("Server is running on 3000");
})

io.on('connection', socket=> {
	console.log('New user connected')

	socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username
    })


    socket.on('new_message', (data) => {

        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })


    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

