"use client";

import { useState, useEffect } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
}

export default function FaqsAdminPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", is_active: true, sort_order: 0 });
  const [saving, setSaving] = useState(false);

  const fetch_ = async () => {
    const res = await fetch("/api/admin/faqs");
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const openAdd = () => { setEditing(null); setForm({ question: "", answer: "", is_active: true, sort_order: items.length + 1 }); setModal(true); };
  const openEdit = (f: FAQ) => { setEditing(f); setForm({ ...f }); setModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    await fetch("/api/admin/faqs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing.id } : form),
    });
    setSaving(false);
    setModal(false);
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus FAQ ini?")) return;
    await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
    fetch_();
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-neutral">❓ FAQ</h1>
          <p className="text-neutral/50">Kelola pertanyaan yang sering ditanya.</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary rounded-xl font-bold gap-2">➕ Tambah FAQ</button>
      </div>

      <div className="card bg-white shadow-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-sky-50">
              <tr>
                <th>#</th>
                <th>Pertanyaan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((f, i) => (
                <tr key={f.id}>
                  <td className="font-bold text-neutral/40">{i + 1}</td>
                  <td>
                    <p className="font-bold text-neutral">{f.question}</p>
                    <p className="text-neutral/50 text-xs line-clamp-1 mt-1">{f.answer}</p>
                  </td>
                  <td>
                    <span className={`badge font-bold ${f.is_active ? "badge-success" : "badge-ghost"}`}>
                      {f.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(f)} className="btn btn-ghost btn-sm rounded-lg">✏️</button>
                      <button onClick={() => handleDelete(f.id)} className="btn btn-ghost btn-sm rounded-lg text-error">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg rounded-2xl">
            <h3 className="font-display text-2xl text-neutral mb-6">{editing ? "✏️ Edit" : "➕ Tambah"} FAQ</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label label-text font-bold">Pertanyaan *</label>
                <input className="input input-bordered rounded-xl" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="label label-text font-bold">Jawaban *</label>
                <textarea className="textarea textarea-bordered rounded-xl h-32" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text font-bold">Tampilkan di website</span>
                  <input type="checkbox" className="toggle toggle-primary" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                </label>
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
