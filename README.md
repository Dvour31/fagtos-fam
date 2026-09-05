# Fagtos Fam — Web Profil Komunitas

## Cara buka
Cukup dobel-klik `index.html`, langsung jalan di browser — tidak perlu install apa-apa dan tidak perlu server lokal. React, GSAP, dan font dimuat lewat CDN; semua komponen ditulis pakai `React.createElement` biasa (bukan JSX) supaya bisa dimuat langsung lewat `file://` tanpa Babel.

## Struktur file
```
fagtos-fam/
├── index.html              → entry point, memuat semua file lain
├── styles.css               → semua styling
├── data.js                  → SEMUA KONTEN ada di sini (anggota, foto, video, playlist, logo)
├── app.js                   → penyatu komponen + state pemutar musik
├── components/
│   ├── Doodles.js            → elemen dekorasi (tack, tape, star, arrow)
│   ├── Header.js             → header + logo
│   ├── Hero.js                → judul besar
│   ├── Tentang.js             → segmen "Cerita Fagtos"
│   ├── Roster.js              → segmen "Anggota" (nama, sebutan, quote)
│   ├── Galeri.js              → segmen "Galeri" (foto + video)
│   ├── Backsound.js           → playlist section + mini player mengambang
│   └── Kontak.js              → segmen kontak
└── assets/
    ├── logo.png              → taruh logo asli kamu di sini
    ├── photos/                → (opsional, kalau mau pakai foto lokal)
    ├── videos/                → taruh file .mp4 di sini
    └── audio/                 → taruh file .mp3 di sini
```

## Yang perlu kamu ganti (semua di `data.js`)
1. **Anggota** — ganti `name`, `role`, `quote`, dan `photo` sesuai anak-anak aslinya. Taruh file foto di `assets/photos/anggota/` lalu arahkan `photo` ke situ (kalau file gagal dimuat, otomatis fallback ke avatar inisial, jadi aman).
2. **Foto** — ganti `src` ke path foto asli (bisa taruh di `assets/photos/`).
3. **Video** — taruh file `.mp4` di `assets/videos/`, sesuaikan nama file di `src`.
4. **Playlist** — taruh file `.mp3` di `assets/audio/`, tambah/hapus lagu bebas di array `playlist`. Player otomatis menyesuaikan.
5. **Logo** — taruh file gambar di `assets/logo.png`. Kalau file belum ada, header otomatis pakai badge "FF" bawaan.

Ganti link WhatsApp/Instagram/Discord langsung di `components/Kontak.js` (cari `href="#"`).
