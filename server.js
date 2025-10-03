const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/giao-tiep-lam-viec-tu-xa', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối đến MongoDB thành công!'))
  .catch(err => console.log(err));

io.on('connection', (socket) => {
    console.log('Người dùng đã kết nối: ' + socket.id);

    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối: ' + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên http://localhost:${PORT}`);
});