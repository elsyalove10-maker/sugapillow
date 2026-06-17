/* ===== REGISTER.JS ===== */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm') || document.querySelector('form');
  
  // Ambil elemen berdasarkan tipe input agar lebih aman dari salah ID
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const toggleRegPwBtn = document.getElementById('togglePw') || document.querySelector('.toggle-pw');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameVal = usernameInput.value.trim();
      const passwordVal = passwordInput.value;

      if (usernameVal === '' || passwordVal === '') {
        alert('Username dan password tidak boleh kosong!');
        return;
      }

      // Ambil array user lama atau buat baru jika kosong
      const daftarUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];

      // Cek duplikasi username
      const userSudahAda = daftarUser.find(u => u.username === usernameVal);
      if (userSudahAda) {
        alert('❌ Username sudah digunakan! Silakan pilih nama lain.');
        return;
      }

      // Simpan user baru ke database lokal
      daftarUser.push({ username: usernameVal, password: passwordVal });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      alert('🎉 Registrasi Berhasil! Silakan masuk dengan akun baru Anda.');
      window.location.href = 'index.html'; // Pindah balik ke halaman login setelah register sukses
    });
  }

  // Tombol lihat password di register
  if (toggleRegPwBtn && passwordInput) {
    toggleRegPwBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      toggleRegPwBtn.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }
});
