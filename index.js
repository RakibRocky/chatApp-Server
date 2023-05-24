const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://splendid-entremet-e9f74d.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (Socket) => {
  console.log(`User Connected:${Socket.id}`);

  Socket.on("join_room", (data) => {
    Socket.join(data);
    console.log(`User Connected:${Socket.id} with room ${data}`);
  });
  Socket.on("send_message", (data) => {
    Socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });
  Socket.on("disconnect", () => {
    console.log("User disconnectedd", Socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server Running");
});
