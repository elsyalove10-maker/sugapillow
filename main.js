/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ===== HAMBURGER ===== */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

/* ===== CEK STATUS LOGIN ===== */
window.addEventListener('DOMContentLoaded', () => {
  const userData = sessionStorage.getItem('userLogin');
  const navAuth = document.getElementById('nav-auth');
  const btnLoginNav = document.getElementById('btnLoginNav');

  if (userData) {
    const user = JSON.parse(userData);
    // Ganti tombol login → tampil nama + logout
    navAuth.innerHTML = `
      <span style="font-size:.85rem;font-weight:600;color:var(--amber)">👤 ${user.username}</span>
      <a href="#" onclick="logout()" class="btn-login" style="margin-left:10px;background:#e63946">Keluar</a>
    `;
    // Alert sambutan
    alert(`✅ Selamat datang kembali, ${user.username}! 📚`);
  }

  // Load cart dari sessionStorage
  const savedCart = sessionStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
});

/* ===== LOGOUT ===== */
function logout() {
  if (confirm('Yakin ingin keluar dari akun?')) {
    sessionStorage.removeItem('userLogin');
    alert('Kamu telah berhasil keluar. Sampai jumpa! 👋');
    location.reload();
  }
}

/* ===== FILTER BUKU ===== */
function filterBuku(kategori) {
  // Update tab aktif
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.buku-card');
  cards.forEach(card => {
    if (kategori === 'semua' || card.dataset.kategori === kategori) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn .4s ease';
    } else {
      card.classList.add('hidden');
    }
  });
}

/* ===== KERANJANG BELANJA ===== */
let cart = [];

function tambahKeranjang(nama, harga) {
  const existing = cart.find(item => item.nama === nama);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  // Alert konfirmasi
  alert(`✅ "${nama}" berhasil ditambahkan ke keranjang!\nHarga: ${formatRupiah(harga)}`);
  // Buka keranjang sebentar
  document.getElementById('cartPanel').classList.add('open');
}

function hapusItem(index) {
  const nama = cart[index].nama;
  cart.splice(index, 1);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  alert(`🗑️ "${nama}" dihapus dari keranjang.`);
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  const totalItem = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.textContent = totalItem;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Keranjang masih kosong 🛒</p>';
  } else {
    cartItems.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-name">${item.nama} ${item.qty > 1 ? `<span style="color:var(--muted);font-size:.8rem">x${item.qty}</span>` : ''}</div>
        <span class="cart-item-price">${formatRupiah(item.harga * item.qty)}</span>
        <button class="cart-item-del" onclick="hapusItem(${idx})" title="Hapus">✕</button>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, i) => sum + (i.harga * i.qty), 0);
  cartTotal.textContent = formatRupiah(total);
}

function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) {
    alert('⚠️ Keranjang masih kosong! Tambahkan buku terlebih dahulu.');
    return;
  }
  // Cek apakah sudah login
  const userData = sessionStorage.getItem('userLogin');
  if (!userData) {
    const mau = confirm('⚠️ Kamu belum login!\nHarus login dulu untuk checkout.\n\nMau login sekarang?');
    if (mau) window.location.href = 'login/index.html';
    return;
  }

  const user = JSON.parse(userData);
  const total = cart.reduce((sum, i) => sum + (i.harga * i.qty), 0);
  const daftarBuku = cart.map(i => `• ${i.nama} (x${i.qty}) — ${formatRupiah(i.harga * i.qty)}`).join('\n');

  alert(`🎉 Pesanan Berhasil!\n\nHalo ${user.username},\n\nKamu telah memesan:\n${daftarBuku}\n\nTotal: ${formatRupiah(total)}\n\nTerima kasih sudah berbelanja! 📚`);
  cart = [];
  sessionStorage.removeItem('cart');
  updateCartUI();
  document.getElementById('cartPanel').classList.remove('open');
}

/* ===== BELI PROMO ===== */
function beliPromo(nama, harga) {
  const userData = sessionStorage.getItem('userLogin');
  if (!userData) {
    const mau = confirm(`⚠️ Kamu belum login!\nLogin dulu untuk membeli "${nama}"?\n\nMau login sekarang?`);
    if (mau) window.location.href = 'login/index.html';
    return;
  }
  const user = JSON.parse(userData);
  alert(`✅ Promo "${nama}" berhasil dipesan!\nSenilai ${formatRupiah(harga)}\n\nTerima kasih, ${user.username}! 🎁`);
}

/* ===== HELPER ===== */
function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

/* ===== ANIMATE ON SCROLL (simple) ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.style.opacity = '1';
  });
}, { threshold: 0.1 });

document.querySelectorAll('.buku-card, .promo-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity .5s ease';
  observer.observe(el);
});
