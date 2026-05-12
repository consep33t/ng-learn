"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  sort_order: number;
}

export default function HeroAdminPage() {
  const [items, setItems] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const [form, setForm] = useState({ title: "", subtitle: "", image_url: "", cta_text: "Daftar Sekarang", cta_link: "#contact", sort_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const res = await fetch("/api/admin/hero");
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const openAdd = () => { setEditing(null); setForm({ title: "", subtitle: "", image_url: "", cta_text: "Daftar Sekarang", cta_link: "#contact", sort_order: items.length + 1, is_active: true }); setModal(true); };
  const openEdit = (item: HeroSlide) => { setEditing(item); setForm({ ...item }); setModal(true); };

  const handleSave = async () => {
    if (!form.title) { alert("Judul wajib diisi!"); return; }
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/hero", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing.id } : form),
    });
    setSaving(false);
    setModal(false);
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus slide ini?")) return;
    await fetch(`/api/admin/hero?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  const toggleActive = async (item: HeroSlide) => {
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, is_active: !item.is_active }),
    });
    fetch_();
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-neutral">🚀 Hero Slides</h1>
          <p className="text-neutral/50">Kelola banner utama di halaman depan.</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary rounded-xl font-bold gap-2">➕ Tambah Slide</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className={`card bg-white shadow-md border border-slate-200 overflow-hidden ${!item.is_active ? "opacity-60" : ""}`}>
            <div className="flex flex-col md:flex-row">
              {item.image_url && (
                <div className="w-full md:w-48 h-32 md:h-auto bg-slate-100 relative">
                  <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="card-body p-6 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl text-neutral">{item.title}</h3>
                    <p className="text-neutral/50 text-sm mt-1">{item.subtitle}</p>
                    <div className="flex gap-3 mt-3">
                      <span className="badge badge-outline badge-sm font-semibold">CTA: {item.cta_text}</span>
                      <span className="badge badge-ghost badge-sm font-semibold">Urutan: {item.sort_order}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={item.is_active} onChange={() => toggleActive(item)} />
                    <button onClick={() => openEdit(item)} className="btn btn-ghost btn-sm rounded-lg">✏️</button>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-ghost btn-sm rounded-lg text-error">🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl rounded-2xl">
            <h3 className="font-display text-2xl text-neutral mb-6">{editing ? "✏️ Edit" : "➕ Tambah"} Hero Slide</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label label-text font-bold">Judul Banner *</label>
                <input className="input input-bordered rounded-xl" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Sub-judul / Deskripsi Singkat</label>
                <textarea className="textarea textarea-bordered rounded-xl h-24" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              </div>
              <ImageUpload 
                label="Gambar Background"
                value={form.image_url} 
                onChange={(url) => setForm({ ...form, image_url: url })} 
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label label-text font-bold">Teks Tombol (CTA)</label>
                  <input className="input input-bordered rounded-xl" value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} />
                </div>
                <div className="form-control">
                  <label className="label label-text font-bold">Link Tombol</label>
                  <input className="input input-bordered rounded-xl" value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} />
                </div>
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Urutan Tampil</label>
                <input type="number" className="input input-bordered rounded-xl" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
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
