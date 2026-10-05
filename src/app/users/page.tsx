"use client";
import { useEffect, useState } from "react";
import { usersService } from "@/modules/users/services/usersService";
import type { User } from "@/types/api";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({ id: "", name: "", email: "", age: 20, phone: "" });

  async function load() {
    try {
      setLoading(true);
      setErr(null);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }
  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    try {
      await usersService.create({ ...form, age: Number(form.age) });
      setForm({ id: "", name: "", email: "", age: 20, phone: "" });
      await load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-[1px]">
        <div className="rounded-[23px] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Users</h1>
              <p className="text-sm text-slate-500">CRUD con validación y soft delete • {users.length} activos</p>
            </div>
            <button onClick={load} className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-black">Recargar</button>
          </div>
          <form onSubmit={create} className="mt-6 grid md:grid-cols-5 gap-3 p-4 rounded-2xl bg-slate-50 border">
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="ID 5-20 dígitos" value={form.id} onChange={e=>setForm({...form, id:e.target.value})} required />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Edad" value={form.age} onChange={e=>setForm({...form, age: Number(e.target.value)})} required />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tel +573..." value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
            <button className="md:col-span-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition">+ Crear usuario</button>
          </form>
        </div>
      </div>

      {loading && <div className="text-center py-8"><span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border text-sm text-slate-600">Cargando...</span></div>}
      {err && <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700">{err} — ¿Backend en {process.env.NEXT_PUBLIC_API_URL}?</div>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(u => (
          <div key={u.id} className="group relative overflow-hidden rounded-[20px] bg-white border shadow-sm hover:shadow-md transition">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Activo</span>
              </div>
              <div className="mt-3">
                <div className="font-semibold leading-tight">{u.name}</div>
                <div className="text-xs font-mono text-slate-500">{u.id}</div>
              </div>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-slate-600"><span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px]">✉️</span>{u.email}</div>
                <div className="flex items-center gap-2 text-slate-600"><span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px]">🎂</span>{u.age} años • {u.phone}</div>
              </div>
              <button onClick={async()=>{ if(confirm(`Desactivar a ${u.name}?`)){ await usersService.delete(u.id); await load(); } }} className="mt-4 w-full py-2 rounded-full bg-slate-900 text-white text-xs font-semibold group-hover:bg-black transition">Desactivar</button>
            </div>
          </div>
        ))}
      </div>
      {users.length===0 && !loading && <div className="text-center py-12 rounded-2xl bg-white border border-dashed"><p className="text-sm text-slate-500">No hay usuarios — crea uno arriba</p></div>}
    </div>
  );
}
