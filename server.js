let path = require("path");
let http = require("http");
let express = require("express");
let socketio = require("socket.io");
let formatMessage = require("./utils/messages");
let { userJoin, getCurrentUser } = require("./utils/users");
let app = express();
let server = http.createServer(app);
let io = socketio(server);

// This sets static folder

app.use(express.static(path.join(__dirname, "public")));
let botName = "World Famous Chat Room";

// Run when client connects

io.on("connection", socket => {
  socket.on("joinroom", ({ username, room }) => {
    let user = userJoin(socket, id, username, room);

    socket.join(user.room);

    // Welcome current user

    socket.emit(
      "message",
      formatMessage(botName, "Welcome to the World Famous Chat Room!")
    );

    // Broadcast when a user connects

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );
  });

  // Listen for chat message
  socket.on("chatMessage", msg => {
    io.emit("message", formatMessage("USER", msg));
  });

  // Runs when user disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user left the chat"));
  });
});

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
