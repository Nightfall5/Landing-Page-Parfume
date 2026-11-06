# LUXU — Premium Perfume Landing Page

> **Deployment:** the GitHub Actions build and publish workflow is configured. Enable GitHub Pages for this repository with **Settings → Pages → Source: GitHub Actions** to activate the live URL.  
> [Open Pages settings](https://github.com/Nightfall5/Landing-Page-Parfume/settings/pages) · [Source code](https://github.com/Nightfall5/Landing-Page-Parfume)

LUXU adalah proyek website landing page bertema parfum premium. Proyek ini berfokus pada penyajian identitas visual brand, katalog produk, dan interaksi antarmuka menggunakan teknologi frontend.

## Fitur antarmuka

- Navigasi ke bagian Home, Koleksi, Testimoni, Tentang, dan Kontak.
- Hero section untuk memperkenalkan konsep brand.
- Kartu produk dengan informasi koleksi, deskripsi, ukuran, dan harga contoh.
- Filter koleksi berdasarkan kategori Masculine, Feminine, dan Unisex.
- Tombol interaksi pada kartu produk untuk melihat detail dan wishlist.
- Layout responsif untuk ukuran layar desktop dan mobile.
- Animasi serta micro-interaction untuk memperkuat pengalaman visual.

## Teknologi

- **HTML5** — struktur halaman.
- **CSS3** — styling utama, komponen, dan responsive layout.
- **JavaScript (Vanilla)** — interaksi dan animasi.
- **Live Server** — development server lokal.

## Menjalankan proyek

Pastikan Node.js dan npm telah terpasang.

```bash
git clone https://github.com/Nightfall5/Landing-Page-Parfume.git
cd Landing-Page-Parfume
npm install
npm run dev
```

Development server berjalan pada:

```text
http://localhost:3000
```

Alternatifnya, halaman dapat dibuka langsung melalui file `index.html`, tetapi penggunaan local server lebih disarankan untuk pengujian.

## Struktur proyek

```text
.
├── index.html
├── images/              # Aset gambar
├── scripts/
│   ├── main.js          # Interaksi utama
│   └── animations.js    # Animasi antarmuka
├── styles/
│   ├── main.css         # Styling utama
│   ├── components.css   # Styling komponen
│   └── responsive.css   # Penyesuaian layar
├── package.json
└── README.md
```

## Catatan

LUXU pada repository ini merupakan **konsep/demo frontend**, bukan bukti bahwa sebuah bisnis parfum telah beroperasi. Nama produk, harga, rating, testimoni, dan materi promosi yang tampil merupakan konten contoh untuk kebutuhan demonstrasi antarmuka. Website ini tidak dengan sendirinya menyediakan backend transaksi, pembayaran, atau pemrosesan pesanan nyata.
