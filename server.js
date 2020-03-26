let path = require("path");

let http = require("http");

let express = require("express");

let socketio = require("socket.io");

let app = express();

let server = http.createServer(app);

let io = socketio(server);

// This sets static folder

app.use(express.static(path.join(__dirname, "public")));

// Run when client connects

io.on("connection", socket => {
  // Welcome current user
  socket.emit("message", "Welcome to JDchat!");

  // Let me know when a user connects
  socket.broadcast.emit("message", "A user joined chat");

  // Let me know when user disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user left chat");
  });

  // Listen for chat message
  socket.on("chatMessage", msg => {
    io.emit("message", msg);
  });
});

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
