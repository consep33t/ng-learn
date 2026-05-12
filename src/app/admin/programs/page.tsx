"use client";

import { useState, useEffect } from "react";

interface Program {
  id: number;
  title: string;
  description: string;
  icon: string;
  level: string;
  price: number;
  duration: string;
  is_active: boolean;
  sort_order: number;
  color: string;
  created_at?: string;
  updated_at?: string;
}

const emptyProgram: Omit<Program, "id"> = {
  title: "",
  description: "",
  icon: "📚",
  level: "SD - SMA",
  price: 150000,
  duration: "90 menit/sesi",
  is_active: true,
  sort_order: 0,
  color: "primary",
};

export default function ProgramsAdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [form, setForm] = useState(emptyProgram);
  const [saving, setSaving] = useState(false);

  const fetchPrograms = async () => {
    const res = await fetch("/api/admin/programs");
    const data = await res.json();
    setPrograms(data);
    setLoading(false);
  };

  useEffect(() => { fetchPrograms(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyProgram); setModal(true); };
  const openEdit = (p: Program) => { setEditing(p); setForm({ ...p }); setModal(true); };

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/admin/programs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setModal(false);
    fetchPrograms();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus program ini?")) return;
    await fetch(`/api/admin/programs?id=${id}`, { method: "DELETE" });
    fetchPrograms();
  };

  const toggleActive = async (p: Program) => {
    await fetch("/api/admin/programs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: p.id, is_active: !p.is_active }),
    });
    fetchPrograms();
  };

  if (loading) return (
    <div className="flex flex-col justify-center h-96 items-center gap-4">
      <span className="loading loading-spinner loading-lg text-indigo-600" />
      <p className="text-slate-400 font-bold animate-pulse">Memuat data program...</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight">📚 Program Les</h1>
          <p className="text-slate-500 mt-2 font-medium">Kelola daftar program les yang ditampilkan di website.</p>
        </div>
        <button onClick={openAdd} className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold gap-2 px-6 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95 border-none h-14">
          <span className="text-xl">➕</span> Tambah Program
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="text-slate-400 font-bold uppercase tracking-wider text-[10px] py-6 px-8">Program & Deskripsi</th>
                <th className="text-slate-400 font-bold uppercase tracking-wider text-[10px] py-6">Level</th>
                <th className="text-slate-400 font-bold uppercase tracking-wider text-[10px] py-6">Harga/Sesi</th>
                <th className="text-slate-400 font-bold uppercase tracking-wider text-[10px] py-6 text-center">Status</th>
                <th className="text-slate-400 font-bold uppercase tracking-wider text-[10px] py-6 text-right px-8">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:bg-white transition-colors">
                        {p.icon}
                      </div>
                      <div className="max-w-xs">
                        <p className="font-bold text-slate-800 text-lg tracking-tight">{p.title}</p>
                        <p className="text-slate-500 text-sm line-clamp-1 mt-0.5 font-medium">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-indigo-100">
                      {p.level}
                    </span>
                  </td>
                  <td>
                    <p className="font-bold text-slate-800 text-lg">
                      <span className="text-slate-400 text-sm mr-1">Rp</span>
                      {p.price.toLocaleString("id-ID")}
                    </p>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      defaultChecked={p.is_active}
                      className="checkbox toggle-primary toggle-md"
                      onChange={() => toggleActive(p)}
                    />
                  </td>
                  <td className="px-8 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openEdit(p)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        title="Hapus"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl rounded-[2.5rem] p-10 bg-white shadow-2xl border border-slate-100 overflow-visible">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl">
                {editing ? "✏️" : "➕"}
              </div>
              <h3 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
                {editing ? "Edit Program" : "Tambah Program Baru"}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label label-text font-bold text-slate-700 ml-1">Ikon Emoji</label>
                  <input className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all text-xl" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                </div>
                <div className="form-control">
                  <label className="label label-text font-bold text-slate-700 ml-1">Level Pendidikan</label>
                  <select className="select select-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all font-bold" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                    <option>SD - SMA</option>
                    <option>SD</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>SMP - SMA</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label label-text font-bold text-slate-700 ml-1">Nama Program *</label>
                <input className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all font-bold text-lg" placeholder="Contoh: Matematika" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className="form-control">
                <label className="label label-text font-bold text-slate-700 ml-1">Deskripsi Singkat</label>
                <textarea className="textarea textarea-bordered rounded-2xl h-32 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all font-medium leading-relaxed" placeholder="Jelaskan apa yang dipelajari di program ini..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label label-text font-bold text-slate-700 ml-1">Harga per Sesi (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                    <input type="number" className="input input-bordered rounded-2xl h-14 pl-12 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all font-bold text-lg w-full" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label label-text font-bold text-slate-700 ml-1">Durasi per Sesi</label>
                  <input className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all font-bold" placeholder="Contoh: 90 menit/sesi" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="modal-action mt-10 gap-3">
              <button onClick={() => setModal(false)} className="btn btn-ghost rounded-2xl h-14 px-8 font-bold text-slate-500 hover:bg-slate-100 border-none">Batal</button>
              <button onClick={handleSave} disabled={saving} className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-10 font-bold border-none shadow-lg shadow-indigo-100 flex-1">
                {saving ? <span className="loading loading-spinner loading-sm" /> : "💾 Simpan Perubahan"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-slate-900/40 backdrop-blur-sm" onClick={() => setModal(false)} />
        </div>
      )}
    </div>
  );
}
