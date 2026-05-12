"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const floatingEmojis = [
  { emoji: "📚", delay: 0, x: "10%", duration: 6 },
  { emoji: "✏️", delay: 1, x: "20%", duration: 8 },
  { emoji: "🔢", delay: 2, x: "70%", duration: 7 },
  { emoji: "🎯", delay: 0.5, x: "85%", duration: 5 },
  { emoji: "⭐", delay: 1.5, x: "45%", duration: 9 },
  { emoji: "🚀", delay: 3, x: "60%", duration: 6 },
  { emoji: "💡", delay: 2.5, x: "30%", duration: 7 },
];

export default function HeroSection({ settings, slides }: { settings: any; slides: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // If there are slides, we could animate them. For now, let's use the first one or settings.
  const displaySlide = slides?.[0] || {
    title: settings?.hero_title || "Belajar Itu Seru! 🚀",
    subtitle: settings?.hero_subtitle || "Les privat terbaik untuk SD sampai SMA. Raih prestasi terbaikmu bersama tutor berpengalaman!",
    cta_text: "🎯 Daftar Sekarang - GRATIS!",
    cta_link: "#contact"
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create bubbles
    const bubbles = Array.from({ length: 12 }, (_, i) => {
      const bubble = document.createElement("div");
      const size = Math.random() * 60 + 20;
      bubble.className = "bubble";
      bubble.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -${size}px;
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${i * 0.8}s;
      `;
      container.appendChild(bubble);
      return bubble;
    });

    return () => bubbles.forEach((b) => b.remove());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: displaySlide.image_url 
          ? `linear-gradient(rgba(14, 165, 233, 0.8), rgba(29, 78, 216, 0.8)), url(${displaySlide.image_url}) center/cover`
          : "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 40%, #7dd3fc 70%, #bae6fd 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full" />

      {/* Floating emojis */}
      {floatingEmojis.map((item, i) => (
        <div
          key={i}
          className="absolute text-4xl select-none pointer-events-none"
          style={{
            left: item.x,
            top: `${Math.random() * 60 + 10}%`,
            animation: `float ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            opacity: 0.7,
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute text-yellow-300 select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 16 + 8}px`,
            animation: `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ⭐
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center py-32">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8"
          style={{ animation: "slideUp 0.6s ease-out" }}
        >
          <span className="text-2xl">🎓</span>
          <span className="text-white font-bold text-sm tracking-wide">
            #1 Les Privat untuk SD - SMA
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight whitespace-pre-line"
          style={{ animation: "slideUp 0.8s ease-out 0.2s both" }}
        >
          {displaySlide.title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/90 text-xl md:text-2xl font-semibold max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: "slideUp 0.8s ease-out 0.4s both" }}
        >
          {displaySlide.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ animation: "slideUp 0.8s ease-out 0.6s both" }}
        >
          <Link
            href={displaySlide.cta_link}
            className="btn btn-warning btn-lg rounded-full shadow-xl shadow-yellow-300/30 hover:scale-105 transition-transform duration-200 font-black text-lg gap-2"
          >
            {displaySlide.cta_text}
          </Link>
          <Link
            href="#programs"
            className="btn btn-ghost btn-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-sky-500 transition-all duration-200 font-bold text-lg"
          >
            Lihat Program →
          </Link>
        </div>

        {/* Quick stats */}
        <div
          className="flex flex-wrap gap-8 justify-center mt-16"
          style={{ animation: "slideUp 0.8s ease-out 0.8s both" }}
        >
          {[
            { icon: "👨‍🎓", value: "500+", label: "Siswa Aktif" },
            { icon: "⭐", value: "4.9/5", label: "Rating Rata-rata" },
            { icon: "📚", value: "6+", label: "Mata Pelajaran" },
            { icon: "🏆", value: "95%", label: "Nilai Naik" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 text-center"
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-white font-display text-2xl">{stat.value}</div>
              <div className="text-white/80 text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#f0f9ff"
          />
        </svg>
      </div>
    </section>
  );
}
