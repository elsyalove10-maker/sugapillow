/* ===== WELCOME.JS ===== */
/* Menangani status login dan sapaan user di index.html */

document.addEventListener('DOMContentLoaded', () => {
  const userData = localStorage.getItem('userLogin');
  const baruLogin = localStorage.getItem('baruLogin');
  const authContainer = document.getElementById('nav-auth');

  if (userData && authContainer) {
    const user = JSON.parse(userData);

    // 1. Mengubah tombol "Masuk" di navbar menjadi Sapaan & Tombol Keluar
    authContainer.innerHTML = `
      <div class="user-logged-in" style="display: flex; align-items: center; gap: 12px;">
        <span class="user-greeting" style="color: #fff; font-size: 0.95rem;">
          👋 Selamat datang, <strong>${user.username}</strong>!
        </span>
        <button id="btnLogout" class="btn-logout" style="
          background: #e63946; 
          color: white; 
          border: none; 
          padding: 6px 12px; 
          border-radius: 6px; 
          cursor: pointer;
          font-weight: 500;
          transition: 0.2s;
        ">Keluar</button>
      </div>
    `;

    // 2. Jika baru saja dialihkan dari halaman login, tampilkan sambutan pop-up
    if (baruLogin === '1') {
      localStorage.removeItem('baruLogin'); // Hapus flag agar tidak muncul lagi saat di-refresh

      setTimeout(() => {
        alert(`✨ Selamat datang kembali, ${user.username}! ✨\nSelamat menikmati petualangan literasi di Dunia Tere Liye.`);
      }, 300);
    }

    // 3. Logika untuk tombol Keluar (Logout)
    document.getElementById('btnLogout').addEventListener('click', () => {
      if (confirm('Apakah kamu yakin ingin keluar akun?')) {
        localStorage.removeItem('userLogin');
        alert('Kamu telah keluar akun.');
        window.location.reload(); // Refresh halaman untuk mengembalikan tampilan navbar asal
      }
    });
  }
});
