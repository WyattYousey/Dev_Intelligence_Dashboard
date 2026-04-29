export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || {};
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export function register(username, password) {
  const users = getUsers();

  if (users[username]) {
    throw new Error('User already exists');
  }

  users[username] = { password };
  saveUsers(users);
}

export function loginUser(username, password) {
  const users = getUsers();

  if (!users[username]) return null;
  if (users[username].password !== password) return null;

  return { username };
}

export function createFakeJWT(user) {
  return btoa(
    JSON.stringify({
      user,
      exp: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
    })
  );
}

export function parseJWT(token) {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}

export function isTokenValid(token) {
  const parsed = parseJWT(token);
  if (!parsed) return false;
  return parsed.exp > Date.now();
}
