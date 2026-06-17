/* ===== LOGIN.JS ===== */
/* Menggunakan REST API: https://herisusanta.my.id/javalogin/api/ */

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
    // Kirim ke REST API
    const response = await fetch(API_BASE + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.status === 'success' || data.token || data.message === 'Login berhasil') {
      // Simpan data user ke sessionStorage
      const userLogin = {
        username: data.username || username,
        token: data.token || '',
        role: data.role || 'user',
        loginAt: new Date().toISOString()
      };
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
      localStorage.setItem('baruLogin', '1'); // flag: tampilkan sambutan di index.html

      tampilAlert('success', `✅ Login berhasil! Selamat datang, <strong>${userLogin.username}</strong>! Mengalihkan...`);
      alert(`✅ Login berhasil!\n\nSelamat datang, ${userLogin.username}! 📚\nKamu akan diarahkan ke beranda.`);

      setTimeout(() => {
        window.location.href = '../index.html';
      }, 500);

    } else {
      const pesan = data.message || 'Username atau password salah!';
      tampilAlert('error', `❌ ${pesan}`);
      alert(`❌ Login Gagal!\n\n${pesan}\n\nPastikan username dan password benar.`);
      setBtnLoading(false);
    }

  } catch (error) {
    console.error('API Error:', error);
    // Fallback: cek akun demo lokal jika API tidak tersedia
    loginLokal(username, password);
  }
});

/* ===== FALLBACK LOGIN LOKAL ===== */
function loginLokal(username, password) {
  // Akun default dari LKPD
  const akunResmi = [
    { username: 'heri', password: '123', role: 'user' },
    { username: 'admin', password: '123', role: 'admin' }
  ];

  // Akun yang sudah didaftarkan via register
  const akunTerdaftar = JSON.parse(localStorage.getItem('akunTerdaftar') || '[]');
  const semuaAkun = [...akunResmi, ...akunTerdaftar];

  const cocok = semuaAkun.find(a => a.username === username && a.password === password);

  if (cocok) {
    const userLogin = {
      username: cocok.username,
      token: 'local_' + Date.now(),
      role: cocok.role || 'user',
      loginAt: new Date().toISOString()
    };
    localStorage.setItem('userLogin', JSON.stringify(userLogin));

    tampilAlert('success', `✅ Login berhasil! Selamat datang, <strong>${cocok.username}</strong>!`);
    alert(`✅ Login berhasil!\n\nSelamat datang, ${cocok.username}! 📚\nKamu akan diarahkan ke beranda.`);

    setTimeout(() => {
      window.location.href = '../index.html';
    }, 1000);
  } else {
    tampilAlert('error', '❌ Username atau password salah. Periksa kembali data login-mu.');
    alert('❌ Login Gagal!\n\nUsername atau password yang kamu masukkan salah.\n\nCoba akun demo:\n• username: heri | password: 123\n• username: admin | password: 123');
    setBtnLoading(false);
  }
}

/* ===== VALIDASI FORM ===== */
function validasiLogin() {
  let valid = true;

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  // Reset error
  setError('errUsername', '');
  setError('errPassword', '');
  document.getElementById('username').className = '';
  document.getElementById('password').className = '';

  if (!username) {
    setError('errUsername', '⚠️ Username wajib diisi');
    document.getElementById('username').className = 'invalid';
    valid = false;
  } else if (username.length < 3) {
    setError('errUsername', '⚠️ Username minimal 3 karakter');
    document.getElementById('username').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('username').className = 'valid';
  }

  if (!password) {
    setError('errPassword', '⚠️ Password wajib diisi');
    document.getElementById('password').className = 'invalid';
    valid = false;
  } else if (password.length < 3) {
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
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

/* ===== ISI DEMO ===== */
function isiDemo(user, pass) {
  document.getElementById('username').value = user;
  document.getElementById('password').value = pass;
  alert(`ℹ️ Data demo diisi:\nUsername: ${user}\nPassword: ${pass}\n\nKlik "Masuk" untuk login!`);
}

/* ===== HELPER ===== */
function tampilAlert(tipe, pesan) {
  const box = document.getElementById('alertBox');
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
  btn.disabled = loading;
  txt.style.display = loading ? 'none' : 'inline';
  loader.style.display = loading ? 'inline' : 'none';
}
