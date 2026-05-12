"use client";

export default function FaqSection({ data }: { data: any[] }) {
  const faqs = data || [];

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-primary badge-lg mb-4 font-bold">
              ❓ FAQ
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-neutral mb-4">
              Punya <span className="gradient-text">Pertanyaan?</span>
            </h2>
            <p className="text-neutral/60 text-lg">
              Temukan jawaban dari pertanyaan yang paling sering diajukan
              mengenai layanan kami.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={faq.id || i}
                className="collapse collapse-plus bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <input type="checkbox" className="peer" />
                <div className="collapse-title text-lg font-bold text-neutral pr-12">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-neutral/60 leading-relaxed pt-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-sky-50 rounded-3xl border border-sky-100">
            <p className="text-neutral mb-4 font-semibold">
              Masih punya pertanyaan lainnya?
            </p>
            <a href="#contact" className="btn btn-primary rounded-full px-8">
              Hubungi Kami Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
