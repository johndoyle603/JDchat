let chatForm = document.getElementById("chat-form");
let chatMessages = document.querySelector(".chat-messages");
let socket = io();

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

  // Emitting message to server
  socket.emit("chatMessage", msg);

  // Clear input

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM

function outputMessage(message) {
  let div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
     ${message}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
