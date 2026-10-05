/**
 * API helpers — consumo del backend NestJS
 * Env: NEXT_PUBLIC_API_URL (ver .env.example)
 * Todo con fetch nativo, sin librerías raras — didáctico simple.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type FetchOpts = RequestInit & { params?: Record<string, string | number | undefined> };

async function apiFetch(path: string, opts: FetchOpts = {}) {
  const { params, ...rest } = opts;
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString(), {
    ...rest,
    headers: { "Content-Type": "application/json", ...(rest.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText} — ${txt.slice(0,500)}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Users
export const usersApi = {
  list: () => apiFetch("/users"),
  get: (id: string) => apiFetch(`/users/${id}`),
  create: (data: any) => apiFetch("/users", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiFetch(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: string) => apiFetch(`/users/${id}`, { method: "DELETE" }),
};

// Products
export const productsApi = {
  list: (filter?: { name?: string; minPrice?: number; maxPrice?: number; minStock?: number; maxStock?: number }) =>
    apiFetch("/products", { params: filter as any }),
  get: (id: string) => apiFetch(`/products/${id}`),
  create: (data: any) => apiFetch("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiFetch(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id: string) => apiFetch(`/products/${id}`, { method: "DELETE" }),
};

// Orders
export const ordersApi = {
  list: (filter?: { status?: string; userId?: string }) => apiFetch("/orders", { params: filter as any }),
  get: (id: string) => apiFetch(`/orders/${id}`),
  listByUser: (userId: string) => apiFetch(`/orders/user/${userId}`),
  create: (data: any) => apiFetch("/orders", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id: string, status: string) => apiFetch(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
  cancel: (id: string) => apiFetch(`/orders/${id}/cancel`, { method: "PUT" }),
  remove: (id: string) => apiFetch(`/orders/${id}`, { method: "DELETE" }),
};

export { API_URL };
