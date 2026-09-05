/* ============================================================
   SITE_DATA — satu-satunya tempat yang perlu kamu edit
   buat ganti isi konten (anggota, foto, video, lagu).
   Semua komponen otomatis baca dari sini.
   ============================================================ */

window.SITE_DATA = {

  // ---- ANGGOTA -------------------------------------------------
  // name    : nama panggilan
  // role    : sebutan / julukan di grup
  // quote   : kutipan / kata-kata khas dia
  // color   : warna aksen kartu (pakai salah satu var CSS di bawah)
  // photo   : path foto profil. SEKARANG diisi placeholder biar kelihatan
  //           dulu tampilannya — ganti ke file asli, contoh:
  //           "assets/photos/anggota/doni.jpg" (taruh filenya di folder itu).
  //           Kalau path yang kamu isi gagal dimuat, otomatis fallback ke
  //           avatar inisial, jadi gak akan muncul ikon gambar rusak.
  members: [
    { name: "Abib", role: "Bapa Raja", quote: "Pake hoodie biar misterius, tapi kalau liat senyum kamu langsung ketahuan kalau aku salting", color: "var(--flame)", photo: "assets/photos/anggota/abib.jpeg" },
    { name: "Regit", role: "Prementet", quote: "Jari tengahku emang buat dunia, tapi jari manisku cuma buat kamu seorang", color: "var(--cobalt)", photo: "assets/photos/anggota/regit.jpeg" },
    { name: "Muliadin", role: "El Racist", quote: "Mikirin masa depan yang cerah... yaitu masa depan sama kamu", color: "var(--moss)", photo: "assets/photos/anggota/mulidin.jpeg" },
    { name: "Afwa", role: "Beta Anak Wayari Om", quote: "Pake batik biar kelihatan rapi, tapi sebenernya hatiku berantakan kalau nggak ada kamu", color: "var(--zest)", photo: "assets/photos/anggota/afwa.jpeg" },
    { name: "Ifan", role: "Mwehehe", quote: "Sstt... Jangan bilang-bilang ya, kalau diam-diam aku lagi perhatiin kamu dari tadi", color: "var(--cobalt)", photo: "assets/photos/anggota/ifan.jpeg" },
    { name: "Rahmat", role: "Badut Friendly", quote: "Gapapa jadi badut biar bisa liat senyum kamu terus jiakhh", color: "var(--flame)", photo: "assets/photos/anggota/rahmat.jpeg" },
    { name: "Okan", role: "Si Avoidant", quote: "Aku emang suka jaga jarak, tapi bukan berarti nggak mau dekat sama kamu", color: "var(--moss)", photo: "assets/photos/anggota/okan.jpeg" },
    { name: "Denny", role: "When Yah", quote: "Lebih Suka Ngelawak, Kalo Suka Kamu Nanti Di Tolak", color: "var(--flame)", photo: "assets/photos/anggota/denny.jpeg" },
    { name: "Sarul", role: "Si Plenger", quote: "Muka boleh tengil kayak nantangin dunia, tapi giliran kamu lewat langsung planga-plongo nggak bisa mikir", color: "var(--cobalt)", photo: "assets/photos/anggota/salur.jpeg" },
  ],

  // ---- GALERI: FOTO ---------------------------------------------
  // ganti "src" dengan path foto asli, contoh: "assets/photos/1.jpg"
  photos: [
    { src: "assets/photos/1.jpeg", caption: "Sebelum Kejadian Tempe Penyet" },
    { src: "assets/photos/2.jpeg", caption: "Kembalinya Bapa Raja" },
    { src: "assets/photos/17.jpeg", caption: "Bendungan Savana" },
    { src: "assets/photos/4.jpeg", caption: "Pokoknya Pantai" },
    { src: "assets/photos/5.jpeg", caption: "Sesudah Drama TTM" },
    { src: "assets/photos/6.jpeg", caption: "Perginya Bapa Raja" },
    { src: "assets/photos/7.jpeg", caption: "Momen Orang Abis Sidang" },
    { src: "assets/photos/8.jpeg", caption: "ifan,Ana Wayari Dan Okan" },
    { src: "assets/photos/9.jpeg", caption: "Bukber Tidak Jelas Wok" },
    { src: "assets/photos/11.jpeg", caption: "Gatau apa" },
    { src: "assets/photos/12.jpeg", caption: "Nikahan Waktunya Mukbang" },
    { src: "assets/photos/13.jpeg", caption: "Nunggu 2 Jam Lebih Buat GACOANG" },
    { src: "assets/photos/14.jpeg", caption: "When Yah" },
    { src: "assets/photos/15.jpeg", caption: "HIDUP JOKOWI" },
    { src: "assets/photos/16.jpeg", caption: "El Racist Pergi" },

  ],

  // ---- GALERI: VIDEO ----------------------------------------------
  // "src" ke file video asli (mp4) di assets/videos/, "poster" gambar sampul
  videos: [
    { src: "assets/videos/haha.mp4", poster: "assets/photos/thumbnail/haha.png", caption: "when ya di notice dia :(" },
    { src: "assets/videos/samsung.mp4", poster: "assets/photos/thumbnail/samsung.png", caption: "intinya kebawa arus" },
    { src: "assets/videos/senam.mp4", poster: "assets/photos/thumbnail/senam.png", caption: "yg penting ngakak" },
    { src: "assets/videos/FOTO BLUR.mp4", poster: "assets/photos/thumbnail/FOTO BLUR.png", caption: "Ea" },
    { src: "assets/videos/TTM.mp4", poster: "assets/photos/thumbnail/TTM.png", caption: "dem bruh" },
    { src: "assets/videos/tempe.mp4", poster: "assets/photos/thumbnail/tempe.png", caption: "eh awas jatoh" },

  ],

  // ---- BACKSOUND / PLAYLIST -----------------------------------------
  // tambah / hapus / ganti urutan lagu bebas di sini,
  // player akan otomatis menyesuaikan tanpa ubah kode lain.
  // "src" ke file mp3 asli di assets/audio/
  playlist: [
    { title: "Shape of My Heart", artist: "Fagtos Fam", src: "assets/audio/shape.mp3" },
    { title: "Astaga Bersyanda", artist: "Fagtos Fam", src: "assets/audio/astaga.mp3" },
    { title: "Menungso Ratoto", artist: "Fagtos Fam", src: "assets/audio/menungso.mp3" },
    { title: "Playdate", artist: "Fagtos Fam", src: "assets/audio/playdate.mp3" },
    { title: "Dia Masa Lalumu, Aku Masa Depanmu", artist: "Fagtos Fam", src: "assets/audio/dia.mp3" },
  ],

  // ---- BRAND -----------------------------------------------------
  // kalau punya file logo sendiri, taruh di assets/logo.png
  // (header otomatis pakai file itu kalau ketemu, kalau enggak pakai badge bawaan)
  logoPath: "assets/fagtos.png",
};
