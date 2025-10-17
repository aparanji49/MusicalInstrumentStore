const fake = Array.from({ length: 5 }).map((_, i) => ({
  name: "Sarah",
  text: "Loved the build quality and tone. Fast delivery too!",
  id: i
}));

export default function Testimonials() {
  return (
    <section className="bg-neutral-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-4 italic opacity-80">Hear from our customers</p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {fake.map(t => (
            <div key={t.id} className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">{t.name}</span>
                <span className="h-3 w-3 rounded-full bg-neutral-200" />
              </div>
              <p className="text-sm opacity-80">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
