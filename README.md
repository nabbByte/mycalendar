# Personal Calendar & To-Do Planner

Aplikasi **Personal Calendar & To-Do berbasis web** yang modern, clean, dan aesthetic. Aplikasi ini 100% *client-side* (tanpa backend/database online), menyimpan semua data secara persistent di **localStorage**, dan siap di-deploy langsung ke **GitHub Pages** sebagai **Progressive Web App (PWA)**.

---

## ✨ Fitur Utama

1. **Kalender Bulanan 7 Kolom**
   - Tampilan hari: Senin – Minggu (atau Minggu – Sabtu sesuai preferensi di Pengaturan).
   - Penandaan hari ini (*Today highlight*).
   - Tombol **Today** untuk langsung kembali ke hari ini.
   - Month & Year Jump Picker cepat.

2. **Status Tanggal & Hari Libur Nasional**
   - Angka tanggal & header hari ditampilkan dengan warna **Hitam / Teks Utama yang tegas & jelas** untuk semua hari (termasuk hari Minggu dan hari libur).
   - 🟢 **Hijau Segar (`#2E7D47`)**: Indikator ada kegiatan
   - 🔴 **Merah Jelas (`#DC2626`)**: Indikator Free / Libur (termasuk Hari Libur Nasional Indonesia)
   - 🟡 **Kuning/Amber (`#E5A020`)**: Indikator deadline / Important
   - ⚪ **Abu-abu**: Status normal
   - Data hari libur nasional Indonesia static bawaan (2025, 2026, 2027) tanpa perlu API online.
   - Pengguna dapat mengatur status tanggal secara manual atau meresetnya.

3. **Manajemen Kegiatan (Event Management)**
   - Tambah, Edit, dan Hapus kegiatan.
   - Kategori: 💼 Kerja, 🎓 Kuliah, 👥 Organisasi, 🏃 Personal, ⏰ Deadline, 📌 Lainnya.
   - Input jam mulai, jam selesai, tanggal, status tanggal, dan catatan opsional.
   - Preview ringkas langsung di sel kalender (+X lainnya jika lebih dari 2 kegiatan).

4. **Manajemen To-Do & Task**
   - Tambah, Edit, dan Hapus target to-do harian atau global.
   - Status task: 🔵 `To Do`, 🟡 `Process`, 🟢 `Done`.
   - Prioritas task: 🔴 `High`, 🟡 `Medium`, 🟢 `Low`.
   - Deadline waktu (jam) dan tanggal.
   - Checkbox interaktif dengan animasi coret (*strike-through*).
   - Filter to-do (Semua, To Do, Process, Done) & Pencarian real-time.

5. **Tampilan Responsif & Mobile-First**
   - **Smartphone**: Navigasi bawah (*Bottom Navigation*), modal *bottom-sheet* yang nyaman dengan satu tangan.
   - **Desktop / Tablet**: Tampilan split 2 kolom (Kalender di kiri, detail kegiatan & to-do di kanan).

6. **Pengaturan & Kustomisasi**
   - Hari pertama minggu (Senin / Minggu).
   - Toggle hari libur nasional & status warna titik.
   - Dark Mode / Tema Gelap.

7. **Cadangan Data (Backup & Restore)**
   - **Export Data**: Unduh semua kegiatan dan tugas menjadi file `calendar-backup-YYYY-MM-DD.json`.
   - **Import Data**: Pulihkan data dari file JSON backup.
   - **Hapus Semua Data**: Reset data dengan dialog konfirmasi aman.
   - **Muat Data Contoh**: Tampilkan contoh jadwal dan task awal.

8. **PWA (Progressive Web App)**
   - Mendukung **Add to Home Screen** di iOS dan Android.
   - Offline-ready melalui Service Worker.

---

## 🚀 Cara Menjalankan & Deploy ke GitHub Pages

### Opsi 1: Menjalankan Secara Lokal
Cukup buka file `index.html` langsung di browser favorit Anda (Chrome, Safari, Firefox, Edge).

### Opsi 2: Deploy ke GitHub Pages
1. Buat repositori baru di GitHub (misal: `personal-calendar`).
2. Upload semua file dalam folder ini ke branch `main`.
3. Buka **Settings** repositori di GitHub.
4. Pilih menu **Pages** di sebelah kiri.
5. Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
7. Website akan aktif dalam beberapa menit di URL:
   `https://<username>.github.io/<repository-name>/`

---

## 📁 Struktur File

```text
personal-calendar/
│
├── index.html          # Aplikasi utama (HTML, Tailwind CSS, Layout, Modals)
├── style.css           # Styling warna (Hijau Segar & Merah Libur), animasi & layout
├── app.js              # Modul logic JavaScript Vanilla
├── manifest.json       # PWA Web App Manifest
├── service-worker.js   # PWA Offline Service Worker
└── README.md           # Panduan dan dokumentasi aplikasi
```

---

## 🎨 Palet Warna UI

- **Background**: Warm White (`#FAF9F6`) / Dark Surface (`#111417`)
- **Primary Green**: Rich Forest / Fresh Leaf Green (`#2E7D47` / Dark: `#4CAF50` / Light: `#E8F5E9`)
- **Holiday & Free Red**: Bold Clear Red (`#DC2626` / `#EF4444`)
- **Accent Yellow**: Warm Amber (`#E5A020`)
- **Accent Lavender**: `#8E7DBE`
- **Font**: Plus Jakarta Sans
