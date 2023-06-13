import { Server } from "./socket/server";
import net from "net";

const io = new Server(3000);

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("message", (data) => {
    console.log("recived message", data);
  });
  socket.on("data", (data) => [console.log("recived data", data)]);
  socket.emit("message from server", "gamarjobas getyvis ia");
  socket.on("chatting", (data) => {
    console.log("recived chat", data);
    socket.emit("listened", "hello my friend from server");
  });
});

const client = new net.Socket();

client.connect(3000, "localhost", () => {
  console.log("Connected to server.");

  client.write(JSON.stringify({ path: "data", data: "rogor xar?", end: true }));
  client.write(
    JSON.stringify({
      path: "message",
      data: { name: "zaali", age: 15 },
      end: true,
    })
  );
});

// client.on("end", () => {
//   console.log("ended");
// });

client.on("data", (data) => {
  console.log(`Received data from server: ${data}`);
  client.end();
});
