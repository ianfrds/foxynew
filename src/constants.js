export const COLORS = {
  primary: '#E63946',
  primaryDark: '#C1121F',
  white: '#FFFFFF',
  bgLight: '#F8F9FA',
}

export const PRODUCTS = [
  {
    id: 'polaroid-2x3',
    name: 'Polaroid 2×3',
    category: 'Polaroid',
    description: 'Ukuran klasik 2×3 inci, cocok untuk photocard dan koleksi.',
    price: 5000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98z-lys6yta9szc8a6@resize_w900_nl.webp',
    specs: ['Kertas glossy 260 gsm', 'Warna vibrant', 'Sudut tumpul aman'],
  },
  {
    id: 'polaroid-3x4',
    name: 'Polaroid 3×4',
    category: 'Polaroid',
    description: 'Versi jumbo dengan detail lebih besar dan tetap stylish.',
    price: 8000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98s-lybuofkngkbidd.webp',
    specs: ['Kertas glossy 260 gsm', 'Ukuran jumbo', 'Warna vibrant'],
  },
  {
    id: 'polaroid-square',
    name: 'Polaroid Square',
    category: 'Polaroid',
    description: 'Bingkai persegi 1:1 — estetik untuk feed Instagram.',
    price: 6000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98o-lybuofkdgz5441.webp',
    specs: ['Kertas glossy 260 gsm', 'Rasio 1:1', 'Bingkai putih klasik'],
  },
  {
    id: 'polaroid-gift',
    name: 'Polaroid Gift Set',
    category: 'Polaroid',
    description: 'Paket 3 polaroid 2×3 dalam satu bingkai hadiah.',
    price: 12000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98y-lybuofke3g0r5d.webp',
    specs: ['3 pcs polaroid 2×3', 'Bingkai hadiah', 'Kertas glossy 260 gsm'],
  },
  {
    id: 'poster-a4',
    name: 'Poster A4',
    category: 'Poster',
    description: 'Ukuran A4 (21×29,7 cm) — pas untuk dekorasi meja belajar.',
    price: 15000,
    image: 'https://down-id.img.susercontent.com/file/ba7d51d0ec628525f3a05d3964b5ba79.webp',
    specs: ['Kertas doff 210 gsm', 'Resolusi 1200 dpi', 'Anti-pudar'],
  },
  {
    id: 'poster-a3',
    name: 'Poster A3',
    category: 'Poster',
    description: 'Ukuran A3 (29,7×42 cm) — statement piece untuk kamar.',
    price: 25000,
    image: 'https://down-id.img.susercontent.com/file/783be4962d09131cff47d01ed6d620d3@resize_w900_nl.webp',
    specs: ['Kertas doff 210 gsm', 'Resolusi 1200 dpi', 'Anti-pudar'],
  },
  {
    id: 'poster-a2',
    name: 'Poster A2',
    category: 'Poster',
    description: 'Ukuran besar A2 (42×59,4 cm) — siap jadi pusat perhatian.',
    price: 40000,
    image: 'https://down-id.img.susercontent.com/file/4bcb6f1b8b77b881588a54d85e52a676@resize_w900_nl.webp',
    specs: ['Kertas doff 210 gsm', 'Ukuran premium', 'Pengemasan anti-tekuk'],
  },
  {
    id: 'mini-poster',
    name: 'Mini Poster 10×15',
    category: 'Poster',
    description: 'Ukuran mungil 10×15 cm, cocok untuk foto polaroid-style.',
    price: 8000,
    image: 'https://down-id.img.susercontent.com/file/id-11134207-8224o-mfvrz5xbmayza2@resize_w900_nl.webp',
    specs: ['Kertas doff 210 gsm', 'Ukuran 10×15 cm', 'Cocok untuk banyak foto'],
  },
]

export const WORKFLOW_STEPS = [
  { step: 1, title: 'Unggah Foto', desc: 'Upload foto langsung dari HP atau komputer. Drag & drop, praktis!' },
  { step: 2, title: 'Atur Ukuran & Bingkai', desc: 'Sesuaikan ukuran, crop, dan atur posisi foto sesuai keinginan.' },
  { step: 3, title: 'Pesan & Bayar', desc: 'Masukkan alamat, pilih pembayaran, dan pesananmu akan kami proses.' },
]

export const VALUE_PROPS = [
  { title: 'Garansi Cetak Ulang', desc: 'Jika hasil cetakan cacat, kami akan cetak ulang GRATIS tanpa ribet.', icon: '🛡️' },
  { title: 'Cepat 1-2 Hari', desc: 'Proses produksi super cepat. Siap dikirim dalam 1-2 hari kerja.', icon: '⚡' },
  { title: 'Kemasan Aman', desc: 'Pengemasan anti-tekuk dengan pelindung kardus tebal.', icon: '📦' },
]

export const TESTIMONIALS = [
  { name: 'Sarah A.', rating: 5, text: 'Hasil cetakan bagus banget, warnanya sesuai sama foto asli. Recommended!', product: 'Polaroid', avatar: 'https://ui-avatars.com/api/?name=Sarah+A.&background=8B5CF6&color=fff&bold=true&size=80' },
  { name: 'Dimas P.', rating: 5, text: 'Posternya kualitas premium, cocok banget buat dekorasi kamar. Cepet sampenya!', product: 'Poster', avatar: 'https://ui-avatars.com/api/?name=Dimas+P.&background=6366F1&color=fff&bold=true&size=80' },
  { name: 'Mega W.', rating: 5, text: 'Udah order berkali-kali, ngga pernah kecewa. Pengiriman aman selalu.', product: 'Polaroid', avatar: 'https://ui-avatars.com/api/?name=Mega+W.&background=A855F7&color=fff&bold=true&size=80' },
  { name: 'Rizky H.', rating: 4, text: 'Kualitas OK banget, harga terjangkau. Bakal repeat order terus!', product: 'Poster', avatar: 'https://ui-avatars.com/api/?name=Rizky+H.&background=EC4899&color=fff&bold=true&size=80' },
  { name: 'Putri N.', rating: 5, text: 'Pertama kali cetak polaroid, hasilnya lucu dan sesuai ekspektasi. Makasih Foxy ID!', product: 'Polaroid', avatar: 'https://ui-avatars.com/api/?name=Putri+N.&background=8B5CF6&color=fff&bold=true&size=80' },
  { name: 'Bunga A.', rating: 5, text: 'Cepet banget sampenya, cuma 2 hari udah sampai. Kualitas cetak premium!', product: 'Poster', avatar: 'https://ui-avatars.com/api/?name=Bunga+A.&background=6366F1&color=fff&bold=true&size=80' },
  { name: 'Fajar R.', rating: 4, text: 'Hasil fotonya bagus, ga pecah. packaging rapi banget, aman.', product: 'Polaroid', avatar: 'https://ui-avatars.com/api/?name=Fajar+R.&background=A855F7&color=fff&bold=true&size=80' },
  { name: 'Dinda K.', rating: 5, text: 'Udah repeat order 3x, selalu puas. Warna cetakan konsisten.', product: 'Polaroid', avatar: 'https://ui-avatars.com/api/?name=Dinda+K.&background=EC4899&color=fff&bold=true&size=80' },
  { name: 'Adit S.', rating: 5, text: 'Rekomendasi buat yang mau cetak poster aesthetic. Harganya worth it!', product: 'Poster', avatar: 'https://ui-avatars.com/api/?name=Adit+S.&background=8B5CF6&color=fff&bold=true&size=80' },
]

export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', icon: '📱' },
  { id: 'gopay', name: 'GoPay', icon: '🟢' },
  { id: 'shopeepay', name: 'ShopeePay', icon: '🛒' },
  { id: 'ovo', name: 'OVO', icon: '💜' },
  { id: 'va', name: 'Virtual Account', icon: '🏦' },
]

export const NAV_LINKS = [
  { id: 'produk', label: 'Produk' },
  { id: 'cara-pesan', label: 'Cara Pesan' },
  { id: 'testimoni', label: 'Testimoni' },
]

export const SHIPPING_COST = 8000
