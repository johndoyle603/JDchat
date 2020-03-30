let chatForm = document.getElementById("chat-form");
let chatMessages = document.querySelector(".chat-messages");

// Get user name and room from URL

let { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

let socket = io();

// Join the chatroom

socket.emit("joinRoom", { username, room });

// Message from Server
socket.on("message", message => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit

chatForm.addEventListener("submit", e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM

function outputMessage(message) {
  let div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
