import { auth } from "@/auth";
import { query } from "@/lib/db";

async function getStats() {
  try {
    const [programs, testimonials, messages, faqs, gallery] = await Promise.all([
      query("SELECT COUNT(*) FROM programs WHERE is_active = true"),
      query("SELECT COUNT(*) FROM testimonials WHERE is_active = true"),
      query("SELECT COUNT(*) FROM contact_messages WHERE is_read = false"),
      query("SELECT COUNT(*) FROM faqs WHERE is_active = true"),
      query("SELECT COUNT(*) FROM gallery WHERE is_active = true"),
    ]);
    const latestMessages = await query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5");
    return {
      programs: programs.rows[0].count,
      testimonials: testimonials.rows[0].count,
      unreadMessages: messages.rows[0].count,
      faqs: faqs.rows[0].count,
      gallery: gallery.rows[0].count,
      latestMessages: latestMessages.rows,
    };
  } catch {
    return { programs: 6, testimonials: 4, unreadMessages: 0, faqs: 5, gallery: 0, latestMessages: [] };
  }
}

export default async function AdminDashboardPage() {
  const session = await auth();
  const stats = await getStats();

  const cards = [
    { icon: "📚", label: "Program Aktif", value: stats.programs, color: "from-sky-400 to-blue-500", bg: "bg-sky-50", link: "/admin/programs" },
    { icon: "🖼️", label: "Galeri Foto", value: stats.gallery, color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", link: "/admin/gallery" },
    { icon: "✉️", label: "Pesan Baru", value: stats.unreadMessages, color: "from-rose-400 to-pink-500", bg: "bg-rose-50", link: "/admin/messages" },
    { icon: "💬", label: "Testimoni", value: stats.testimonials, color: "from-purple-400 to-indigo-500", bg: "bg-purple-50", link: "/admin/testimonials" },
  ];

  const quickActions = [
    { href: "/admin/settings", icon: "⚙️", label: "Pengaturan Website", desc: "Nama, tagline, & kontak" },
    { href: "/admin/hero", icon: "🚀", label: "Banner Utama", desc: "Kelola slide banner depan" },
    { href: "/admin/programs", icon: "📚", label: "Program Les", desc: "Tambah/edit program les" },
    { href: "/admin/gallery", icon: "🖼️", label: "Galeri Foto", desc: "Upload dokumentasi kegiatan" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="card bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xl">
        <div className="card-body p-8 flex-row items-center gap-6">
          <div className="text-5xl">👋</div>
          <div>
            <h2 className="font-display text-3xl text-yellow-300">
              Halo, {session?.user?.name ?? "Admin"}!
            </h2>
            <p className="text-white/80 text-lg">
              Selamat datang kembali di panel admin NG.LEARN. Apa yang ingin kamu kelola hari ini?
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <a key={c.label} href={c.link} className={`card ${c.bg} border border-sky-100 shadow-md card-hover block`}>
            <div className="card-body p-6 text-center">
              <div className={`w-14 h-14 bg-gradient-to-br ${c.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg mx-auto mb-3`}>
                {c.icon}
              </div>
              <div className="font-display text-4xl text-neutral">{c.value}</div>
              <p className="text-neutral/60 font-semibold text-sm">{c.label}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl text-neutral mb-5">⚡ Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="card bg-white border border-slate-200 shadow-sm card-hover flex-row"
              >
                <div className="card-body p-5 flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-bold text-neutral">{action.label}</p>
                    <p className="text-neutral/50 text-sm">{action.desc}</p>
                  </div>
                  <span className="ml-auto text-primary text-xl">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Latest Messages */}
        <div>
          <h2 className="font-display text-2xl text-neutral mb-5">📩 Pesan Terbaru</h2>
          <div className="card bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {stats.latestMessages.length === 0 && (
                <div className="p-6 text-center text-neutral/40 font-semibold italic">Belum ada pesan masuk</div>
              )}
              {stats.latestMessages.map((m: any) => (
                <a key={m.id} href="/admin/messages" className="block p-4 hover:bg-sky-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-neutral">{m.name}</p>
                    <span className="text-[10px] text-neutral/30 font-bold">
                      {new Date(m.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <p className="text-xs text-neutral/50 line-clamp-1">{m.message}</p>
                </a>
              ))}
            </div>
            {stats.latestMessages.length > 0 && (
              <a href="/admin/messages" className="block p-3 text-center bg-slate-50 text-xs font-bold text-primary hover:underline">
                Lihat Semua Pesan
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="alert alert-info rounded-2xl shadow-sm">
        <span className="text-2xl">💡</span>
        <div>
          <p className="font-bold">Tips Admin</p>
          <p className="text-sm">
            Perubahan pada <strong>Pengaturan Website</strong> akan langsung tampil di halaman publik. Pastikan selalu cek preview setelah melakukan perubahan!
          </p>
        </div>
      </div>
    </div>
  );
}
