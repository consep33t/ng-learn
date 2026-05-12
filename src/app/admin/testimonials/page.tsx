"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  student_name: string;
  student_grade: string;
  content: string;
  rating: number;
  is_active: boolean;
  avatar_url?: string;
}

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<{
    student_name: string;
    student_grade: string;
    content: string;
    rating: number;
    is_active: boolean;
    avatar_url?: string;
  }>({ student_name: "", student_grade: "", content: "", rating: 5, is_active: true, avatar_url: "" });
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const res = await fetch("/api/admin/testimonials");
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const openAdd = () => { setEditing(null); setForm({ student_name: "", student_grade: "", content: "", rating: 5, is_active: true }); setModal(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ ...t }); setModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing.id } : form),
    });
    setSaving(false);
    setModal(false);
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus testimoni ini?")) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  const toggleActive = async (t: Testimonial) => {
    await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: t.id, is_active: !t.is_active }),
    });
    fetch_();
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-neutral">💬 Testimoni</h1>
          <p className="text-neutral/50">Kelola ulasan dan testimoni siswa.</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary rounded-xl font-bold gap-2">➕ Tambah Testimoni</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.id} className={`card border-2 shadow-sm ${t.is_active ? "bg-white border-sky-100" : "bg-slate-50 border-slate-200 opacity-60"}`}>
            <div className="card-body p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-neutral">{t.student_name}</p>
                  <p className="text-primary text-sm font-semibold">{t.student_grade}</p>
                  <div className="text-yellow-400 text-sm">{"⭐".repeat(t.rating)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={t.is_active} onChange={() => toggleActive(t)} />
                  <button onClick={() => openEdit(t)} className="btn btn-ghost btn-xs rounded-lg">✏️</button>
                  <button onClick={() => handleDelete(t.id)} className="btn btn-ghost btn-xs rounded-lg text-error">🗑️</button>
                </div>
              </div>
              <p className="text-neutral/60 text-sm mt-3 italic leading-relaxed line-clamp-3">"{t.content}"</p>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg rounded-2xl">
            <h3 className="font-display text-2xl text-neutral mb-6">{editing ? "✏️ Edit" : "➕ Tambah"} Testimoni</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label label-text font-bold">Nama Siswa</label>
                  <input className="input input-bordered rounded-xl" value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} />
                </div>
                <div className="form-control">
                  <label className="label label-text font-bold">Kelas</label>
                  <input className="input input-bordered rounded-xl" placeholder="Kelas 9 SMP" value={form.student_grade} onChange={(e) => setForm({ ...form, student_grade: e.target.value })} />
                </div>
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Avatar URL (Opsional)</label>
                <input className="input input-bordered rounded-xl" placeholder="https://..." value={form.avatar_url || ""} onChange={(e) => setForm({ ...form, avatar_url: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Rating (1-5)</label>
                <input type="number" min="1" max="5" className="input input-bordered rounded-xl" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Isi Testimoni</label>
                <textarea className="textarea textarea-bordered rounded-xl h-32" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
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
