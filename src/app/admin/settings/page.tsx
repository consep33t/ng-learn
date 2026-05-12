"use client";

import { useState, useEffect } from "react";

interface Setting {
  key: string;
  value: string;
  label: string;
  type: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSettings(data);
        } else {
          console.error("Failed to load settings:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const updateSetting = async (key: string, value: string) => {
    setSaving(key);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      setSaving(null);
      setSaved(key);
      setTimeout(() => setSaved(null), 3000);
    } catch (err) {
      console.error(err);
      setSaving(null);
    }
  };

  const groups = [
    { title: "🌐 Informasi Umum", keys: ["site_name", "site_tagline", "site_description"], icon: "globe" },
    { title: "📞 Kontak & Media Sosial", keys: ["contact_whatsapp", "contact_email", "contact_address", "contact_instagram"], icon: "phone" },
    { title: "🏠 Hero Section", keys: ["hero_title", "hero_subtitle"], icon: "home" },
    { title: "🎯 Visi & Misi", keys: ["about_vision", "about_mission"], icon: "target" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <span className="loading loading-spinner loading-lg text-indigo-600" />
        <p className="text-slate-400 font-bold animate-pulse">Memuat pengaturan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight">⚙️ Pengaturan Website</h1>
          <p className="text-slate-500 mt-2 font-medium">Kelola konten utama yang tampil di seluruh halaman website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {groups.map((group) => (
          <div key={group.title} className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8 border-b border-slate-50 pb-6">
                <h2 className="font-display text-2xl font-bold text-slate-800 tracking-tight">
                  {group.title}
                </h2>
              </div>
              
              <div className="space-y-8">
                {group.keys.map((key) => {
                  const s = settings.find((x) => x.key === key);
                  if (!s) return null;
                  return (
                    <div key={key} className="form-control group">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <label className="label-text font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                          {s.label}
                        </label>
                        <div className="flex items-center gap-2 h-4">
                          {saving === key && (
                            <div className="flex items-center gap-2">
                              <span className="loading loading-spinner loading-xs text-indigo-600" />
                              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Menyimpan...</span>
                            </div>
                          )}
                          {saved === key && (
                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest animate-bounce">✓ Berhasil Disimpan</span>
                          )}
                        </div>
                      </div>
                      
                      {s.type === "textarea" ? (
                        <textarea
                          className="textarea textarea-bordered rounded-2xl bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all h-32 font-medium leading-relaxed p-5"
                          defaultValue={s.value}
                          placeholder={`Masukkan ${s.label}...`}
                          onBlur={(e) => {
                            if (e.target.value !== s.value) {
                              updateSetting(key, e.target.value);
                            }
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          className="input input-bordered rounded-2xl h-14 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white transition-all font-bold px-6"
                          defaultValue={s.value}
                          placeholder={`Masukkan ${s.label}...`}
                          onBlur={(e) => {
                            if (e.target.value !== s.value) {
                              updateSetting(key, e.target.value);
                            }
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-200">
          💡
        </div>
        <div>
          <p className="text-amber-900 font-bold mb-1">Tips Navigasi</p>
          <p className="text-amber-700 text-sm font-medium leading-relaxed">
            Perubahan Anda akan disimpan secara otomatis saat Anda mengklik di luar kotak input (auto-save on blur). 
            Perubahan tersebut akan langsung tampil di website utama.
          </p>
        </div>
      </div>
    </div>
  );
}
