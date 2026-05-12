"use client";

import { useState, useEffect } from "react";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminsPage() {
  const [items, setItems] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetch_ = async () => {
    const res = await fetch("/api/admin/admins");
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const handleSave = async () => {
    setError("");
    if (!form.name || !form.email || !form.password) { setError("Semua field wajib diisi!"); return; }
    setSaving(true);
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || "Gagal menambahkan admin"); return; }
    setModal(false);
    setForm({ name: "", email: "", password: "", role: "admin" });
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus admin ini? Pastikan masih ada admin lain!")) return;
    await fetch(`/api/admin/admins?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-neutral">👤 Kelola Admin</h1>
          <p className="text-neutral/50">Tambah atau hapus akun admin panel.</p>
        </div>
        <button onClick={() => { setError(""); setModal(true); }} className="btn btn-primary rounded-xl font-bold gap-2">➕ Tambah Admin</button>
      </div>

      <div className="alert alert-warning rounded-2xl">
        <span>⚠️</span>
        <p className="text-sm font-semibold">Hanya tambahkan admin yang dipercaya. Semua admin memiliki akses penuh ke CMS website.</p>
      </div>

      <div className="card bg-white shadow-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-sky-50">
              <tr>
                <th>Admin</th>
                <th>Role</th>
                <th>Bergabung</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-neutral">{a.name}</p>
                        <p className="text-neutral/50 text-sm">{a.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge font-bold ${a.role === "superadmin" ? "badge-primary" : "badge-ghost"}`}>
                      {a.role}
                    </span>
                  </td>
                  <td className="text-neutral/50 text-sm">{new Date(a.created_at).toLocaleDateString("id-ID")}</td>
                  <td>
                    {a.role !== "superadmin" && (
                      <button onClick={() => handleDelete(a.id)} className="btn btn-ghost btn-sm rounded-lg text-error">🗑️</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md rounded-2xl">
            <h3 className="font-display text-2xl text-neutral mb-6">➕ Tambah Admin Baru</h3>
            {error && <div className="alert alert-error rounded-xl mb-4 text-sm font-semibold"><span>⚠️ {error}</span></div>}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label label-text font-bold">Nama Lengkap</label>
                <input className="input input-bordered rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Email</label>
                <input type="email" className="input input-bordered rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Password</label>
                <input type="password" className="input input-bordered rounded-xl" placeholder="Min. 8 karakter" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Role</label>
                <select className="select select-bordered rounded-xl" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>
            <div className="modal-action mt-6">
              <button onClick={() => setModal(false)} className="btn btn-ghost rounded-xl">Batal</button>
              <button onClick={handleSave} disabled={saving} className="btn btn-primary rounded-xl font-bold">
                {saving ? <span className="loading loading-spinner loading-sm" /> : "💾 Simpan"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setModal(false)} />
        </div>
      )}
    </div>
  );
}
