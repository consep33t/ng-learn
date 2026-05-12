import Link from "next/link";

export default function Footer({ settings }: { settings?: any }) {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: "📍", text: settings?.contact_address || "Jakarta Selatan, Indonesia" },
    { icon: "📱", text: settings?.contact_whatsapp || "+62 812-3456-7890" },
    { icon: "✉️", text: settings?.contact_email || "halo@nglearn.id" },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background bubbles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-sky-500/20">
                <span className="font-display text-2xl text-white">N</span>
              </div>
              <div>
                <span className="font-display text-2xl text-sky-400">NG.</span>
                <span className="font-display text-2xl text-white">LEARN</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Membangun masa depan cerah melalui metode belajar yang
              menyenangkan dan tutor yang inspiratif. Prestasi anak Anda adalah
              prioritas kami.
            </p>
            <div className="flex gap-4">
              {["𝕏", "📷", "📘", "🎵"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-primary transition-all hover:-translate-y-1"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-8 border-b border-white/10 pb-4">
              Navigasi
            </h4>
            <ul className="space-y-4 text-slate-400">
              {["Beranda", "Program", "Testimoni", "FAQ", "Kontak Kami"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={item === "Beranda" ? "/" : `#${item.toLowerCase().replace(" ", "")}`}
                      className="hover:text-sky-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display text-xl mb-8 border-b border-white/10 pb-4">
              Layanan Kami
            </h4>
            <ul className="space-y-4 text-slate-400">
              {[
                "Les Privat SD",
                "Les Privat SMP",
                "Les Privat SMA",
                "Persiapan UTBK",
                "Bimbingan Olimpiade",
                "Kelas Coding Anak",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#programs"
                    className="hover:text-sky-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-8 border-b border-white/10 pb-4">
              Hubungi Kami
            </h4>
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-4 text-slate-400">
                  <span className="text-2xl">{info.icon}</span>
                  <span className="leading-relaxed">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© {currentYear} NG.LEARN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
