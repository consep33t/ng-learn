import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - NG.LEARN",
  description: "Profil dan visi misi NG.LEARN - Les privat terbaik untuk anak SD hingga SMA",
};

const team = [
  { name: "Nanda Gunawan", role: "Founder & Head Tutor", emoji: "👨‍💼", subject: "Matematika & Fisika", exp: "5 tahun" },
  { name: "Gracia Putri", role: "Co-Founder & Tutor", emoji: "👩‍🏫", subject: "Bahasa Inggris", exp: "4 tahun" },
  { name: "Reza Firmansyah", role: "Tutor Senior", emoji: "👨‍🔬", subject: "IPA & Kimia", exp: "3 tahun" },
  { name: "Dewi Susanti", role: "Tutor Bahasa", emoji: "👩‍🎓", subject: "B. Indonesia & B. Inggris", exp: "3 tahun" },
  { name: "Bima Satria", role: "Tutor Teknologi", emoji: "👨‍💻", subject: "Coding & Robotik", exp: "2 tahun" },
  { name: "Ayu Rahmawati", role: "Koordinator Program", emoji: "👩‍💼", subject: "IPS & PKn", exp: "2 tahun" },
];

const milestones = [
  { year: "2021", title: "NG.LEARN Berdiri", desc: "Dimulai dengan 10 siswa dan 2 tutor di sebuah ruangan kecil penuh semangat." },
  { year: "2022", title: "100 Siswa Aktif", desc: "Dalam setahun, kepercayaan orang tua terus bertumbuh hingga 100 siswa aktif." },
  { year: "2023", title: "Buka Kelas Online", desc: "Meluncurkan program les online untuk menjangkau siswa di seluruh Indonesia." },
  { year: "2024", title: "500+ Siswa & 6 Program", desc: "Kini melayani lebih dari 500 siswa aktif dengan 6 program unggulan dan 30+ tutor." },
];

const values = [
  { icon: "🎉", title: "Fun Learning", desc: "Kami percaya bahwa belajar yang menyenangkan adalah belajar yang efektif. Setiap sesi dirancang penuh kreativitas." },
  { icon: "❤️", title: "Student-Centered", desc: "Setiap siswa unik. Kami menyesuaikan metode mengajar dengan gaya belajar dan kecepatan masing-masing siswa." },
  { icon: "🌟", title: "Excellence", desc: "Kami berkomitmen pada kualitas terbaik — mulai dari seleksi tutor hingga kurikulum yang terstruktur dan teruji." },
  { icon: "🤝", title: "Partnership", desc: "Kami bukan hanya tutor, tapi mitra belajar siswa dan orang tua dalam perjalanan meraih prestasi terbaik." },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-sky-50 pt-20">
      {/* Hero */}
      <section
        className="py-24 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)" }}
      >
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="badge badge-warning badge-lg mb-4 font-bold">🏫 Tentang Kami</div>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">
            Kenali <span className="text-yellow-300">NG.LEARN</span>
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed font-semibold">
            Kami bukan sekadar tempat les biasa. Kami adalah komunitas belajar yang percaya bahwa
            <span className="text-yellow-300 font-black"> setiap anak berhak</span> mendapat pendidikan terbaik yang menyenangkan!
          </p>
        </div>
        <div className="relative mt-16">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#eff8ff" />
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="card bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl card-hover">
            <div className="card-body p-10">
              <div className="text-6xl mb-4">🔭</div>
              <h2 className="font-display text-3xl mb-4 text-yellow-300">Visi Kami</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Menjadi platform les privat terdepan yang membuat belajar menjadi pengalaman
                menyenangkan dan bermakna bagi setiap anak Indonesia.
              </p>
            </div>
          </div>
          <div className="card bg-white border-2 border-sky-100 shadow-xl card-hover">
            <div className="card-body p-10">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="font-display text-3xl mb-4 gradient-text">Misi Kami</h2>
              <ul className="space-y-3 text-neutral/70">
                {[
                  "Memberikan pendidikan berkualitas tinggi dengan metode kreatif & inovatif",
                  "Membangun kepercayaan diri siswa melalui pencapaian nyata",
                  "Menghubungkan tutor terbaik dengan siswa yang membutuhkan bimbingan",
                  "Menjadikan setiap proses belajar pengalaman yang menyenangkan",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl mt-0.5">✓</span>
                    <span className="font-semibold">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="font-display text-4xl text-neutral text-center mb-12">
            Nilai <span className="gradient-text">Inti Kami</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card bg-white border border-sky-100 shadow-lg card-hover text-center">
                <div className="card-body p-8">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-display text-xl text-neutral mb-3">{v.title}</h3>
                  <p className="text-neutral/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-20">
          <h2 className="font-display text-4xl text-neutral text-center mb-12">
            Perjalanan <span className="gradient-text">NG.LEARN</span>
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-300 to-blue-500 hidden md:block -translate-x-1/2 rounded-full" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <div className={`card bg-white border border-sky-100 shadow-lg card-hover ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                      <div className="card-body p-8">
                        <div className="badge badge-primary badge-lg font-display text-lg mb-3">{m.year}</div>
                        <h3 className="font-display text-2xl text-neutral mb-2">{m.title}</h3>
                        <p className="text-neutral/60">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-2xl text-white shadow-xl z-10 flex-shrink-0">
                    🌟
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="font-display text-4xl text-neutral text-center mb-4">
            Tim <span className="gradient-text">Pengajar</span>
          </h2>
          <p className="text-neutral/60 text-center text-lg mb-12 max-w-xl mx-auto">
            Tutor kami adalah orang-orang berdedikasi yang benar-benar cinta mengajar!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="card bg-white border border-sky-100 shadow-lg card-hover text-center">
                <div className="card-body p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg mx-auto mb-4">
                    {t.emoji}
                  </div>
                  <h3 className="font-bold text-neutral text-lg">{t.name}</h3>
                  <p className="text-primary font-semibold text-sm">{t.role}</p>
                  <p className="text-neutral/50 text-xs mt-1">{t.subject}</p>
                  <div className="badge badge-ghost badge-sm mt-3 font-semibold">⏱ {t.exp} pengalaman</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card bg-gradient-to-r from-sky-500 to-blue-600 text-white text-center p-12 rounded-3xl shadow-2xl">
          <h2 className="font-display text-4xl mb-4 text-yellow-300">Bergabung Bersama Kami! 🎉</h2>
          <p className="text-white/80 text-xl mb-8 max-w-xl mx-auto">
            Jadilah bagian dari keluarga besar NG.LEARN. Ribuan siswa sudah merasakan manfaatnya!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/#contact" className="btn btn-warning btn-lg rounded-full font-black shadow-xl hover:scale-105 transition-transform">
              🚀 Daftar Sekarang — GRATIS Konsultasi!
            </a>
            <a href="/#programs" className="btn btn-ghost btn-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-sky-500 font-bold">
              Lihat Program
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
