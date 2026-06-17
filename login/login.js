/* ===== LOGIN.JS (FIXED) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePwBtn = document.getElementById('togglePw');

  // 1. Logika Mata (Langsung di dalam, gak pakai onclick HTML)
  if (togglePwBtn && passwordInput) {
    togglePwBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePwBtn.textContent = '🙈';
      } else {
        passwordInput.type = 'password';
        togglePwBtn.textContent = '👁️';
      }
    });
  }

  // 2. Logika Submit Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value;

      if (!usernameVal || !passwordVal) {
        alert('Username dan password tidak boleh kosong!');
        return;
      }

      // Cek Akun Demo Bawaan Terlebih Dahulu
      if ((usernameVal === 'heri' && passwordVal === '123') || (usernameVal === 'admin' && passwordVal === '123')) {
        localStorage.setItem('userLogin', JSON.stringify({ username: usernameVal }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil! (Akun Demo)');
        window.location.href = '../index.html';
        return; // Setop di sini kalau akun demo
      }

      // Jika bukan akun demo, cek database hasil register
      const databaseUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];
      const userDitemukan = databaseUser.find(u => u.username === usernameVal && u.password === passwordVal);

      if (userDitemukan) {
        localStorage.setItem('userLogin', JSON.stringify({ username: userDitemukan.username }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil!');
        window.location.href = '../index.html';
      } else {
        alert('❌ Username atau password salah!');
      }
    });
  }
});
