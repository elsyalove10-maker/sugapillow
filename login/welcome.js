/* ===== REGISTER.JS ===== */
/* Menggunakan REST API: https://herisusanta.my.id/javalogin/api/ */

const API_BASE = 'https://herisusanta.my.id/javalogin/api/';

/* ===== PASSWORD STRENGTH CHECKER ===== */
document.getElementById('password').addEventListener('input', function() {
  cekKekuatanPassword(this.value);
});

function cekKekuatanPassword(pw) {
  const fill = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');

  let skor = 0;
  if (pw.length >= 6) skor++;
  if (pw.length >= 10) skor++;
  if (/[A-Z]/.test(pw)) skor++;
  if (/[0-9]/.test(pw)) skor++;
  if (/[^A-Za-z0-9]/.test(pw)) skor++;

  const level = [
    { persen: 0,   warna: '#e0d9d0', teks: '' },
    { persen: 20,  warna: '#e63946', teks: '🔴 Sangat Lemah' },
    { persen: 40,  warna: '#f4a261', teks: '🟠 Lemah' },
    { persen: 60,  warna: '#e9c46a', teks: '🟡 Sedang' },
    { persen: 80,  warna: '#52b788', teks: '🟢 Kuat' },
    { persen: 100, warna: '#2d6a4f', teks: '💚 Sangat Kuat' }
  ][skor];

  fill.style.width = level.persen + '%';
  fill.style.background = level.warna;
  label.textContent = level.teks;
  label.style.color = level.warna;
}

/* ===== REAL-TIME KONFIRMASI PASSWORD ===== */
document.getElementById('konfirmPassword').addEventListener('input', function() {
  const pw = document.getElementById('password').value;
  const kf = this.value;
  if (kf && pw !== kf) {
    setError('errKonfirm', '⚠️ Password tidak cocok');
    this.className = 'invalid';
  } else if (kf) {
    setError('errKonfirm', '');
    this.className = 'valid';
  }
});

/* ===== FORM SUBMIT ===== */
document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validasiRegister()) return;

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  setBtnLoading(true);
  tampilAlert('info', '🔄 Sedang mendaftarkan akun...');

  try {
    const response = await fetch(API_BASE + 'register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.status === 'success' || data.message === 'Registrasi berhasil') {
      tampilAlert('success', `✅ Akun berhasil dibuat! Silakan login dengan username <strong>${username}</strong>.`);
      alert(`✅ Pendaftaran Berhasil!\n\nAkun "${username}" berhasil didaftarkan! 🎉\n\nKamu akan diarahkan ke halaman login.`);
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);

    } else if (data.message && data.message.toLowerCase().includes('username')) {
      tampilAlert('error', `❌ Username "${username}" sudah digunakan. Pilih username lain.`);
      alert(`❌ Pendaftaran Gagal!\n\nUsername "${username}" sudah digunakan oleh orang lain.\nSilakan pilih username yang berbeda.`);
      setBtnLoading(false);

    } else {
      const pesan = data.message || 'Pendaftaran gagal. Coba lagi.';
      tampilAlert('error', `❌ ${pesan}`);
      alert(`❌ Pendaftaran Gagal!\n\n${pesan}`);
      setBtnLoading(false);
    }

  } catch (error) {
    console.error('API Error:', error);
    // Fallback: simpan ke localStorage
    registerLokal(username, email, password);
  }
});

/* ===== FALLBACK REGISTER LOKAL ===== */
function registerLokal(username, email, password) {
  const akunTerdaftar = JSON.parse(localStorage.getItem('akunTerdaftar') || '[]');

  // Cek username sudah ada
  const akunResmi = ['heri', 'admin'];
  const sudahAda = akunTerdaftar.find(a => a.username === username) || akunResmi.includes(username);

  if (sudahAda) {
    tampilAlert('error', `❌ Username "<strong>${username}</strong>" sudah digunakan! Pilih username lain.`);
    alert(`❌ Pendaftaran Gagal!\n\nUsername "${username}" sudah digunakan.\nSilakan pilih username yang berbeda.`);
    setBtnLoading(false);
    return;
  }

  // Tambah akun baru
  akunTerdaftar.push({ username, email, password, role: 'user', daftarAt: new Date().toISOString() });
  localStorage.setItem('akunTerdaftar', JSON.stringify(akunTerdaftar));

  tampilAlert('success', `✅ Akun <strong>${username}</strong> berhasil didaftarkan! Mengalihkan ke login...`);
  alert(`✅ Pendaftaran Berhasil! 🎉\n\nAkun "${username}" berhasil dibuat!\nKamu sudah bisa login sekarang.\n\nKamu akan diarahkan ke halaman login.`);
  setTimeout(() => { window.location.href = 'index.html'; }, 1500);
}

/* ===== VALIDASI FORM ===== */
function validasiRegister() {
  let valid = true;

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const konfirm = document.getElementById('konfirmPassword').value;
  const setuju = document.getElementById('setuju').checked;

  // Reset semua error
  ['errUsername', 'errEmail', 'errPassword', 'errKonfirm', 'errSetuju'].forEach(id => setError(id, ''));
  ['username', 'email', 'password', 'konfirmPassword'].forEach(id => {
    document.getElementById(id).className = '';
  });

  // Validasi username
  if (!username) {
    setError('errUsername', '⚠️ Username wajib diisi');
    document.getElementById('username').className = 'invalid';
    valid = false;
  } else if (username.length < 3) {
    setError('errUsername', '⚠️ Username minimal 3 karakter');
    document.getElementById('username').className = 'invalid';
    valid = false;
  } else if (/\s/.test(username)) {
    setError('errUsername', '⚠️ Username tidak boleh mengandung spasi');
    document.getElementById('username').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('username').className = 'valid';
  }

  // Validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('errEmail', '⚠️ Email wajib diisi');
    document.getElementById('email').className = 'invalid';
    valid = false;
  } else if (!emailRegex.test(email)) {
    setError('errEmail', '⚠️ Format email tidak valid (contoh: nama@email.com)');
    document.getElementById('email').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('email').className = 'valid';
  }

  // Validasi password
  if (!password) {
    setError('errPassword', '⚠️ Password wajib diisi');
    document.getElementById('password').className = 'invalid';
    valid = false;
  } else if (password.length < 6) {
    setError('errPassword', '⚠️ Password minimal 6 karakter');
    document.getElementById('password').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('password').className = 'valid';
  }

  // Validasi konfirmasi password
  if (!konfirm) {
    setError('errKonfirm', '⚠️ Konfirmasi password wajib diisi');
    document.getElementById('konfirmPassword').className = 'invalid';
    valid = false;
  } else if (password !== konfirm) {
    setError('errKonfirm', '⚠️ Password dan konfirmasi tidak cocok');
    document.getElementById('konfirmPassword').className = 'invalid';
    valid = false;
  } else {
    document.getElementById('konfirmPassword').className = 'valid';
  }

  // Validasi setuju
  if (!setuju) {
    setError('errSetuju', '⚠️ Kamu harus menyetujui Syarat & Ketentuan');
    valid = false;
  }

  return valid;
}

/* ===== TOGGLE PASSWORD ===== */
function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === 'password' ? 'text' : 'password';
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
