-- NG.LEARN Database Schema
-- Create database: ng_learn_db

-- Admin Users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Site Settings table (CMS content)
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  label VARCHAR(200),
  type VARCHAR(50) DEFAULT 'text',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50) DEFAULT 'primary',
  level VARCHAR(50),
  price INTEGER DEFAULT 0,
  duration VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  student_grade VARCHAR(100),
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  image_url TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'umum',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hero slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  cta_text VARCHAR(100) DEFAULT 'Daftar Sekarang',
  cta_link VARCHAR(200) DEFAULT '#contact',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed initial site settings
INSERT INTO site_settings (key, value, label, type) VALUES
  ('site_name', 'NG.LEARN', 'Nama Website', 'text'),
  ('site_tagline', 'Study Should Be Fun! 🎉', 'Tagline', 'text'),
  ('site_description', 'Les privat terbaik untuk anak SD hingga SMA. Belajar jadi menyenangkan bersama tutor berpengalaman!', 'Deskripsi Website', 'textarea'),
  ('contact_whatsapp', '6281234567890', 'WhatsApp', 'text'),
  ('contact_email', 'info@nglearn.id', 'Email', 'text'),
  ('contact_address', 'Jl. Pendidikan No. 1, Kota Cerdas', 'Alamat', 'textarea'),
  ('contact_instagram', '@nglearn.id', 'Instagram', 'text'),
  ('about_vision', 'Menjadi platform les privat terdepan yang membuat belajar menjadi pengalaman menyenangkan bagi setiap anak Indonesia.', 'Visi', 'textarea'),
  ('about_mission', 'Memberikan pendidikan berkualitas tinggi dengan metode kreatif dan inovatif yang disesuaikan dengan kebutuhan setiap siswa.', 'Misi', 'textarea'),
  ('hero_title', 'Belajar Itu Seru! 🚀', 'Hero Title', 'text'),
  ('hero_subtitle', 'Les privat terbaik untuk SD sampai SMA. Raih prestasi terbaikmu bersama NG.LEARN!', 'Hero Subtitle', 'textarea')
ON CONFLICT (key) DO NOTHING;

-- Seed programs
INSERT INTO programs (title, description, icon, color, level, price, duration, sort_order) VALUES
  ('Matematika', 'Belajar matematika dengan cara yang menyenangkan! Dari penjumlahan hingga kalkulus.', '🔢', 'primary', 'SD - SMA', 150000, '90 menit/sesi', 1),
  ('Bahasa Inggris', 'Speaking, listening, reading & writing. Siap TOEFL dan percakapan sehari-hari!', '🗣️', 'secondary', 'SD - SMA', 150000, '90 menit/sesi', 2),
  ('IPA Sains', 'Fisika, Kimia, Biologi jadi mudah dipahami dengan eksperimen virtual yang seru!', '🔬', 'accent', 'SMP - SMA', 160000, '90 menit/sesi', 3),
  ('Coding & Teknologi', 'Belajar programming dari dasar. Scratch, Python, dan web development!', '💻', 'warning', 'SD - SMA', 175000, '90 menit/sesi', 4),
  ('Bahasa Indonesia', 'Menulis, membaca, dan berbicara dengan baik dan benar. Siap ujian nasional!', '📚', 'error', 'SD - SMA', 140000, '90 menit/sesi', 5),
  ('Persiapan UN/UTBK', 'Program intensif persiapan ujian nasional dan UTBK. Strategi belajar yang tepat!', '🎯', 'info', 'SMA', 200000, '120 menit/sesi', 6)
ON CONFLICT DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (student_name, student_grade, content, rating) VALUES
  ('Budi Santoso', 'Kelas 9 SMP', 'Nilai matematika aku naik dari 60 ke 95 setelah les di NG.LEARN! Tutornya sabar banget ngajarin.', 5),
  ('Siti Rahayu', 'Kelas 6 SD', 'Aku jadi suka belajar Bahasa Inggris karena cara ngajarnya seru dan tidak membosankan!', 5),
  ('Ahmad Fauzi', 'Kelas 12 SMA', 'Berkat NG.LEARN, aku berhasil masuk universitas impian. Terima kasih tutornya!', 5),
  ('Dina Permata', 'Kelas 8 SMP', 'IPA jadi mudah dipahami. Tutornya kreatif banget bikin belajar terasa seperti main!', 5)
ON CONFLICT DO NOTHING;

-- Seed FAQs
INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Berapa biaya les per sesinya?', 'Biaya les berkisar antara Rp 140.000 - Rp 200.000 per sesi tergantung mata pelajaran. Hubungi kami untuk paket spesial!', 1),
  ('Apakah bisa les online?', 'Ya! Kami menyediakan les online via Zoom/Google Meet maupun les offline di rumah siswa.', 2),
  ('Berapa lama durasi satu sesi les?', 'Satu sesi les berlangsung selama 90-120 menit tergantung program yang dipilih.', 3),
  ('Bagaimana kualifikasi tutor NG.LEARN?', 'Semua tutor kami adalah mahasiswa/lulusan dari universitas terkemuka dengan track record mengajar yang baik.', 4),
  ('Apakah ada garansi nilai naik?', 'Kami berkomitmen untuk membantu siswa meningkatkan prestasinya. Jika dalam 3 bulan tidak ada peningkatan, kami akan evaluasi metode mengajar secara gratis.', 5)
ON CONFLICT DO NOTHING;

-- Seed admin user (password: nglearn@admin2024)
INSERT INTO admin_users (name, email, password, role) VALUES
  ('Admin NG.LEARN', 'admin@nglearn.id', '$2b$10$rJ7VWL9y8M3KPqT9Nk5OGuqKJh6yZ4fX7wN8mC9lA0bD2eH3kI1qS', 'superadmin')
ON CONFLICT DO NOTHING;
