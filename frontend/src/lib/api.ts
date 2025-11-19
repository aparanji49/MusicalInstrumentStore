// const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
// export async function fetchJSON<T>(path: string) {
//   const res = await fetch(`${API}${path}`);
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   return (await res.json()) as T;
// }
const API = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export async function fetchGraphQL<T>(query: string, variables?: Record<string, any>) {
  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data as T;
}
