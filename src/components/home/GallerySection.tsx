"use client";

import { useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

const categories = ["Semua", "umum", "kegiatan", "fasilitas"];

export default function GallerySection({ data }: { data: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  if (!data || data.length === 0) return null;

  const filtered = activeCategory === "Semua"
    ? data
    : data.filter((item) => item.category === activeCategory);

  const availableCategories = categories.filter(
    (c) => c === "Semua" || data.some((item) => item.category === c)
  );

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge badge-primary badge-lg mb-4 font-bold">🖼️ Galeri</div>
          <h2 className="font-display text-4xl md:text-5xl text-neutral mb-4">
            Dokumentasi <span className="gradient-text">Kegiatan Belajar</span>
          </h2>
          <p className="text-neutral/60 text-lg max-w-xl mx-auto">
            Momen seru belajar bersama tutor terbaik NG.LEARN
          </p>
        </div>

        {/* Category Filter */}
        {availableCategories.length > 2 && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm rounded-full font-bold capitalize transition-all ${
                  activeCategory === cat
                    ? "btn-primary shadow-lg shadow-sky-200"
                    : "btn-ghost border border-slate-200 hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className="aspect-square relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Foto";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-bold text-sm truncate">
                  {item.title || "Dokumentasi Kegiatan"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-red-400 transition-colors"
              >
                ✕
              </button>
              <img
                src={lightbox.image_url}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              {lightbox.title && (
                <p className="text-white text-center font-bold mt-4 text-lg">
                  {lightbox.title}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
