// --- Simple auth using localStorage (demo-only) ---
const LS_USERS = 'shopx_users';
const LS_SESSION = 'shopx_session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(LS_USERS)) || []; }
  catch { return []; }
}

function setUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function register({ name, email, password }) {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !password) return { ok:false, error:'All fields are required.' };
  if (!emailRe.test(email)) return { ok:false, error:'Please enter a valid email.' };
  if (password.length < 6) return { ok:false, error:'Password must be at least 6 characters.' };

  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok:false, error:'An account with this email already exists.' };
  }
  users.push({ name, email, password }); // Note: plain text for demo only
  setUsers(users);
  return { ok:true };
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === (email||'').toLowerCase());
  if (!user || user.password !== password) {
    return { ok:false, error:'Invalid email or password.' };
  }
  localStorage.setItem(LS_SESSION, JSON.stringify({ email:user.email, name:user.name }));
  return { ok:true };
}

function logout() {
  localStorage.removeItem(LS_SESSION);
  location.reload();
}

function currentUser() {
  try { return JSON.parse(localStorage.getItem(LS_SESSION)); }
  catch { return null; }
}

function enforceAuth() {
  if (!currentUser()) location.href = 'login.html';
}
