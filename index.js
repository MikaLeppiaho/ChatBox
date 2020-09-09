const app = require("./app");
const config = require("./utils/config");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("chatMessage", (msg) => {
    console.log("msg:", msg);
    io.emit("message", msg);
  });
});

server.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});
