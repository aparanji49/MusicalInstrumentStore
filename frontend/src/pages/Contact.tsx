import { useState } from "react";
// import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    alert("Thank you! We’ll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-6xl grid gap-12 px-4 md:grid-cols-2">
        {/* Left: Form */}
        <div>
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mb-10 text-gray-600">
            Have a question or feedback? Fill out the form below and we’ll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="bg-white w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="bg-white w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
              />
            </div>

            <button
              type="submit"
              className="rounded-md bg-yellow-500 px-6 py-2 text-sm font-semibold text-white shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="rounded-xl bg-gray-50 p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            You can also reach us through the following channels:
          </p>

          <ul className="space-y-4 text-gray-700">
            <li>
              <span className="font-medium">Address:</span> 123 Harmony Street, Music City, NY
            </li>
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a href="mailto:support@musemart.com" className="text-yellow-600 hover:underline">
                support@musemart.com
              </a>
            </li>
            <li>
             <span className="font-medium">Phone:</span> +1 (555) 123-4567
            </li>
          </ul>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Follow Us</h3>
            <div className="flex gap-4 text-gray-500">
            <a href="#" aria-label="Facebook" className="hover:opacity-70"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter" className="hover:opacity-70"><TwitterIcon /></a>
            <a href="#" aria-label="Instagram" className="hover:opacity-70"><InstagramIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
