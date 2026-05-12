"use client";

import { useState, useEffect } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesAdminPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetch_ = async () => {
    const res = await fetch("/api/admin/messages");
    setItems(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const markRead = async (id: number) => {
    await fetch("/api/admin/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_read: true }),
    });
    fetch_();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus pesan ini?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    setSelected(null);
    fetch_();
  };

  const openMessage = (m: Message) => {
    setSelected(m);
    if (!m.is_read) markRead(m.id);
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><span className="loading loading-spinner loading-lg text-primary" /></div>;

  const unread = items.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-neutral">
            ✉️ Pesan Masuk
            {unread > 0 && <span className="badge badge-error badge-sm ml-3 font-bold">{unread} baru</span>}
          </h1>
          <p className="text-neutral/50">Pesan dari calon siswa melalui form kontak.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="card bg-white shadow-md border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {items.length === 0 && (
              <div className="p-10 text-center text-neutral/40 font-semibold">Belum ada pesan masuk 📭</div>
            )}
            {items.map((m) => (
              <div
                key={m.id}
                onClick={() => openMessage(m)}
                className={`p-5 cursor-pointer transition-all hover:bg-sky-50 ${selected?.id === m.id ? "bg-sky-50 border-l-4 border-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {!m.is_read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                    <div>
                      <p className={`font-bold text-neutral ${!m.is_read ? "text-primary" : ""}`}>{m.name}</p>
                      <p className="text-neutral/50 text-xs">{m.phone || m.email}</p>
                    </div>
                  </div>
                  <p className="text-neutral/30 text-xs whitespace-nowrap">
                    {new Date(m.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <p className="text-neutral/50 text-sm mt-2 line-clamp-2 pl-5">{m.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="card bg-white shadow-md border border-slate-200">
          {selected ? (
            <div className="card-body p-7">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl text-neutral">{selected.name}</h2>
                  <div className="flex gap-3 mt-1">
                    {selected.phone && <span className="badge badge-ghost badge-sm">📱 {selected.phone}</span>}
                    {selected.email && <span className="badge badge-ghost badge-sm">✉️ {selected.email}</span>}
                  </div>
                </div>
                <button onClick={() => handleDelete(selected.id)} className="btn btn-ghost btn-sm text-error rounded-xl">🗑️ Hapus</button>
              </div>
              <div className="bg-sky-50 rounded-2xl p-6">
                <p className="text-neutral/70 leading-relaxed font-semibold">{selected.message}</p>
              </div>
              <p className="text-neutral/30 text-xs mt-4">
                Diterima: {new Date(selected.created_at).toLocaleString("id-ID")}
              </p>
              <div className="mt-4">
                <a
                  href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm rounded-xl font-bold gap-2"
                >
                  💬 Balas via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="card-body items-center justify-center h-64 text-neutral/30">
              <p className="text-5xl mb-3">📩</p>
              <p className="font-semibold">Pilih pesan untuk melihat detail</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
