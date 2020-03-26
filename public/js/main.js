let chatForm = document.getElementById("chat-form");

let socket = io();

socket.on("message", message => {
  console.log(message);
});

// Message submit

chatForm.addEventListener("submit", e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  // Emitting message to server
  socket.emit("chatMessage", msg);
});
