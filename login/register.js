/* ===== REGISTER.JS ===== */
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm'); // Ganti dengan ID form register-mu jika beda

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Ambil input dari form register
      const usernameInput = document.getElementById('regUsername').value.trim();
      const passwordInput = document.getElementById('regPassword').value;

      if (usernameInput === '' || passwordInput === '') {
        alert('Username dan Password tidak boleh kosong!');
        return;
      }

      // 1. Ambil data user yang sudah ada di localStorage, atau bikin array baru kalau masih kosong
      const daftarUser = JSON.parse(localStorage.getItem('daftarUserAll')) || [];

      // 2. Cek apakah username sudah pernah didaftarkan orang lain
      const userSudahAda = daftarUser.find(u => u.username === usernameInput);
      if (userSudahAda) {
        alert('❌ Username sudah digunakan! Silakan pilih nama lain.');
        return;
      }

      // 3. Masukkan user baru ke dalam array database lokal
      daftarUser.push({ username: usernameInput, password: passwordInput });
      localStorage.setItem('daftarUserAll', JSON.stringify(daftarUser));

      alert('🎉 Registrasi berhasil! Silakan masuk menggunakan akun baru Anda.');
      
      // 4. Pindahkan user ke halaman login (atau geser form jika satu halaman)
      window.location.reload(); 
    });
  }

  // --- LOGIKA TOMBOL MATA DI REGISTER ---
  const togglePasswordReg = document.getElementById('togglePasswordReg'); // ID ikon mata di form register
  const regPassword = document.getElementById('regPassword'); // ID input password di form register

  if (togglePasswordReg && regPassword) {
    togglePasswordReg.addEventListener('click', function () {
      // Tukar tipe input antara password dan text
      const type = regPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      regPassword.setAttribute('type', type);
      
      // Tukar ikon/emoji mata (opsional jika kamu pakai teks/emoji)
      this.textContent = type === 'password' ? '👁️' : '🙈';
    });
  }
});
