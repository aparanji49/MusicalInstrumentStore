// frontend/src/pages/MuseBotPage.tsx
import { useState } from "react";
import { Bot, Package } from "lucide-react";
import MuseBotNotice from "../components/MuseBotNotice";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
type BundleItem = {
  name: string;
  description: string;
};

type BundleResult = {
  items: BundleItem[];
  notes: string;
};
export default function MuseBotPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string }[]
  >([]);

  const [bundleInput, setBundleInput] = useState("");
  const [bundleResult, setBundleResult] = useState<BundleResult | null>(null);
  const [loadingBundle, setLoadingBundle] = useState(false);

  const sendChat = async () => {
    if (!chatInput.trim()) return;

    const userMsg = { role: "user", text: chatInput };
    setChatHistory((old) => [...old, userMsg]);

    const res = await fetch(`${API_BASE_URL}/api/musebot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: chatInput }),
    });

    const data = await res.json();
    const botMsg = { role: "bot", text: data.answer };

    setChatHistory((old) => [...old, botMsg]);
    setChatInput("");
  };

  const generateBundle = async () => {
    if (!bundleInput.trim()) return;

    setLoadingBundle(true);
    setBundleResult(null);

    const res = await fetch(`${API_BASE_URL}/api/musebot/bundle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: bundleInput }),
    });

    const data = (await res.json()) as { bundle: BundleResult };
    setBundleResult(data.bundle);
    setLoadingBundle(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 flex justify-center">
     
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Bot size={30} className="text-primary" />
          <h1 className="text-3xl font-bold">
            MuseBot – Your AI Music Assistant
          </h1>
        </div>
        <MuseBotNotice />
        {/* CHAT SECTION */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2">Ask MuseBot</h2>
          <p className="text-sm text-slate-600 mb-4">
            Ask anything about instruments, learning music, or studio gear.
          </p>

          <div className="border rounded-xl p-4 bg-slate-50 h-64 overflow-y-auto mb-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-black text-white ml-auto w-fit"
                    : "bg-slate-200 text-slate-800 mr-auto w-fit"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border rounded-lg bg-white border-black/50"
            />
            <button
              onClick={sendChat}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>

        {/* BUNDLE SECTION */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <Package size={20} />
            AI Bundle Generator
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Describe what you need, and MuseBot will build a personalized kit.
          </p>

          <input
            value={bundleInput}
            onChange={(e) => setBundleInput(e.target.value)}
            placeholder="Example: I want to start producing EDM at home."
            className="w-full px-3 py-2 border rounded-lg mb-3 bg-white border-black/50"
          />

          <button
            onClick={generateBundle}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {loadingBundle ? "Building..." : "Generate Bundle"}
          </button>

          {bundleResult && (
            <div className="mt-6 bg-slate-50 border rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-3">
                Your Personalized Bundle
              </h3>

              {bundleResult.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg shadow-sm mb-3"
                >
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}

              {bundleResult.notes && (
                <p className="text-sm text-slate-600 mt-2">
                  {bundleResult.notes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
