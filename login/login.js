/* ===== LOGIN.JS ===== */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePwBtn = document.getElementById('togglePw');

  // 1. FUNGSI UNTUK PROSES SUBMIT LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value;

      if (usernameVal === '' || passwordVal === '') {
        alert('Username dan password tidak boleh kosong!');
        return;
      }

      // Ambil database user dari localStorage (hasil register)
      const databaseUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];

      // Cek apakah data cocok dengan akun bawaan (Demo) atau hasil register
      const userDitemukan = databaseUser.find(u => u.username === usernameVal && u.password === passwordVal);

      if ((usernameVal === 'heri' && passwordVal === '123') || (usernameVal === 'admin' && passwordVal === '123')) {
        // Jika pakai akun demo bawaan HTML kamu
        localStorage.setItem('userLogin', JSON.stringify({ username: usernameVal }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil! (Akun Demo)');
        window.location.href = '../index.html';
      } else if (userDitemukan) {
        // Jika pakai akun hasil register baru
        localStorage.setItem('userLogin', JSON.stringify({ username: userDitemukan.username }));
        localStorage.setItem('baruLogin', '1');
        alert('🔑 Login Berhasil!');
        window.location.href = '../index.html';
      } else {
        alert('❌ Username atau password salah! Periksa kembali atau silakan daftar akun baru.');
      }
    });
  }

  // 2. FUNGSI TOMBOL MATA (LIHAT PASSWORD)
  if (togglePwBtn && passwordInput) {
    togglePwBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePwBtn.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }
});

// 3. FUNGSI UNTUK FITUR DIKLIK LANGSUNG ISI DATA (DEMO HINT)
function isiDemo(username, password) {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  if (usernameInput && passwordInput) {
    usernameInput.value = username;
    passwordInput.value = password;
  }
}
