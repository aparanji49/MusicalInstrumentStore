const rows = [
  { left: "🎵 Authentic Instruments", right: "Only trusted brands and genuine products." },
  { left: "🚚 Free Shipping", right: "Fast, reliable delivery on all orders." },
  { left: "🔄 Easy Returns", right: "Hassle-free 30-day return policy." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-neutral-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <h4 className="mb-4 text-lg font-semibold">Why Choose Us?</h4>
        <div className="space-y-3">
          {rows.map(r => (
            <div key={r.left}
                 className="flex items-center justify-between rounded-lg border border-black/10 bg-white px-4 py-3">
              <div className="font-medium">{r.left}</div>
              <div className="text-sm opacity-70">{r.right}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
