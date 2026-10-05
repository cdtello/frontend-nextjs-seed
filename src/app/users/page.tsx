"use client";
import { useEffect, useState } from "react";
import { usersApi } from "@/lib/api";

/**
 * Página Users — CRUD didáctico simple con fetch
 * Usa usersApi.* que hace fetch a NEXT_PUBLIC_API_URL
 */
export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ id: "", name: "", email: "", age: 20, phone: "" });

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const data = await usersApi.list();
      setUsers(data);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    try {
      await usersApi.create({ ...form, age: Number(form.age) });
      setForm({ id: "", name: "", email: "", age: 20, phone: "" });
      await load();
    } catch (e: any) { alert(e.message); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users <span className="text-sm font-normal text-slate-500">/users — soft delete</span></h1>
        <button onClick={load} className="px-4 py-1.5 rounded-full bg-white border text-sm">Recargar</button>
      </div>

      <form onSubmit={create} className="rounded-2xl bg-white border p-4 grid md:grid-cols-5 gap-3">
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="id 5-20 dígitos" value={form.id} onChange={e=>setForm({...form, id:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2 text-sm" type="number" placeholder="age" value={form.age} onChange={e=>setForm({...form, age: Number(e.target.value)})} required />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="phone +573..." value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
        <button className="md:col-span-5 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold">Crear usuario</button>
      </form>

      {loading && <div className="text-sm text-slate-500">Cargando...</div>}
      {err && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{err} — ¿Está corriendo el backend en {process.env.NEXT_PUBLIC_API_URL}?</div>}

      <div className="grid md:grid-cols-2 gap-3">
        {users.map(u => (
          <div key={u.id} className="rounded-2xl bg-white border p-4">
            <div className="font-mono text-xs text-slate-500">{u.id}</div>
            <div className="font-semibold">{u.name} <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">active</span></div>
            <div className="text-sm text-slate-600">{u.email} • {u.age} • {u.phone}</div>
            <button onClick={async()=>{ await usersApi.remove(u.id); await load(); }} className="mt-2 text-xs px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700">Desactivar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
