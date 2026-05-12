import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - NG.LEARN",
  description: "Dashboard informasi program dan statistik NG.LEARN",
};

const levels = [
  {
    icon: "🌱",
    title: "Kelas SD",
    grades: "Kelas 1 - 6",
    desc: "Fondasi belajar yang kuat dengan metode bermain dan bercerita. Menyenangkan dan mudah dipahami!",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    subjects: ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS"],
    features: ["Metode gamifikasi", "Guru sabar & ramah", "Materi visual menarik"],
  },
  {
    icon: "🚀",
    title: "Kelas SMP",
    grades: "Kelas 7 - 9",
    desc: "Penguatan materi pelajaran menuju UN dengan pendekatan analitik yang mudah dipahami remaja.",
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    subjects: ["Matematika", "IPA", "Bahasa Inggris", "Bahasa Indonesia", "IPS"],
    features: ["Latihan soal UN", "Diskusi interaktif", "Mind mapping kreatif"],
  },
  {
    icon: "🎯",
    title: "Kelas SMA",
    grades: "Kelas 10 - 12",
    desc: "Persiapan UTBK/SBMPTN dan UN dengan strategi belajar efektif menuju universitas impian.",
    color: "from-purple-400 to-indigo-500",
    bg: "bg-purple-50",
    subjects: ["Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Inggris", "Coding"],
    features: ["Simulasi UTBK", "Tryout berkala", "Konsultasi jurusan"],
  },
];

const schedules = [
  { day: "Senin - Jumat", time: "14.00 - 20.00", label: "Hari Kerja" },
  { day: "Sabtu", time: "08.00 - 17.00", label: "Weekend" },
  { day: "Minggu", time: "Libur", label: "Istirahat" },
];

const achievements = [
  { icon: "🥇", title: "Juara Olimpiade Matematika Tingkat Kota", year: "2024", student: "Ahmad F." },
  { icon: "🏆", title: "Masuk Universitas Indonesia", year: "2024", student: "Rizky P." },
  { icon: "🥈", title: "Juara 2 English Speech Contest", year: "2023", student: "Siti R." },
  { icon: "⭐", title: "10 Siswa Nilai UN Sempurna", year: "2024", student: "Berbagai Siswa" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 pt-20">
      {/* Page Header */}
      <div
        className="py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 60%, #0284c7 100%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="badge badge-warning badge-lg mb-4 font-bold">
            📊 Dashboard NG.LEARN
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
            Pusat Informasi{" "}
            <span className="text-yellow-300">Belajarmu</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Temukan semua informasi tentang program, jadwal, dan pencapaian siswa NG.LEARN di sini!
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none relative">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#eff8ff" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">

        {/* Level Cards */}
        <div className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl text-neutral text-center mb-12">
            Program <span className="gradient-text">per Jenjang</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level) => (
              <div key={level.title} className={`card ${level.bg} border-2 border-sky-100 card-hover overflow-hidden`}>
                <div className={`h-2 bg-gradient-to-r ${level.color}`} />
                <div className="card-body p-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg mb-4`}>
                    {level.icon}
                  </div>
                  <h3 className="font-display text-2xl text-neutral">{level.title}</h3>
                  <p className="badge badge-ghost badge-sm font-bold mb-2">{level.grades}</p>
                  <p className="text-neutral/60 text-sm leading-relaxed mb-4">{level.desc}</p>

                  <div className="mb-4">
                    <p className="font-bold text-neutral text-sm mb-2">Mata Pelajaran:</p>
                    <div className="flex flex-wrap gap-1">
                      {level.subjects.map((s) => (
                        <span key={s} className="badge badge-outline badge-sm font-semibold">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {level.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-neutral/70">
                        <span className="text-emerald-500">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Schedule */}
          <div>
            <h2 className="font-display text-3xl text-neutral mb-8">
              🗓️ Jadwal <span className="gradient-text">Belajar</span>
            </h2>
            <div className="space-y-4">
              {schedules.map((s) => (
                <div key={s.day} className={`card bg-white border border-sky-100 shadow-md`}>
                  <div className="card-body p-6 flex-row items-center justify-between">
                    <div>
                      <p className="font-bold text-neutral text-lg">{s.day}</p>
                      <p className="badge badge-ghost badge-sm">{s.label}</p>
                    </div>
                    <div className={`badge badge-lg font-bold ${s.time === "Libur" ? "badge-error" : "badge-primary"}`}>
                      {s.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card bg-gradient-to-r from-sky-500 to-blue-600 text-white mt-6 shadow-xl">
              <div className="card-body p-6">
                <p className="font-display text-xl mb-2">💡 Fleksibel!</p>
                <p className="text-white/80 text-sm">
                  Jadwal dapat disesuaikan dengan kesibukan siswa. Hubungi kami untuk booking sesi khusus di hari libur nasional!
                </p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="font-display text-3xl text-neutral mb-8">
              🏆 Prestasi <span className="gradient-text">Siswa</span>
            </h2>
            <div className="space-y-4">
              {achievements.map((a) => (
                <div key={a.title} className="card bg-white border border-sky-100 shadow-md card-hover">
                  <div className="card-body p-6 flex-row items-center gap-4">
                    <div className="text-4xl">{a.icon}</div>
                    <div className="flex-1">
                      <p className="font-bold text-neutral">{a.title}</p>
                      <p className="text-neutral/60 text-sm">{a.student}</p>
                    </div>
                    <div className="badge badge-outline font-bold">{a.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="card bg-white border border-sky-100 shadow-xl">
          <div className="card-body p-10">
            <h2 className="font-display text-3xl text-neutral text-center mb-10">
              Mengapa Pilih <span className="gradient-text">NG.LEARN?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "👩‍🏫", title: "Tutor Berkualitas", desc: "Seluruh tutor dari universitas terkemuka dengan pengalaman mengajar" },
                { icon: "🎮", title: "Belajar Menyenangkan", desc: "Metode gamifikasi dan aktivitas interaktif yang bikin belajar seru" },
                { icon: "📱", title: "Online & Offline", desc: "Fleksibel! Bisa belajar di rumah atau via video call sesuai keinginan" },
                { icon: "📈", title: "Terbukti Efektif", desc: "95% siswa mengalami peningkatan nilai signifikan setelah 3 bulan bersama kami" },
              ].map((item) => (
                <div key={item.title} className="text-center p-6 bg-sky-50 rounded-2xl card-hover">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-neutral text-lg mb-2">{item.title}</h3>
                  <p className="text-neutral/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
