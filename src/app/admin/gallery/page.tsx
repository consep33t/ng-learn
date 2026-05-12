"use client";

import { useState, useEffect } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  is_active: boolean;
  sort_order: number;
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ title: "", image_url: "", category: "umum", sort_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const res = await fetch("/api/admin/gallery");
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const openAdd = () => { setEditing(null); setForm({ title: "", image_url: "", category: "umum", sort_order: items.length + 1, is_active: true }); setModal(true); };
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm({ ...item }); setModal(true); };

  const handleSave = async () => {
    if (!form.image_url) { alert("URL Gambar wajib diisi!"); return; }
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/gallery", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing.id } : form),
    });
    setSaving(false);
    setModal(false);
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus foto ini dari galeri?")) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  const toggleActive = async (item: GalleryItem) => {
    await fetch("/api/admin/gallery", {
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
          <h1 className="font-display text-3xl text-neutral">🖼️ Galeri Foto</h1>
          <p className="text-neutral/50">Kelola dokumentasi kegiatan les privat.</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary rounded-xl font-bold gap-2">➕ Tambah Foto</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className={`card bg-white shadow-md border border-slate-200 overflow-hidden ${!item.is_active ? "opacity-50" : ""}`}>
            <figure className="aspect-video relative overflow-hidden group">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => openEdit(item)} className="btn btn-circle btn-sm btn-white">✏️</button>
                <button onClick={() => handleDelete(item.id)} className="btn btn-circle btn-sm btn-error">🗑️</button>
              </div>
              <div className="absolute top-2 right-2">
                <input type="checkbox" className="toggle toggle-primary toggle-sm" checked={item.is_active} onChange={() => toggleActive(item)} />
              </div>
            </figure>
            <div className="p-4">
              <p className="font-bold text-neutral truncate">{item.title || "Tanpa Judul"}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="badge badge-ghost badge-xs font-semibold">{item.category}</span>
                <span className="text-xs text-neutral/40 font-bold">Urutan: {item.sort_order}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg rounded-2xl">
            <h3 className="font-display text-2xl text-neutral mb-6">{editing ? "✏️ Edit" : "➕ Tambah"} Foto</h3>
            <div className="space-y-4">
              <ImageUpload 
                label="File Gambar"
                value={form.image_url} 
                onChange={(url) => setForm({ ...form, image_url: url })} 
              />
              <label className="label label-text-alt text-neutral/50">Gunakan link gambar dari cloud storage atau link publik.</label>
              <div className="form-control">
                <label className="label label-text font-bold">Judul / Keterangan</label>
                <input className="input input-bordered rounded-xl" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label label-text font-bold">Kategori</label>
                  <select className="select select-bordered rounded-xl" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="umum">Umum</option>
                    <option value="kegiatan">Kegiatan</option>
                    <option value="fasilitas">Fasilitas</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label label-text font-bold">Urutan</label>
                  <input type="number" className="input input-bordered rounded-xl" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                </div>
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
