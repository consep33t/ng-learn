"use client";

import { useState } from "react";

export default function ContactSection({ settings }: { settings: any }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "📱",
      label: "WhatsApp",
      value: settings?.contact_whatsapp || "+62 812 3456 7890",
      link: `https://wa.me/${(settings?.contact_whatsapp || "6281234567890").replace(/\D/g, "")}`,
    },
    {
      icon: "✉️",
      label: "Email",
      value: settings?.contact_email || "halo@nglearn.id",
      link: `mailto:${settings?.contact_email || "halo@nglearn.id"}`,
    },
    {
      icon: "📍",
      label: "Alamat",
      value: settings?.contact_address || "Jakarta Selatan, Indonesia",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div>
            <div className="badge badge-warning badge-lg mb-4 font-bold">
              👋 Kontak Kami
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-neutral mb-6">
              Mulai <span className="gradient-text">Petualangan Belajarmu</span> Hari Ini!
            </h2>
            <p className="text-neutral/60 text-lg mb-10 leading-relaxed">
              Konsultasi gratis untuk menentukan tutor dan jadwal yang paling sesuai untuk anak Anda. Kami siap membantu prestasi anak Anda meningkat!
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.link}
                  className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-sky-50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all group"
                >
                  <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-neutral/40 font-bold uppercase tracking-widest">{info.label}</p>
                    <p className="text-lg text-neutral font-bold">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="card bg-white shadow-2xl border border-sky-50">
            <div className="card-body p-8 md:p-12">
              <h3 className="font-display text-2xl text-neutral mb-2">Kirim Pesan</h3>
              <p className="text-neutral/50 text-sm mb-8">Tinggalkan kontak Anda, tim kami akan segera menghubungi.</p>

              {success ? (
                <div className="alert alert-success rounded-2xl shadow-lg border-0 text-white animate-bounce">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="font-bold">Berhasil Terkirim!</p>
                    <p className="text-xs opacity-90">Tim kami akan menghubungi Anda segera.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="form-control">
                    <label className="label label-text font-bold text-neutral">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Contoh: Budi Santoso"
                      className="input input-bordered rounded-xl focus:input-primary w-full bg-slate-50 border-slate-200"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label label-text font-bold text-neutral">No. WhatsApp / Telepon</label>
                    <input
                      type="text"
                      placeholder="Contoh: 0812-3456-7890"
                      className="input input-bordered rounded-xl focus:input-primary w-full bg-slate-50 border-slate-200"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label label-text font-bold text-neutral">Pesan / Kebutuhan</label>
                    <textarea
                      placeholder="Tuliskan mata pelajaran atau tingkat kelas..."
                      className="textarea textarea-bordered rounded-xl focus:textarea-primary w-full bg-slate-50 border-slate-200 min-h-[120px]"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full rounded-xl font-black text-lg gap-2 shadow-lg shadow-sky-200 hover:scale-[1.02] transition-transform"
                  >
                    {loading ? <span className="loading loading-spinner"></span> : "🚀 Kirim Sekarang"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
