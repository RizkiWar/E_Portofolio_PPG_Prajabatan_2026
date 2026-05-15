# 📚 E-Portfolio PPG Prajabatan 2026

> Website E-Portfolio untuk memenuhi persyaratan **Program Pendidikan Profesi Guru (PPG) Prajabatan 2026**.

---

## 🌐 Live Demo

🔗 [Lihat E-Portfolio](https://fannyf123.github.io/E_Portofolio_PPG_Prajabatan_2026)

---

## 📋 Komponen E-Portfolio

Website ini dirancang sesuai Rubrik E-Portfolio PPG Prajabatan, mencakup:

| No | Komponen | Deskripsi |
|----|----------|-----------|
| 1 | **Profil Mahasiswa** | Narasi asal daerah, inspirasi menjadi guru, tujuan profesional |
| 2 | **Artefak Produk** | RPP (3 siklus), Modul Ajar, Media Pembelajaran, LKM, Penilaian GP & DPL |
| 3 | **Analisis Artefak** | Konteks, tujuan, kelebihan, kekurangan, kajian teori |
| 4 | **Lampiran Penilaian** | Lampiran 7 & 8 — Instrumen Penilaian Penyusunan Perangkat & Praktik Mengajar |
| 5 | **Model Guru yang Dituju** | Visi & misi, kompetensi, karakter guru profesional |
| 6 | **E-Portfolio 2** | Refleksi Akhir PPL Terbimbing & Filosofi Mengajar |

---

## 🗂️ Struktur File

```
E-Portofolio_PPG_Prajabatan_2026/
├── index.html          # Halaman utama
├── css/
│   ├── index.css       # CSS entry point (imports all)
│   ├── style.css       # Design tokens & base styles
│   ├── base.css        # Reset & typography
│   ├── nav.css         # Navigation
│   ├── profil.css      # Profil section
│   ├── pendidikan.css  # Pendidikan section
│   ├── artefak.css     # Portfolio/artefak section
│   ├── skills.css      # Keahlian section
│   ├── model-guru.css  # Model guru section
│   ├── kontak.css      # Kontak section
│   ├── galeri.css      # Galeri section
│   ├── parallax.css    # Intro tear & parallax
│   ├── enhancements.css
│   ├── smoothness.css
│   ├── eportfolio2.css # E-Portfolio 2 styles
│   ├── dark-mode.css   # Dark mode overrides
│   └── responsive.css  # Responsive breakpoints
├── js/
│   ├── main.js         # Entry point (imports all modules)
│   ├── particles.js    # Canvas particle animation
│   ├── scroll-experience.js
│   ├── section-transitions.js
│   ├── artefak.js
│   ├── profil-animation.js
│   ├── pendidikan-animation.js
│   ├── artefak-animation.js
│   ├── model-guru-animation.js
│   ├── keahlian-animation.js
│   ├── galeri-animation.js
│   ├── kontak-animation.js
│   ├── footer-animation.js
│   ├── portfolio-chooser.js
│   └── sertifikat-modal.js
├── vendor/
│   ├── gsap.min.js
│   └── ScrollTrigger.min.js
├── assets/
│   ├── img/            # Gambar dan media
│   └── pdf/            # Dokumen PDF
├── dist/               # Production build output
├── vite.config.js      # Vite configuration
├── package.json
└── README.md
```

---

## 🧭 Navigasi Website

```
Beranda | Profil | Pendidikan | Artefak | Penilaian | Model Guru | Galeri | Keahlian | Sertifikat | Kontak
```

---

## ✨ Fitur Website

- 🎨 **Desain Modern** — Tampilan profesional dengan animasi partikel interaktif
- 🌙 **Dark / Light Mode** — Toggle tema gelap dan terang
- 📱 **Responsif** — Optimal di desktop, tablet, dan mobile
- 🔍 **Filter Artefak** — Saring artefak berdasarkan kategori (RPP, Modul, Media, Asesmen, dll)
- 📋 **Modal Analisis** — Popup detail analisis setiap artefak
- 📊 **Tabel Penilaian** — Lampiran 7 & 8 per siklus dari Guru Pamong & DPL
- 🏅 **Sertifikat** — Preview sertifikat dengan modal popup
- 📸 **Galeri** — Dokumentasi kegiatan dengan lightbox
- 🗺️ **Perjalanan Hidup** — Timeline visual perjalanan akademik

---

## 🛠️ Teknologi

- **HTML5** — Struktur semantik
- **CSS3** — Custom properties, animations, glassmorphism
- **Vanilla JavaScript (ES Modules)** — Interaktivitas tanpa framework
- **GSAP + ScrollTrigger** — Scroll-based animations
- **Vite** — Build tool & dev server
- **GitHub Actions** — CI/CD deploy ke GitHub Pages
- **Google Fonts** — Inter, Outfit, Plus Jakarta Sans
- **Font Awesome 6** — Icon system
- **Canvas API** — Particle animation

---

## 📌 Cara Penggunaan

1. Clone repository ini
2. `npm install`
3. `npm run dev` — Development server (http://127.0.0.1:5173/)
4. `npm run build` — Production build ke folder `dist/`
5. `npm run preview` — Preview production build

---

## 🚀 Deployment

Deploy otomatis ke GitHub Pages via GitHub Actions setiap push ke branch `main`. Workflow menjalankan `npm run build` dan deploy folder `dist/`.

---

## 👩‍🏫 Tentang

**Program:** PPG Prajabatan 2026
**Bidang Studi:** Teknik Pemesinan
**Institusi:** Universitas Sarjanawiyata Tamansiswa (UST)
**Mahasiswa:** Fanny Fatchurrahman

---

*Dibuat dengan ❤️ untuk PPG Prajabatan 2026*
