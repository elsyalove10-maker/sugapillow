/* ===== LOGIN.JS (UTUH & INSTAN) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value;

      if (usernameVal === '' || passwordVal === '') {
        alert('Username dan password tidak boleh kosong!');
        return;
      }

      // Ambil data dari register
      const databaseUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];
      const userDitemukan = databaseUser.find(u => u.username === usernameVal && u.password === passwordVal);

      // Eksekusi login instan tanpa delay animasi loader bawaan template
      if ((usernameVal === 'heri' && passwordVal === '123') || (usernameVal === 'admin' && passwordVal === '123')) {
        localStorage.setItem('userLogin', JSON.stringify({ username: usernameVal }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil! (Akun Demo)');
        window.location.href = '../index.html';
      } else if (userDitemukan) {
        localStorage.setItem('userLogin', JSON.stringify({ username: userDitemukan.username }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil!');
        window.location.href = '../index.html';
      } else {
        alert('❌ Username atau password salah! Periksa kembali atau daftar akun baru.');
      }
    });
  }
});

// Fungsi global untuk tombol mata di halaman login (berjalan lewat onclick="togglePassword()")
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const togglePwBtn = document.getElementById('togglePw');
  
  if (passwordInput && togglePwBtn) {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePwBtn.textContent = type === 'password' ? '👁️' : '🙈';
  }
}
