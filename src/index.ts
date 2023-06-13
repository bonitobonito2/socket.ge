import { Server } from "./socket/server";

const io = new Server(3000);

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (data) => {
    console.log("recived message", data);
    console.log(socket.id, "user id on server");
  });

  socket.emit("message from server", "gamarjobas getyvis ia");

  socket.on("chatting", (data) => {
    console.log("recived chat", data);

    socket.emit("listened", "hello my friend from server");
  });
  socket.onDisconnect(() => {
    console.log("client disconnected");
  });
});
