/* ===== MAIN.JS ===== */
/* Logika Interaktif: Navbar, Filter Buku, dan Keranjang Belanja */

// --- MENU HAMBURGER MOBILE ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// --- FILTER KATEGORI BUKU ---
function filterBuku(kategori) {
  // Atur kelas tombol aktif
  const tabs = document.querySelectorAll('.filter-tabs .tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const eventTarget = window.event ? window.event.target : null;
  if (eventTarget) eventTarget.classList.add('active');

  // Filter tampilan kartu buku
  const kartuBuku = document.querySelectorAll('.buku-card');
  kartuBuku.forEach(kartu => {
    const kategoriBuku = kartu.getAttribute('data-kategori');
    if (kategori === 'semua' || kategoriBuku === kategori) {
      kartu.style.display = 'block';
    } else {
      kartu.style.display = 'none';
    }
  });
}

// --- SISTEM KERANJANG BELANJA ---
let dataKeranjang = [];

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  if (panel) {
    panel.classList.toggle('open');
    // Animasi geser jika CSS transisi digunakan
    if (!panel.classList.contains('open')) {
      panel.style.transform = 'translateX(100%)';
    } else {
      panel.style.transform = 'translateX(0)';
    }
  }
}

function tambahKeranjang(namaBuku, harga) {
  const itemAda = dataKeranjang.find(item => item.nama === namaBuku);
  
  if (itemAda) {
    itemAda.jumlah += 1;
  } else {
    dataKeranjang.push({ nama: namaBuku, harga: harga, jumlah: 1 });
  }
  
  updateTampilanKeranjang();
  
  // Otomatis buka panel keranjang belanja
  const panel = document.getElementById('cartPanel');
  if (panel && !panel.classList.contains('open')) {
    toggleCart();
  }
}

function beliPromo(namaPaket, harga) {
  tambahKeranjang(namaPaket, harga);
}

function hapusItemKeranjang(index) {
  dataKeranjang.splice(index, 1);
  updateTampilanKeranjang();
}

function updateTampilanKeranjang() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  const totalBarang = dataKeranjang.reduce((sum, item) => sum + item.jumlah, 0);
  if (cartCount) cartCount.textContent = totalBarang;

  if (dataKeranjang.length === 0) {
    if (cartItems) cartItems.innerHTML = '<p class="cart-empty">Keranjang masih kosong</p>';
    if (cartTotal) cartTotal.textContent = 'Rp 0';
    return;
  }

  let htmlItem = '';
  let totalBiaya = 0;

  dataKeranjang.forEach((item, index) => {
    const subTotal = item.harga * item.jumlah;
    totalBiaya += subTotal;
    
    htmlItem += `
      <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #eee; padding-bottom:8px;">
        <div>
          <h5 style="margin:0 0 4px 0; font-size:0.9rem;">${item.nama}</h5>
          <small style="color:#666;">${item.jumlah}x @ Rp ${item.harga.toLocaleString('id-ID')}</small>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-weight:600; font-size:0.9rem;">Rp ${subTotal.toLocaleString('id-ID')}</span>
          <button onclick="hapusItemKeranjang(${index})" style="background:none; border:none; color:#e63946; cursor:pointer;">🗑️</button>
        </div>
      </div>
    `;
  });

  if (cartItems) cartItems.innerHTML = htmlItem;
  if (cartTotal) cartTotal.textContent = `Rp ${totalBiaya.toLocaleString('id-ID')}`;
}

function checkout() {
  if (dataKeranjang.length === 0) {
    alert('Keranjang belanja kamu masih kosong!');
    return;
  }
  
  // Memeriksa apakah user sudah login sebelum checkout
  const userSudahLogin = localStorage.getItem('userLogin');
  if (!userSudahLogin) {
    alert('⚠️ Kamu harus masuk (login) terlebih dahulu sebelum melakukan checkout pesanan.');
    window.location.href = 'login/index.html'; // Mengarah langsung ke folder login
    return;
  }

  const user = JSON.parse(userSudahLogin);
  alert(`🛍️ Terima kasih, ${user.username}!\nPesananmu berhasil diproses.\nTotal pembayaran: ${document.getElementById('cartTotal').textContent}`);
  
  // Reset keranjang setelah dibeli
  dataKeranjang = [];
  updateTampilanKeranjang();
  toggleCart();
}
/* ===== TAMBAHKAN INI DI FILE JS HALAMAN UTAMA (script.js / main.js) ===== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambil semua tombol beli yang ada di halaman utama
  // Sesuaikan '.btn-beli' atau '.buy-btn' dengan nama class tombol beli di HTML-mu
  const tombolBeliAll = document.querySelectorAll('.btn-beli, .buy-btn, [id^="btnBeli"]');

  tombolBeliAll.forEach(tombol => {
    tombol.addEventListener('click', (e) => {
      // Ambil data login dari localStorage
      const userLogin = localStorage.getItem('userLogin');

      // 2. JIKA BELUM LOGIN
      if (!userLogin) {
        // Tahan proses pembelian / masuk keranjang
        e.preventDefault(); 
        
        alert('⚠️ Anda harus login terlebih dahulu untuk membeli buku!');
        
        // Alihkan paksa ke halaman login (sesuaikan jalurnya dengan struktur foldermu)
        window.location.href = 'login/index.html'; 
        return;
      }

      // 3. JIKA SUDAH LOGIN
      // Tuliskan logika pembelianmu di bawah ini (misal: masuk keranjang atau checkout)
      console.log('User sudah login, proses pembelian dilanjutkan...');
      // alert('Buku berhasil ditambahkan ke keranjang!'); // contoh penanda
    });
  });
});
