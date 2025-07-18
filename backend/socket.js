const socketIo = require('socket.io') 
const userModel = require('./models/user.model')
const driverModel = require('./models/driverModel')

let io

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);


        socket.on('join', async (data) => {
            const {userId, userType} = data

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{
                    socketId: socket.id
                })
            } else if(userType === 'driver'){
                await driverModel.findByIdAndUpdate(userId,{
                    socketId: socket.id
                })
            } else{
                console.log("couldn't set socketid")
            }
        })
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

    });
}

function sendMessageToSocket(socketId, message) {
    if (io) {
        io.to(socketId).emit('message',message);
    }
    else{
        console.log('socket.io is not initialized')
    }
}

module.exports = { initializeSocket, sendMessageToSocket }