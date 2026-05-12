"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Gambar" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Gagal mengunggah gambar");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Kesalahan koneksi saat mengunggah");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-bold text-slate-700">{label}</span>
      </label>
      
      <div className="flex flex-col gap-4">
        {value && (
          <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={() => onChange("")}
                className="btn btn-error btn-sm rounded-xl font-bold"
              >
                Hapus
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`btn ${value ? "btn-outline" : "btn-primary"} rounded-xl font-bold flex-1 h-14`}
          >
            {uploading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : value ? (
              "Ganti Gambar"
            ) : (
              "📤 Unggah Gambar"
            )}
          </button>
        </div>

        <div className="relative">
           <input 
             type="text" 
             className="input input-bordered rounded-xl w-full text-xs bg-slate-50 border-slate-200" 
             placeholder="Atau masukkan URL gambar langsung..."
             value={value}
             onChange={(e) => onChange(e.target.value)}
           />
           <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">URL</span>
        </div>
      </div>
    </div>
  );
}
