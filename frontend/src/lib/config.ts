// src/lib/config.ts
export const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:4000";
