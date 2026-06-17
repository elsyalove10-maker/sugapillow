/* ===== REGISTER.JS (FIXED TOTAL & INSTAN) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const /* ===== REGISTER.JS (SOLUSI TOTAL) ===== */

// 1. FUNGSI MATA (Langsung nembak ID secara paksa saat diklik)
function mataRegister() {
  const pass1 = document.getElementById('regPassword');
  const pass2 = document.getElementById('regConfirmPassword');
  const tombolMata = document.querySelector('.toggle-pw');

  if (pass1) {
    if (pass1.type === 'password') {
      pass1.type = 'text';
      if (pass2) pass2.type = 'text';
      if (tombolMata) tombolMata.textContent = '🙈';
    } else {
      pass1.type = 'password';
      if (pass2) pass2.type = 'password';
      if (tombolMata) tombolMata.textContent = '👁️';
    }
  }
}

// 2. FUNGSI SUBMIT REGISTER INSTAN
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form') || document.getElementById('registerForm');
  const usernameInput = document.querySelector('input[type="text"]');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      // Potong semua script bawaan template secara paksa
      e.preventDefault();
      e.stopPropagation();

      const pass1 = document.getElementById('regPassword');
      const pass2 = document.getElementById('regConfirmPassword');

      const usernameVal = usernameInput ? usernameInput.value.trim() : '';
      const passwordVal = pass1 ? pass1.value : '';
      const confirmPasswordVal = pass2 ? pass2.value : '';

      if (!usernameVal || !passwordVal) {
        alert('Username dan Password tidak boleh kosong!');
        return;
      }

      if (passwordVal !== confirmPasswordVal) {
        alert('❌ Password dan Konfirmasi Password tidak cocok!');
        return;
      }

      const daftarUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];
      const userSudahAda = daftarUser.find(u => u.username === usernameVal);
      
      if (userSudahAda) {
        alert('❌ Username sudah digunakan!');
        return;
      }

      // Simpan data detik itu juga ke localStorage
      daftarUser.push({ username: usernameVal, password: passwordVal });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      // Pop-up keluar dan langsung pindahkan halaman secara paksa
      alert('🎉 Registrasi Berhasil! Silakan masuk dengan akun baru Anda.');
      window.location.replace('index.html'); 
    });
  }
});registerForm = document.querySelector('form') || document.getElementById('registerForm');
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
