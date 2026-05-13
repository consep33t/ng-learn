"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Gambar",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<"idle" | "uploading" | "done">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation before sending
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diperbolehkan.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 5MB.`);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
        setProgress("done");
        setTimeout(() => setProgress("idle"), 2000);
      } else {
        setError(data.error || "Gagal mengunggah gambar. Coba lagi.");
        setProgress("idle");
      }
    } catch {
      setError("Koneksi gagal. Periksa internet Anda dan coba lagi.");
      setProgress("idle");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="form-control w-full space-y-3">
      <label className="label-text font-bold text-slate-700 text-[11px] uppercase tracking-wider px-1">
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-slate-100 group shadow-md">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/400x200?text=Gambar+Tidak+Valid";
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-sm bg-white text-slate-800 rounded-xl font-bold hover:bg-slate-100"
            >
              🔄 Ganti
            </button>
            <button
              type="button"
              onClick={() => { onChange(""); setError(null); }}
              className="btn btn-sm btn-error rounded-xl font-bold"
            >
              🗑️ Hapus
            </button>
          </div>
          {/* Status badge */}
          {progress === "done" && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
              ✓ Berhasil Diunggah
            </div>
          )}
        </div>
      )}

      {/* Upload button */}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        ref={fileInputRef}
        onChange={handleUpload}
      />

      {!value && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-pointer font-bold text-slate-400 hover:text-indigo-500"
        >
          {uploading ? (
            <>
              <span className="loading loading-spinner loading-md text-indigo-500" />
              <span className="text-sm text-indigo-500">Menggunggah...</span>
            </>
          ) : (
            <>
              <span className="text-3xl">📤</span>
              <span className="text-sm">Klik untuk unggah gambar</span>
              <span className="text-[10px] text-slate-400 font-normal">JPG, PNG, WebP • Maks. 5MB</span>
            </>
          )}
        </button>
      )}

      {/* Uploading state overlay for existing image */}
      {uploading && value && (
        <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
          <span className="loading loading-spinner loading-sm text-indigo-600" />
          <span className="text-sm font-bold text-indigo-600">Menggunggah gambar baru...</span>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl">
          <span className="text-rose-500 mt-0.5 shrink-0">⚠️</span>
          <p className="text-sm font-bold text-rose-600">{error}</p>
        </div>
      )}

      {/* Manual URL input */}
      <div className="relative">
        <input
          type="text"
          className="input input-bordered rounded-xl w-full text-xs bg-slate-50 border-slate-200 pr-14 h-12"
          placeholder="Atau masukkan URL gambar langsung..."
          value={value}
          onChange={(e) => { onChange(e.target.value); setError(null); }}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
          URL
        </span>
      </div>
    </div>
  );
}
