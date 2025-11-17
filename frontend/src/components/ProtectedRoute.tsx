// src/components/ProtectedRoute.tsx
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE } from "../lib/config";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [status, setStatus] = useState<"checking" | "authed" | "guest">("checking");

  useEffect(() => {
    fetch(`${API_BASE}/api/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => setStatus(me ? "authed" : "guest"))
      .catch(() => setStatus("guest"));
  }, []);

  if (status === "checking") return null; // or a spinner
  return status === "authed" ? children : <Navigate to="/login" replace />;
}
