const net = require("net");

const client = new net.Socket();

// setTimeout(() => {}, timeout);
client.connect(3000, "localhost", () => {
  console.log("Connected to server.");

  client.write(JSON.stringify({ path: "data", data: "rogor xar?", end: true }));
  client.write(
    JSON.stringify({ path: "join", data: { room: "chat1" }, end: true })
  );
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

// client.on("data", (data) => {
//   console.log(`Received data from server: ${data}`);
//   client.end();
// });

const client2 = new net.Socket();

client2.connect(3000, "localhost", () => {
  console.log("Connected to server.");

  client2.write(
    JSON.stringify({ path: "data", data: "rogor xar?", end: true })
  );

  client2.write(
    JSON.stringify({ path: "join", data: { room: "chat1" }, end: true })
  );

  setTimeout(() => {
    client2.write(
      JSON.stringify({
        path: "writeToRoom",
        data: { room: "chat1", message: "from socket 2" },
        end: true,
      })
    );
  }, 1000);

  client2.write(
    JSON.stringify({
      path: "message",
      data: { name: "zaali", age: 15 },
      end: true,
    })
  );
});

client2.on("data", (data) => {
  console.log(data.toString());
});
client.on("data", (data) => {
  console.log(data.toString());
});
// client2.on("end", () => {
//   console.log("ended");
// });

// client2.on("data", (data) => {
//   console.log(`Received data from server: ${data}`);
//   client2.end();
// });

// setTimeout(() => {
//   client2.end();
// }, 5000);
