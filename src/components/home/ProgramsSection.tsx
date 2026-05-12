const colorMap: Record<string, string> = {
  primary: "from-sky-400 to-blue-500",
  secondary: "from-purple-400 to-indigo-500",
  accent: "from-emerald-400 to-teal-500",
  warning: "from-amber-400 to-orange-500",
  error: "from-rose-400 to-pink-500",
  info: "from-cyan-400 to-sky-500",
};

const bgLightMap: Record<string, string> = {
  primary: "bg-sky-50",
  secondary: "bg-purple-50",
  accent: "bg-emerald-50",
  warning: "bg-amber-50",
  error: "bg-rose-50",
  info: "bg-cyan-50",
};

export default function ProgramsSection({ data }: { data: any[] }) {
  const programs = data || [];

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge badge-secondary badge-lg mb-4 font-bold">
            📚 Program Unggulan
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-neutral mb-4">
            Pilih <span className="gradient-text">Program</span> Favoritmu
          </h2>
          <p className="text-neutral/60 max-w-xl mx-auto text-lg">
            Kurikulum terstruktur, tutor berpengalaman, dan metode belajar yang
            menyenangkan untuk setiap mata pelajaran!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => {
            const colorClass = colorMap[prog.color] || colorMap.primary;
            const bgClass = bgLightMap[prog.color] || bgLightMap.primary;
            
            return (
              <div
                key={prog.id || i}
                className={`card ${bgClass} border border-sky-100 card-hover shine-card overflow-hidden`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Top gradient bar */}
                <div className={`h-2 bg-gradient-to-r ${colorClass}`} />

                <div className="card-body p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}
                    >
                      {prog.icon}
                    </div>
                    {prog.sort_order <= 1 && (
                      <span className={`badge badge-primary font-bold`}>
                        Terpopuler
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl text-neutral mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-neutral/60 text-sm leading-relaxed mb-4">
                    {prog.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge badge-ghost badge-sm font-semibold">
                      🎓 {prog.level}
                    </span>
                    <span className="badge badge-ghost badge-sm font-semibold">
                      ⏰ {prog.duration}
                    </span>
                  </div>

                  <div className="card-actions justify-between items-center mt-auto">
                    <div>
                      <p className="text-xs text-neutral/50 font-semibold">
                        Mulai dari
                      </p>
                      <p className="font-display text-xl text-primary">
                        Rp {prog.price.toLocaleString("id-ID")}
                        <span className="text-sm text-neutral/50">/sesi</span>
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className={`btn btn-sm rounded-full bg-gradient-to-r ${colorClass} text-white border-0 hover:opacity-90 shadow-md font-bold`}
                    >
                      Daftar →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="card bg-gradient-to-r from-sky-500 to-blue-600 text-white p-10 rounded-3xl">
            <h3 className="font-display text-3xl mb-3">
              Tidak yakin pilih program mana? 🤔
            </h3>
            <p className="text-white/80 mb-6 text-lg">
              Konsultasi GRATIS dengan tim kami! Kami akan membantu menemukan
              program terbaik untuk si kecil.
            </p>
            <a
              href="#contact"
              className="btn btn-warning btn-lg rounded-full font-black shadow-xl shadow-yellow-300/30 hover:scale-105 transition-transform"
            >
              💬 Konsultasi Gratis Sekarang!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
