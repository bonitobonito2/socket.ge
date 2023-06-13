import { Server } from "./socket/server";

const io = new Server(3000);

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (data) => {
    console.log("recived message", data);
    console.log(socket.id, "user id on server");
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
