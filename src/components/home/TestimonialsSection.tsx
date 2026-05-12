"use client";

export default function TestimonialsSection({ data }: { data: any[] }) {
  const testimonials = data || [];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="badge badge-accent badge-lg mb-4 font-bold">
            💬 Testimoni
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-neutral mb-4">
            Apa Kata <span className="gradient-text">Mereka?</span>
          </h2>
          <p className="text-neutral/60 max-w-xl mx-auto text-lg">
            Kisah sukses dari siswa dan orang tua yang telah bergabung dengan
            NG.LEARN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testi, i) => (
            <div
              key={testi.id || i}
              className="card bg-white shadow-xl shadow-sky-100/50 border border-sky-50 card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="card-body p-8">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {Array.from({ length: testi.rating || 5 }).map((_, j) => (
                    <span key={j}>⭐</span>
                  ))}
                </div>
                <p className="text-neutral/70 italic leading-relaxed mb-6">
                  "{testi.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={testi.avatar_url || `https://i.pravatar.cc/150?u=${testi.student_name}`}
                        alt={testi.student_name}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-lg text-neutral leading-tight">
                      {testi.student_name}
                    </p>
                    <p className="text-primary text-xs font-bold uppercase tracking-wider">
                      {testi.student_grade}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
