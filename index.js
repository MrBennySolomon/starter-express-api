const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");



app.use(cors());

app.use(express.json());

const server = http.createServer(app);

dotenv.config({ path: './config/config.env' });

// connectDB();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
