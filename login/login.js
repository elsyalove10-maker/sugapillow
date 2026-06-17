/* ===== LOGIN.JS (UTUH & AMAN) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value;

      if (usernameVal === '' || passwordVal === '') {
        alert('Username dan password tidak boleh kosong!');
        return;
      }

      // Deteksi Akun Demo
      if ((usernameVal === 'heri' && passwordVal === '123') || (usernameVal === 'admin' && passwordVal === '123')) {
        localStorage.setItem('userLogin', JSON.stringify({ username: usernameVal }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil! (Akun Demo)');
        window.location.href = '../index.html';
        return;
      }

      // Deteksi Database Akun Register
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

// Fungsi Tombol Mata Login
function togglePasswordLogin() {
  const passwordInput = document.getElementById('password');
  const togglePwBtn = document.getElementById('togglePw');
  
  if (passwordInput && togglePwBtn) {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePwBtn.textContent = type === 'password' ? '👁️' : '🙈';
  }
}

// Fungsi Otomatis Isi Kolom dari Klik Demo Hint
function isiDemo(username, password) {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  if (usernameInput && passwordInput) {
    usernameInput.value = username;
    passwordInput.value = password;
  }
}
