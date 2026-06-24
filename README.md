# Eirworks Animation Studio — Website Resmi & Dashboard Admin

Website profil bisnis dan portofolio profesional untuk **Eirworks Animation Studio** (Jasa Animasi 2D & 3D Profesional). Website ini dilengkapi dengan halaman Dashboard Admin yang dinamis dan terintegrasi ke penyimpanan cloud untuk pengelolaan konten secara real-time.

URL Website Live: **[https://eirworks-animation-studio.vercel.app](https://eirworks-animation-studio.vercel.app)**

---

## 🚀 Fitur Utama & Antarmuka

### Halaman Publik (Frontend Klien)
*   **Hero Section**: Tampilan pembuka yang dinamis dengan visual premium, tagline studio, dan tombol CTA (Call to Action) cepat.
*   **Layanan (Services)**: Penjelasan paket layanan animasi 2D, animasi 3D, Motion Graphics, dan Explainer Video lengkap dengan estimasi harga dan waktu pengerjaan.
*   **Proyek Portofolio**: Galeri karya animasi studio yang interaktif dengan kategori filter, detail klien, tahun rilis, dan durasi pengerjaan.
*   **Testimonial**: Menampilkan ulasan bintang 5 dan feedback dari mitra kerja/klien Eirworks.
*   **Formulir Kontak**: Formulir terintegrasi untuk berkonsultasi, memilih layanan, dan estimasi budget. Pesan akan disimpan di database dan secara otomatis diteruskan langsung ke WhatsApp admin Eirworks.
*   **Tema Terang & Gelap (Light & Dark Theme)**: Penyesuaian skema warna otomatis dan manual yang sangat smooth di seluruh halaman.

### Panel Dashboard Admin (Manajemen Konten)
*   **Dashboard Statistik**: Grafik kunjungan perangkat pengunjung (Desktop vs Mobile) serta total proyek, layanan, testimoni, dan pesan klien secara visual.
*   **Kelola Proyek**: Tambah, edit, dan hapus portofolio animasi, lengkap dengan upload gambar secara langsung.
*   **Kelola Layanan**: Modifikasi status aktif, fitur, harga, dan durasi paket animasi.
*   **Kelola Testimonial**: Tambah dan kelola review/feedback ulasan bintang klien.
*   **Pesan Klien (Inbox)**: Daftar kotak masuk pesan yang dikirim oleh pengunjung melalui form kontak. Admin dapat membaca detail pesan, budget yang diajukan, menandai sebagai terbaca, menghapus pesan, serta membalas langsung via email klien.
*   **Pengaturan (Settings)**: Tempat mengkonfigurasi nama studio, tagline, deskripsi hero, info email/telepon/lokasi, ganti password admin, hingga konfigurasi Google Firebase.

---

## 🔑 Panduan Akses Dashboard Admin

Untuk mengelola konten website, Anda dapat masuk ke panel admin dengan langkah berikut:

1.  **Akses URL Admin**:
    Tambahkan tag hash `#admin` di akhir alamat URL website Anda.
    *   **Lokal (Development)**: [http://localhost:5173/#admin](http://localhost:5173/#admin)
    *   **Produksi (Live)**: [https://eirworks-animation-studio.vercel.app/#admin](https://eirworks-animation-studio.vercel.app/#admin)
2.  **Masukkan Password Admin**:
    *   Password Bawaan (Default): `eirworksanimation2026`
3.  **Petunjuk (Hint) Password di Halaman Login**:
    *   Di halaman **Pengaturan** (Settings) admin, terdapat checkbox untuk mengaktifkan/menonaktifkan tombol petunjuk password di halaman login.
    *   Jika **diaktifkan**, tombol mata (*eye toggle*) akan muncul di halaman login sehingga pengunjung/klien demo dapat melihat petunjuk password aktif.
    *   Jika **dinonaktifkan**, petunjuk password akan disembunyikan sepenuhnya untuk alasan keamanan hosting produksi Anda.

---

## ☁️ Integrasi Google Firebase Cloud (Database & Storage)

Website ini mendukung integrasi cloud database agar data tidak hilang ketika website di-hosting. Data teks (proyek, layanan, testimonial, pesan klien) akan disimpan di **Google Cloud Firestore**, dan gambar di **Firebase Storage**.

### Cara Menghubungkannya (Hanya 1 Menit):
1.  Buka [Firebase Console](https://console.firebase.google.com/) menggunakan akun Gmail Anda dan buat project baru.
2.  Tambahkan aplikasi **Web (`</>`)** di dashboard project Firebase untuk mendapatkan SDK Configuration.
3.  Buka menu **Pengaturan** di Dashboard Admin Eirworks Anda.
4.  Tempelkan JSON config Firebase Anda di bagian **Google Firebase Cloud Integration**, lalu klik **Simpan & Inisialisasi Firebase**.
5.  Klik tombol **Migrasikan Data ke Cloud** untuk memindahkan semua data lokal saat ini langsung ke database cloud Anda.

*(Catatan: Jika konfigurasi Firebase dikosongkan, website secara otomatis akan menggunakan penyimpanan lokal browser/LocalStorage sebagai cadangan).*

---

## 💻 Panduan Pengembangan Lokal

Jika Anda ingin menjalankan atau mengembangkan website ini di komputer Anda sendiri:

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 18 ke atas disarankan) di komputer Anda.

### 2. Instalasi Dependensi
Buka folder proyek ini di terminal, kemudian jalankan perintah:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Lokal)
Jalankan server lokal dengan perintah:
```bash
npm run dev
```
Buka browser Anda dan akses alamat [http://localhost:5173](http://localhost:5173).

### 4. Build untuk Produksi
Untuk mengompilasi proyek menjadi file statis yang siap di-hosting:
```bash
npm run build
```
Hasil kompilasi akan berada di dalam folder `dist/` yang siap diunggah ke platform hosting seperti Vercel, Netlify, cPanel, atau VPS Anda.
