/* ===== LOGIN.JS ===== */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm'); // Ganti sesuai ID form login-mu

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameInput = document.getElementById('loginUsername').value.trim();
      const passwordInput = document.getElementById('loginPassword').value;

      // 1. Ambil database user dari localStorage yang dibuat saat register
      const databaseUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];

      // Akun tiruan bawaan (opsional, jika ingin tetap ada akun default admin)
      if (usernameInput === 'admin' && passwordInput === 'admin123') {
        localStorage.setItem('userLogin', JSON.stringify({ username: 'Admin' }));
        localStorage.setItem('baruLogin', '1');
        window.location.href = '../index.html';
        return;
      }

      // 2. Cocokkan input dengan data hasil register
      const userDitemukan = databaseUser.find(u => u.username === usernameInput && u.password === passwordInput);

      if (userDitemukan) {
        // Jika cocok, simpan sesi login dan lempar ke halaman utama
        localStorage.setItem('userLogin', JSON.stringify({ username: userDitemukan.username }));
        localStorage.setItem('baruLogin', '1'); // Flag untuk memicu sapaan di welcome.js
        
        alert('🔑 Login Berhasil!');
        window.location.href = '../index.html'; // Kembali ke halaman utama di luar folder login
      } else {
        alert('❌ Username atau Password salah! Periksa kembali atau silakan Register terlebih dahulu.');
      }
    });
  }

  // --- LOGIKA TOMBOL MATA DI LOGIN (Pastikan ini juga ada) ---
  const togglePasswordLogin = document.getElementById('togglePasswordLogin');
  const loginPassword = document.getElementById('loginPassword');

  if (togglePasswordLogin && loginPassword) {
    togglePasswordLogin.addEventListener('click', function () {
      const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      loginPassword.setAttribute('type', type);
      this.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }
});
