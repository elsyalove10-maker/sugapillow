/* ===== REGISTER.JS (SOLUSI FIX 100%) ===== */

// 1. Fungsi Tombol Mata Register
function togglePasswordRegister() {
  const passField = document.getElementById('regPassword');
  const confirmField = document.getElementById('regConfirmPassword');
  const tombolMata = document.getElementById('regTogglePw');

  if (passField) {
    const tipeBaru = passField.type === 'password' ? 'text' : 'password';
    passField.type = tipeBaru;
    if (confirmField) confirmField.type = tipeBaru;
    if (tombolMata) tombolMata.textContent = tipeBaru === 'password' ? '👁️' : '🙈';
  }
}

// 2. Fungsi Submit Simpan Data (Instan Tanpa Delay)
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const usernameInput = document.getElementById('regUsername');
      const passField = document.getElementById('regPassword');
      const confirmField = document.getElementById('regConfirmPassword');

      const usernameVal = usernameInput ? usernameInput.value.trim() : '';
      const passwordVal = passField ? passField.value : '';
      const confirmPasswordVal = confirmField ? confirmField.value : '';

      if (usernameVal === '' || passwordVal === '') {
        alert('Username dan Password tidak boleh kosong!');
        return;
      }

      if (passwordVal !== confirmPasswordVal) {
        alert('❌ Password dan Konfirmasi Password tidak cocok!');
        return;
      }

      // Ambil data lama dari localStorage
      const daftarUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];
      
      // Cek apakah username sudah terdaftar
      const userSudahAda = daftarUser.find(u => u.username === usernameVal);
      if (userSudahAda) {
        alert('❌ Username sudah digunakan! Coba nama lain.');
        return;
      }

      // Proses simpan data ke localStorage detik itu juga
      daftarUser.push({ username: usernameVal, password: passwordVal });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      alert('🎉 Registrasi Berhasil! Silakan masuk dengan akun baru Anda.');
      window.location.href = 'index.html'; // Langsung pindah ke halaman login
    });
  }
});
