"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: "👨‍🎓", value: 500, suffix: "+", label: "Siswa Aktif", color: "text-sky-500" },
  { icon: "👩‍🏫", value: 30, suffix: "+", label: "Tutor Berpengalaman", color: "text-purple-500" },
  { icon: "📚", value: 6, suffix: "", label: "Mata Pelajaran", color: "text-emerald-500" },
  { icon: "🏆", value: 95, suffix: "%", label: "Siswa Nilai Naik", color: "text-amber-500" },
  { icon: "⭐", value: 4.9, suffix: "/5", label: "Rating Kepuasan", color: "text-orange-500" },
  { icon: "📅", value: 3, suffix: " tahun", label: "Pengalaman Mengajar", color: "text-rose-500" },
];

function CounterItem({ stat, inView }: { stat: (typeof stats)[0]; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const end = stat.value;
    const duration = 1500;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, stat.value]);

  const display =
    stat.value % 1 !== 0
      ? count.toFixed(1)
      : Math.floor(count).toLocaleString();

  return (
    <div className="card bg-white shadow-lg shadow-sky-100 border border-sky-100 card-hover shine-card">
      <div className="card-body items-center text-center p-8">
        <div className="text-5xl mb-3 animate-bounce-slow">{stat.icon}</div>
        <div className={`font-display text-4xl ${stat.color}`}>
          {display}
          {stat.suffix}
        </div>
        <p className="text-neutral/70 font-semibold mt-1">{stat.label}</p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-sky-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge badge-primary badge-lg mb-4 font-bold">📊 Statistik</div>
          <h2 className="font-display text-4xl md:text-5xl text-neutral mb-4">
            NG.LEARN dalam{" "}
            <span className="gradient-text">Angka</span>
          </h2>
          <p className="text-neutral/60 max-w-xl mx-auto text-lg">
            Kepercayaan ribuan siswa dan orang tua adalah motivasi terbesar kami.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat) => (
            <CounterItem key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
