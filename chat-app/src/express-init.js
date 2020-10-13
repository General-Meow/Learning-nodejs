const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const { Socket } = require('dgram')

const app = express()
const httpServer = http.createServer(app)
const io = socketio(httpServer)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, resp) => {
    console.log('hello')
    resp.render('index')
})

let count = 0

io.on('connection',  (socket) => {
    console.log('new web socket connection')
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     console.log('incrementing')
    //     count += 1
    //     //this only sends to that one client
    //     // socket.emit('countUpdated', count)
        
    //     //this will send to all connected clients
    //     io.emit('countUpdated', count)
    // })
    io.emit('message', "Welcome!")
    //broadcast to everyone but this current client
    socket.broadcast.emit('message', "a new user has joined")
    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message)
        callback()
    })

    //run code when this client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left')
    })

    //listen for sendLocation events and emit it to all users
    socket.on('sendLocation', (coords, ackCallback) => {
        io.emit('message', `https://google.com/maps?q=${coords.lat},${coords.long}`);
        ackCallback()
    })
        
})


module.exports = httpServer