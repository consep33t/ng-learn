"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Email atau password salah. Coba lagi!");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />

      {/* Floating emojis */}
      {["📚", "✏️", "🎓", "⭐", "🔢", "💡"].map((e, i) => (
        <div
          key={i}
          className="absolute text-4xl select-none pointer-events-none opacity-20"
          style={{
            left: `${[10, 20, 75, 85, 50, 65][i]}%`,
            top: `${[15, 70, 20, 60, 80, 10][i]}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          {e}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
              <span className="font-display text-3xl text-white">N</span>
            </div>
            <div>
              <span className="font-display text-4xl text-sky-200">NG.</span>
              <span className="font-display text-4xl text-white">LEARN</span>
            </div>
          </div>
          <p className="text-white/70 font-semibold">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body p-10">
            <h2 className="font-display text-3xl text-neutral text-center mb-2">
              Selamat Datang! 👋
            </h2>
            <p className="text-neutral/50 text-center text-sm mb-8">
              Masuk ke panel admin NG.LEARN
            </p>

            {error && (
              <div className="alert alert-error rounded-xl mb-6 text-sm font-semibold">
                <span>⚠️ {error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label label-text font-bold text-neutral">Email Admin</label>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@nglearn.id"
                  className="input input-bordered rounded-xl focus:input-primary w-full"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold text-neutral">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered rounded-xl focus:input-primary w-full"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                id="admin-login-btn"
                disabled={loading}
                className="btn btn-primary w-full rounded-xl font-black text-lg mt-2 hover:scale-[1.02] transition-transform"
              >
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "🔐 Masuk ke Panel Admin"
                )}
              </button>
            </form>

            <div className="divider text-neutral/30 text-xs mt-6">NG.LEARN Admin</div>
            <p className="text-center text-xs text-neutral/40">
              Hanya untuk admin yang berwenang. Hubungi superadmin jika lupa password.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-white/60 hover:text-white text-sm transition-colors">
            ← Kembali ke Website
          </a>
        </div>
      </div>
    </div>
  );
}
