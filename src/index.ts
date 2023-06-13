import { Server } from "./socket/socket";
import net from "net";

const io = new Server(3000);

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("message", (data) => {
    console.log("recived message", data);
  });
  socket.on("data", (data) => [console.log("recived data", data)]);
  socket.on("chatting", (data) => {
    console.log("recived chat", data);
  });
});

const client = new net.Socket();

client.connect(3000, "localhost", () => {
  console.log("Connected to server.");

  client.write(JSON.stringify({ path: "data", data: "rogor xar?", end: true }));
  client.write(JSON.stringify({ path: "message", data: "kargad", end: true }));
  client.write(
    JSON.stringify({ path: "chatting", data: "chatter", end: true })
  );
});

client.on("data", (data) => {
  console.log(`Received data from server: ${data}`);
  client.end();
});

client.on("end", () => {
  console.log("Disconnected from server.");
});

client.on("error", (error) => {
  console.error("Socket error:", error);
});
