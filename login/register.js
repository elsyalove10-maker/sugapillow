/* ===== REGISTER.JS (FIXED) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form') || document.getElementById('registerForm');
  const usernameInput = document.querySelector('input[type="text"]');
  // Ambil semua input password di halaman register
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const togglePwBtn = document.getElementById('togglePw') || document.querySelector('.toggle-pw');

  // 1. Logika Mata Register (Mengubah semua field password sekaligus)
  if (togglePwBtn && passwordInputs.length > 0) {
    togglePwBtn.addEventListener('click', () => {
      // Cek input pertama sebagai acuan
      const tipeBaru = passwordInputs[0].type === 'password' ? 'text' : 'password';
      
      passwordInputs.forEach(input => {
        input.type = tipeBaru;
      });

      togglePwBtn.textContent = tipeBaru === 'password' ? '👁️' : '🙈';
    });
  }

  // 2. Logika Submit Register
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameVal = usernameInput ? usernameInput.value.trim() : '';
      const passwordVal = passwordInputs[0] ? passwordInputs[0].value : '';
      const confirmPasswordVal = passwordInputs[1] ? passwordInputs[1].value : '';

      if (!usernameVal || !passwordVal) {
        alert('Username dan Password tidak boleh kosong!');
        return;
      }

      if (passwordInputs[1] && passwordVal !== confirmPasswordVal) {
        alert('❌ Password dan Konfirmasi Password tidak cocok!');
        return;
      }

      const daftarUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];
      const userSudahAda = daftarUser.find(u => u.username === usernameVal);
      
      if (userSudahAda) {
        alert('❌ Username sudah digunakan!');
        return;
      }

      // SIMPAN DATA KE REGISTER
      daftarUser.push({ username: usernameVal, password: passwordVal });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      alert('🎉 Registrasi Berhasil! Silakan masuk dengan akun baru Anda.');
      window.location.href = 'index.html'; // Pindah ke halaman login
    });
  }
});
