const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {

  players[socket.id] = {
    x: 100,
    y: 100
  };

  io.emit("players", players);

  socket.on("move", (data) => {
    players[socket.id] = data;
    io.emit("players", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players", players);
  });

});

server.listen(3000, () => {
  console.log("Server running");
});
