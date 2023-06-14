"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Io = exports.Server = void 0;
const server_1 = require("./server/socket/server");
Object.defineProperty(exports, "Server", { enumerable: true, get: function () { return server_1.Server; } });
const server_2 = require("./client/socket/server");
Object.defineProperty(exports, "Io", { enumerable: true, get: function () { return server_2.Io; } });
const io = new server_1.Server(3000);
io.on("connection", (socket) => {
    console.log("client connected");
    // socket.on("message", (data) => {
    //   console.log("recived message", data);
    //   console.log(socket.id, "user id on server");
    // });
    setTimeout(() => {
        socket.emit("message", "hello from server!!");
    }, 1000);
    socket.on("message", (data) => {
        console.log("getting message from client");
    });
    socket.on("join", (data) => {
        console.log(data, "listening join");
        socket.join(data["room"]);
    });
    socket.on("chatting", (data) => {
        console.log("recived chat", data);
        socket.emit("listened", "hello my friend from server");
    });
    socket.onDisconnect(() => {
        console.log("client disconnected");
    });
    socket.on("writeToRoom", (data) => {
        socket.emitToRoom("chat1", "sent check", data["message"]);
    });
});
const client = new server_2.Io(3000);
const clientServe = client.createConnection(() => {
    console.log("connected client");
});
clientServe.on("message", (data) => {
    console.log(data, "reading data on client");
});
clientServe.emit("message", "message from client");
setTimeout(() => {
    clientServe.close();
}, 1500);
