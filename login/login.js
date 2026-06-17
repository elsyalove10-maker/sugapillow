/* ===== LOGIN.JS ===== */
const API_BASE = 'https://herisusanta.my.id/javalogin/api/';

/* ===== CEK SUDAH LOGIN ===== */
window.addEventListener('DOMContentLoaded', () => {
  const userData = localStorage.getItem('userLogin');
  if (userData) {
    const user = JSON.parse(userData);
    tampilAlert('info', `⚠️ Kamu sudah login sebagai <strong>${user.username}</strong>. <a href="../index.html">Kembali ke beranda</a>`);
  }
});

/* ===== FORM SUBMIT ===== */
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validasiLogin()) return;

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  setBtnLoading(true);
  tampilAlert('info', '🔄 Sedang memproses login...');

  try {
    const response = await fetch(API_BASE + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.status === 'success' || data.token || data.message === 'Login berhasil') {
      const userLogin = {
        username: data.username || username,
        token: data.token || 'api_token_' + Date.now(),
        role: data.role || 'user',
        loginAt: new Date().toISOString()
      };
      
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
      localStorage.setItem('baruLogin', '1'); // Flag sapaan di index.html

      tampilAlert('success', `✅ Login berhasil! Selamat datang, <strong>${userLogin.username}</strong>! Mengalihkan...`);
      alert(`✅ Login berhasil!\n\nSelamat datang, ${userLogin.username}! 📚\nKamu akan diarahkan ke beranda.`);

      setTimeout(() => { window.location.href = '../index.html'; }, 500);
    } else {
      const pesan = data.message || 'Username atau password salah!';
      tampilAlert('error', `❌ ${pesan}`);
      alert(`❌ Login Gagal!\n\n${pesan}`);
      setBtnLoading(false);
    }
  } catch (error) {
    console.warn('API Error, mencoba login via data lokal...');
    loginLokal(username, password);
  }
});

/* ===== FALLBACK LOGIN LOKAL ===== */
function loginLokal(username, password) {
  const akunResmi = [
    { username: 'heri', password: '123', role: 'user' },
    { username: 'admin', password: '123', role: 'admin' }
  ];

  const akunTerdaftar = JSON.parse(localStorage.getItem('akunTerdaftar') || '[]');
  const semuaAkun = [...akunResmi, ...akunTerdaftar];

  // Pencarian case-insensitive agar lebih fleksibel
  const cocok = semuaAkun.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);

  if (cocok) {
    const userLogin = {
      username: cocok.username,
      token: 'local_' + Date.now(),
      role: cocok.role || 'user',
      loginAt: new Date().toISOString()
    };
    
    localStorage.setItem('userLogin', JSON.stringify(userLogin));
    localStorage.setItem('baruLogin', '1');

    tampilAlert('success', `✅ Login berhasil! Selamat datang, <strong>${cocok.username}</strong>!`);
    alert(`✅ Login berhasil!\n\nSelamat datang, ${cocok.username}! 📚\nKamu akan diarahkan ke beranda.`);

    setTimeout(() => { window.location.href = '../index.html'; }, 1000);
  } else {
    tampilAlert('error', '❌ Username atau password salah.');
    alert('❌ Login Gagal!\n\nUsername atau password salah.\n\nCoba akun demo:\n• heri | 123\n• admin | 123');
    setBtnLoading(false);
  }
}

/* ===== VALIDASI FORM ===== */
function validasiLogin() {
  let valid = true;
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  setError('errUsername', '');
  setError('errPassword', '');

  if (!username || username.length < 3) {
    setError('errUsername', '⚠️ Username minimal 3 karakter');
    document.getElementById('username').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('username').className = 'valid';
  }

  if (!password || password.length < 3) {
    setError('errPassword', '⚠️ Password minimal 3 karakter');
    document.getElementById('password').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('password').className = 'valid';
  }

  return valid;
}

/* ===== TOGGLE PASSWORD ===== */
function togglePassword() {
  const input = document.getElementById('password');
  const btn = document.getElementById('togglePw');
  if (!input || !btn) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

/* ===== ISI DATA DEMO ===== */
function isiDemo(user, pass) {
  document.getElementById('username').value = user;
  document.getElementById('password').value = pass;
  alert(`ℹ️ Data demo diisi:\nUsername: ${user}\nPassword: ${pass}\n\nKlik "Masuk" untuk login!`);
}

/* ===== HELPER ===== */
function tampilAlert(tipe, pesan) {
  const box = document.getElementById('alertBox');
  if (!box) return;
  box.className = 'alert-box ' + tipe;
  box.innerHTML = pesan;
  box.style.display = 'block';
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setError(id, pesan) {
  const el = document.getElementById(id);
  if (el) el.textContent = pesan;
}

function setBtnLoading(loading) {
  const btn = document.getElementById('btnSubmit');
  const txt = document.getElementById('btnText');
  const loader = document.getElementById('btnLoader');
  if (!btn) return;
  btn.disabled = loading;
  if (txt) txt.style.display = loading ? 'none' : 'inline';
  if (loader) loader.style.display = loading ? 'inline' : 'none';
}
