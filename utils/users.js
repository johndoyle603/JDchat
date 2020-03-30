let users = [];

// Join user to the chat

function userJoin(id, username, room) {
  let user = { id, username, room };

  users.push(user);

  return user;
}

// Get the current user

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  userJoin,
  getCurrentUser
};
