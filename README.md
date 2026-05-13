<div align="center">

<img src="https://img.shields.io/badge/NG.LEARN-Study%20Should%20Be%20Fun!-0ea5e9?style=for-the-badge&logo=graduation-cap&logoColor=white" alt="NG.LEARN" height="40"/>

# 🎓 NG.LEARN

**Platform Les Privat Modern — Study Should Be Fun!**

Website profesional untuk bimbingan belajar privat SD hingga SMA yang dilengkapi dengan sistem manajemen konten admin dan monitoring real-time.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Run-4285F4?style=flat-square&logo=google-cloud&logoColor=white)](https://cloud.google.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](https://ng-learn-952620701939.asia-southeast2.run.app) · [🐛 Report Bug](https://github.com/consep33t/ng-learn/issues) · [💡 Request Feature](https://github.com/consep33t/ng-learn/issues)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#️-arsitektur-sistem)
- [Struktur Proyek](#-struktur-proyek)
- [Memulai (Development)](#-memulai-development)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Admin Panel](#️-admin-panel)
- [Deployment ke Google Cloud](#-deployment-ke-google-cloud)
- [Monitoring & Alerting](#-monitoring--alerting)

---

## 🎯 Tentang Proyek

**NG.LEARN** adalah platform web bimbingan belajar privat yang dibangun dengan teknologi modern. Platform ini memungkinkan calon siswa untuk mengetahui program les yang tersedia, melihat testimoni, dan mengirimkan pertanyaan — sementara admin dapat mengelola seluruh konten website secara real-time melalui panel admin yang terintegrasi penuh dengan database.

### 🌟 Highlights

- **Full-Stack Next.js 16** dengan App Router dan Server Components
- **Admin Panel** lengkap untuk mengelola semua konten website
- **Google Cloud Storage** untuk penyimpanan gambar yang andal
- **Real-time Monitoring** dengan notifikasi Discord otomatis
- **Production-ready** — deployed di Google Cloud Run

---

## ✨ Fitur Utama

### 🖥️ Halaman Publik
| Fitur | Deskripsi |
|-------|-----------|
| 🚀 **Hero Banner** | Slider banner dinamis yang dikelola dari admin |
| 📚 **Program Les** | Daftar program dengan harga, level, dan durasi |
| ⭐ **Testimoni** | Ulasan siswa dengan rating bintang |
| 🖼️ **Galeri Foto** | Grid foto kegiatan dengan filter kategori & lightbox |
| ❓ **FAQ** | Pertanyaan umum yang dapat dikelola admin |
| 📬 **Form Kontak** | Formulir yang tersimpan ke database & balas via WhatsApp |

### 🛡️ Admin Panel
| Fitur | Deskripsi |
|-------|-----------|
| 🔐 **Autentikasi** | Login aman dengan Auth.js v5 & JWT session |
| 📊 **Dashboard** | Statistik konten dan pesan terbaru |
| ⚙️ **Pengaturan** | Kelola nama, tagline, kontak, dan teks website |
| 🚀 **Hero Banner** | CRUD slide banner dengan upload gambar |
| 📚 **Program Les** | CRUD lengkap dengan toggle aktif/nonaktif |
| 🖼️ **Galeri** | Upload foto ke Google Cloud Storage |
| 💬 **Testimoni** | Kelola ulasan dan rating siswa |
| ❓ **FAQ** | Kelola pertanyaan & jawaban |
| ✉️ **Pesan** | Inbox pesan dari form kontak + balas via WhatsApp |
| 👤 **Admin** | Manajemen akun admin multi-user |

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│  Next.js 16 + React 19 + TypeScript 5                   │
│  Tailwind CSS 4 + daisyUI 5 + Framer Motion             │
├─────────────────────────────────────────────────────────┤
│                     BACKEND                             │
│  Next.js API Routes (Route Handlers)                    │
│  Auth.js v5 (NextAuth) — JWT Strategy                   │
│  PostgreSQL 16 + pg driver                              │
├─────────────────────────────────────────────────────────┤
│                  INFRASTRUKTUR                          │
│  Google Cloud Run — Hosting (Docker-based)              │
│  Google Cloud Storage — Penyimpanan Gambar              │
│  Google Cloud Build — CI/CD Pipeline                    │
│  Google Cloud Monitoring — Alert & Logging              │
│  Cloud Functions + Pub/Sub — Discord Notifikasi         │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Arsitektur Sistem

```
                        ┌─────────────────┐
                        │    GitHub Repo   │
                        └────────┬────────┘
                                 │ Push ke main
                                 ▼
                        ┌─────────────────┐
                        │  Cloud Build    │◄── cloudbuild.yaml
                        │  (CI/CD)        │
                        └────────┬────────┘
                                 │ Build & Push Docker Image
                                 ▼
              ┌──────────────────────────────────────┐
              │            Cloud Run                 │
              │         (ng-learn service)           │
              │                                      │
              │   ┌──────────┐   ┌───────────────┐  │
              │   │ Next.js  │   │  Admin Panel  │  │
              │   │  App     │   │   (CRUD)      │  │
              │   └────┬─────┘   └──────┬────────┘  │
              └────────┼───────────────┼────────────┘
                       │               │
              ┌────────▼───┐    ┌──────▼──────────┐
              │ PostgreSQL │    │  GCS Bucket     │
              │ (Database) │    │ (ng-learn-bucket│
              └────────────┘    └─────────────────┘

              ┌─────────────────────────────────────┐
              │          MONITORING STACK           │
              │                                     │
              │  Error 5xx → Cloud Monitoring Alert │
              │       → Pub/Sub Topic               │
              │       → Cloud Function              │
              │       → Discord Webhook 🔔          │
              └─────────────────────────────────────┘
```

---

## 📁 Struktur Proyek

```
ng-learn/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 (public)/          # Halaman publik website
│   │   │   └── page.tsx          # Homepage utama
│   │   ├── 📁 admin/             # Panel admin (protected)
│   │   │   ├── dashboard/        # Dashboard statistik
│   │   │   ├── programs/         # Kelola program les
│   │   │   ├── hero/             # Kelola hero banner
│   │   │   ├── gallery/          # Kelola galeri foto
│   │   │   ├── testimonials/     # Kelola testimoni
│   │   │   ├── faqs/             # Kelola FAQ
│   │   │   ├── messages/         # Inbox pesan
│   │   │   ├── settings/         # Pengaturan website
│   │   │   ├── admins/           # Manajemen admin
│   │   │   └── login/            # Halaman login
│   │   └── 📁 api/
│   │       ├── auth/[...nextauth] # Auth.js handler
│   │       ├── contact/          # Public: form kontak
│   │       └── admin/            # Protected: CRUD APIs
│   │           ├── programs/
│   │           ├── hero/
│   │           ├── gallery/
│   │           ├── testimonials/
│   │           ├── faqs/
│   │           ├── messages/
│   │           ├── settings/
│   │           ├── admins/
│   │           └── upload/       # Upload ke GCS
│   ├── 📁 components/
│   │   ├── 📁 home/              # Komponen halaman publik
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── StatsSection.tsx
│   │   ├── 📁 admin/
│   │   │   └── ImageUpload.tsx   # Komponen upload gambar
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── 📁 lib/
│   │   ├── db.ts                 # PostgreSQL connection pool
│   │   ├── data.ts               # Server-side data fetching
│   │   ├── gcs.ts                # Google Cloud Storage utils
│   │   └── store.ts              # Zustand global state
│   ├── 📁 __tests__/
│   │   └── api.test.ts           # Unit tests (Vitest)
│   ├── auth.ts                   # Auth.js configuration
│   └── proxy.ts                  # Middleware (route guard)
├── 📁 cloud-functions/
│   └── discord-notifier/         # Cloud Function: alert → Discord
├── 📁 database/
│   └── schema.sql                # Skema database PostgreSQL
├── Dockerfile                    # Docker image untuk Cloud Run
├── cloudbuild.yaml               # CI/CD pipeline config
├── next.config.ts                # Next.js configuration
└── vitest.config.ts              # Unit test configuration
```

---

## 🚀 Memulai (Development)

### Prasyarat

- **Node.js** v20 atau lebih baru
- **npm** v10+
- **PostgreSQL** v14+ (lokal atau cloud)
- **Google Cloud SDK** (opsional, untuk deploy)

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/consep33t/ng-learn.git
cd ng-learn

# 2. Install dependencies
npm install

# 3. Salin file environment
cp .env.local.example .env.local

# 4. Isi variabel environment (lihat bagian selanjutnya)
# Edit .env.local sesuai konfigurasi Anda

# 5. Jalankan migrasi database
psql -U postgres -d ng_learn_db -f database/schema.sql

# 6. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

**Admin Panel:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Script Tersedia

```bash
npm run dev          # Jalankan development server
npm run build        # Build production bundle
npm run start        # Jalankan production server
npm run test         # Jalankan unit tests (Vitest)
npm run test:watch   # Jalankan tests dalam watch mode
npm run lint         # Cek kualitas kode dengan ESLint
```

---

## 🔐 Environment Variables

Buat file `.env.local` di root proyek dengan konfigurasi berikut:

```env
# ── Database ──────────────────────────────────────────────
DATABASE_URL=postgresql://username:password@host:5432/ng_learn_db

# ── Auth.js (NextAuth) ────────────────────────────────────
# Untuk production: ganti dengan URL aplikasi Anda
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-super-secret-key-min-32-characters
AUTH_TRUST_HOST=true

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-min-32-characters

# ── Admin Credentials (Fallback) ──────────────────────────
ADMIN_DEFAULT_EMAIL=admin@nglearn.id
ADMIN_DEFAULT_PASSWORD=your-secure-password

# ── Google Cloud Storage ──────────────────────────────────
GCS_BUCKET_NAME=ng-learn-bucket
GCS_PROJECT_ID=your-gcp-project-id

# Isi hanya jika TIDAK menggunakan Application Default Credentials
# Kosongkan jika deploy di Cloud Run (ADC otomatis digunakan)
GCS_CLIENT_EMAIL=
GCS_PRIVATE_KEY=
```

> **⚠️ Penting:** Jangan pernah commit file `.env.local` ke Git. File ini sudah terdaftar di `.gitignore`.

---

## 📡 API Documentation

Semua endpoint admin memerlukan sesi yang valid (login terlebih dahulu).

### Public Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/contact` | Kirim pesan dari form kontak |

**Body `/api/contact`:**
```json
{
  "name": "Nama Lengkap",
  "phone": "08123456789",
  "message": "Pesan atau pertanyaan"
}
```

### Admin Endpoints (Butuh Autentikasi)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET/POST/PUT/DELETE` | `/api/admin/programs` | CRUD program les |
| `GET/POST/PUT/DELETE` | `/api/admin/hero` | CRUD hero banner |
| `GET/POST/PUT/DELETE` | `/api/admin/gallery` | CRUD galeri foto |
| `GET/POST/PUT/DELETE` | `/api/admin/testimonials` | CRUD testimoni |
| `GET/POST/PUT/DELETE` | `/api/admin/faqs` | CRUD FAQ |
| `GET/PUT/DELETE` | `/api/admin/messages` | Kelola pesan masuk |
| `GET/PUT` | `/api/admin/settings` | Pengaturan website |
| `GET/POST/DELETE` | `/api/admin/admins` | Manajemen admin |
| `POST` | `/api/admin/upload` | Upload gambar ke GCS |

---

## 🛡️ Admin Panel

### Cara Login

1. Buka `/admin/login`
2. Masukkan email dan password admin
3. Sistem akan memeriksa database, lalu fallback ke env variable jika tidak ditemukan

### Fitur Panel Admin

```
📊 Dashboard     — Statistik konten, pesan terbaru, aksi cepat
⚙️ Pengaturan   — Nama site, tagline, kontak, teks hero & visi misi
🚀 Hero Banner   — Tambah/edit slide, upload gambar background
📚 Program Les   — CRUD program, atur harga & level, toggle aktif
🖼️ Galeri        — Upload & kelola foto kegiatan (GCS integrated)
💬 Testimoni    — Tambah/edit ulasan siswa dengan rating bintang
❓ FAQ           — Kelola pertanyaan yang sering ditanyakan
✉️ Pesan Masuk  — Inbox form kontak, tandai sudah dibaca, balas WhatsApp
👤 Admin         — Tambah/hapus akun admin (superadmin only)
```

---

## ☁️ Deployment ke Google Cloud

### Prasyarat

- Google Cloud Project aktif dengan billing enabled
- `gcloud` CLI terinstal dan sudah login
- Docker terinstal (untuk build lokal)

### Langkah Deploy

```bash
# 1. Set project
gcloud config set project YOUR_PROJECT_ID

# 2. Aktifkan APIs yang diperlukan
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  storage.googleapis.com

# 3. Push ke GitHub — Cloud Build akan otomatis build & deploy
git push origin main
```

### Environment Variables di Cloud Run

Set via Google Cloud Console → Cloud Run → Edit Revision → Variables, atau via CLI:

```bash
gcloud run services update ng-learn \
  --region=asia-southeast2 \
  --update-env-vars \
  DATABASE_URL="postgresql://...",\
  AUTH_SECRET="...",\
  AUTH_TRUST_HOST="true",\
  GCS_BUCKET_NAME="ng-learn-bucket",\
  GCS_PROJECT_ID="your-project-id"
```

---

## 🔔 Monitoring & Alerting

Sistem monitoring otomatis yang mengirim notifikasi ke Discord jika terjadi error di production.

### Arsitektur Monitoring

```
Cloud Run Error (5xx)
      ↓
Cloud Monitoring Alert Policy
      ↓
Pub/Sub Topic: ng-learn-alerts
      ↓
Cloud Function: discord-notifier
      ↓
Discord Channel 🔔
```

### Setup (Sudah Terkonfigurasi)

| Komponen | Detail |
|----------|--------|
| **Alert Policy** | Monitor error 5xx > 3 per menit |
| **Pub/Sub Topic** | `projects/juara-495806/topics/ng-learn-alerts` |
| **Cloud Function** | `discord-notifier` di `asia-southeast2` |
| **Runtime** | Node.js 22 |

### Test Notifikasi Manual

```bash
gcloud pubsub topics publish ng-learn-alerts \
  --message='{"incident":{"state":"open","summary":"Test alert!","resource":{"labels":{"service_name":"ng-learn"}}}}'
```

---

## 🧪 Testing

```bash
# Jalankan semua unit tests
npm test

# Jalankan dalam watch mode (development)
npm run test:watch
```

### Coverage Unit Test

```
✓ Admin Settings API — 4 tests
✓ Admin Programs API — 5 tests
✓ Contact API        — 2 tests
✓ Admin Gallery API  — 2 tests
```

---

## 🗄️ Skema Database

```sql
-- Tabel utama yang digunakan aplikasi
site_settings      -- Pengaturan konten website
hero_slides        -- Slide hero banner
programs           -- Program les yang ditawarkan
testimonials       -- Ulasan dari siswa
faqs               -- Pertanyaan & jawaban
gallery            -- Foto-foto kegiatan
contact_messages   -- Pesan dari form kontak
admin_users        -- Akun administrator
```

Lihat skema lengkap di [`database/schema.sql`](database/schema.sql).

---

## 🤝 Kontribusi

1. Fork repositori ini
2. Buat branch fitur: `git checkout -b feat/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feat/nama-fitur`
5. Buat Pull Request

### Konvensi Commit

```
feat:     Fitur baru
fix:      Perbaikan bug
docs:     Perubahan dokumentasi
style:    Perubahan formatting/style
refactor: Refactoring kode
test:     Penambahan/perubahan test
chore:    Perubahan konfigurasi/build
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">

**Dibuat dengan ❤️ untuk NG.LEARN**

[![Next.js](https://img.shields.io/badge/Powered_by-Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Google Cloud](https://img.shields.io/badge/Hosted_on-Google_Cloud_Run-4285F4?style=flat-square&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)

*Study Should Be Fun! 🎉*

</div>
