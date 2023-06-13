import net from "net";

const client = new net.Socket();

client.connect(8080, "localhost", () => {
  console.log("Connected to server.");

  client.write("Hello, server!");
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
