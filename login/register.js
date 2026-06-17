/* ===== REGISTER.JS (FIXED TOTAL & INSTAN) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form') || document.getElementById('registerForm');
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const togglePwBtn = document.getElementById('togglePw') || document.querySelector('.toggle-pw');

  // 1. Logika Mata Register
  if (togglePwBtn && passwordInputs.length > 0) {
    togglePwBtn.addEventListener('click', () => {
      const tipeBaru = passwordInputs[0].type === 'password' ? 'text' : 'password';
      passwordInputs.forEach(input => {
        input.type = tipeBaru;
      });
      togglePwBtn.textContent = tipeBaru === 'password' ? '👁️' : '🙈';
    });
  }

  // 2. Logika Submit Register (Dibuat Instan)
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      // STOP animasi loader bawaan template agar tidak ada delay
      e.stopPropagation(); 
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

      // Simpan data detik itu juga
      daftarUser.push({ username: usernameVal, password: passwordVal });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      // Langsung pop-up dan pindah halaman tanpa nunggu animasi selesai
      alert('🎉 Registrasi Berhasil! Silakan masuk dengan akun baru Anda.');
      window.location.href = 'index.html'; 
    });
  }
});
