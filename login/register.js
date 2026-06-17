/* ===== REGISTER.JS (UTUH & INSTAN) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('form') || document.getElementById('registerForm');
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameVal = usernameInput ? usernameInput.value.trim() : '';
      // Input password pertama (Minimal 6 karakter)
      const passwordVal = passwordInputs[0] ? passwordInputs[0].value : '';
      // Input password kedua (Konfirmasi Password)
      const confirmPasswordVal = passwordInputs[1] ? passwordInputs[1].value : '';

      if (usernameVal === '' || passwordVal === '') {
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
        alert('❌ Username sudah digunakan! Silakan pilih nama lain.');
        return;
      }

      // Simpan akun baru ke database lokal browser
      daftarUser.push({ username: usernameVal, password: passwordVal });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      alert('🎉 Registrasi Berhasil! Silakan masuk dengan akun baru Anda.');
      window.location.href = 'index.html'; // Balik langsung ke halaman login
    });
  }
});

// Fungsi global untuk tombol mata di halaman register (berjalan lewat onclick="togglePasswordRegister()")
function togglePasswordRegister() {
  // Ambil semua field password yang ada di halaman register
  const fields = document.querySelectorAll('input[name*="password"], input[id*="password"], input[type="password"], input[type="text"]');
  const togglePwBtn = document.getElementById('togglePw') || document.querySelector('.toggle-pw');
  
  if (fields.length > 0 && togglePwBtn) {
    // Ambil input pertama sebagai acuan tipe saat ini
    const targetField = fields[0];
    const type = targetField.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Ubah tipe untuk semua field password (termasuk konfirmasi) yang sejajar
    const allPassInputs = document.querySelectorAll('input');
    allPassInputs.forEach(input => {
      if (input.placeholder.toLowerCase().includes('karakter') || input.placeholder.toLowerCase().includes('konfirmasi') || input.type === 'password' || input.type === 'text' && input.id.toLowerCase().includes('password')) {
        // Hanya ubah field teks yang memang merupakan input password/konfirmasi
        if(input.placeholder.toLowerCase().includes('karakter') || input.placeholder.toLowerCase().includes('konfirmasi')) {
           input.setAttribute('type', type);
        }
      }
    });
    
    togglePwBtn.textContent = type === 'password' ? '👁️' : '🙈';
  }
}
