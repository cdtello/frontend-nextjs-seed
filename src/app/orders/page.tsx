"use client";
import { useEffect, useState } from "react";
import { ordersApi, productsApi, usersApi } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState({ status: "", userId: "" });
  const [form, setForm] = useState({ userId: "1000000001", productId: "", quantity: 1 });

  async function load() {
    const f: any = {};
    if (filter.status) f.status = filter.status;
    if (filter.userId) f.userId = filter.userId;
    const data = await ordersApi.list(f);
    setOrders(data);
  }
  async function loadRefs() {
    setUsers(await usersApi.list());
    setProducts(await productsApi.list());
    if (!form.productId) {
      const prods = await productsApi.list();
      if (prods[0]) setForm(s=>({ ...s, productId: prods[0].id }));
    }
  }
  useEffect(() => { load(); loadRefs(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await ordersApi.create({ userId: form.userId, items: [{ productId: form.productId, quantity: Number(form.quantity) }] });
    await load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders <span className="text-sm font-normal text-slate-500">/orders — User 1—N Order 1—N OrderItem N—1 Product</span></h1>

      <div className="rounded-2xl bg-white border p-4 flex flex-wrap gap-2">
        <select className="border rounded-full px-4 py-2 text-sm" value={filter.status} onChange={e=>setFilter({...filter, status:e.target.value})}>
          <option value="">status: todos</option><option>PENDING</option><option>PAID</option><option>CANCELLED</option>
        </select>
        <input className="border rounded-full px-4 py-2 text-sm" placeholder="userId" value={filter.userId} onChange={e=>setFilter({...filter, userId:e.target.value})} />
        <button onClick={load} className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm">Filtrar</button>
        <button onClick={()=>{ setFilter({status:"",userId:""}); setTimeout(load,0);}} className="px-4 py-2 rounded-full bg-white border text-sm">Limpiar</button>
        <a href="/orders" onClick={(e)=>{ e.preventDefault(); load(); }} className="ml-auto text-xs text-slate-500">GET /orders?status=&userId=</a>
      </div>

      <form onSubmit={create} className="rounded-2xl bg-white border p-4 grid md:grid-cols-4 gap-3">
        <select className="border rounded-xl px-3 py-2 text-sm" value={form.userId} onChange={e=>setForm({...form, userId:e.target.value})}>
          {users.map(u=> <option key={u.id} value={u.id}>{u.id} — {u.name}</option>)}
        </select>
        <select className="border rounded-xl px-3 py-2 text-sm" value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})}>
          {products.map(p=> <option key={p.id} value={p.id}>{p.name} — ${p.price} (stock {p.stock})</option>)}
        </select>
        <input className="border rounded-xl px-3 py-2 text-sm" type="number" min={1} value={form.quantity} onChange={e=>setForm({...form, quantity: Number(e.target.value)})} />
        <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold">Crear orden</button>
      </form>

      <div className="grid gap-3">
        {orders.map(o => (
          <div key={o.id} className="rounded-2xl bg-white border p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-500">{o.id.slice(0,8)}…</span>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${o.status==='PENDING'?'bg-amber-100 text-amber-700': o.status==='PAID'?'bg-emerald-100 text-emerald-700':'bg-slate-100 text-slate-600'}`}>{o.status}</span>
            </div>
            <div className="text-sm mt-1">User: <b>{o.user?.name || o.userId}</b> • Total: <b>${o.total}</b></div>
            <div className="text-xs text-slate-600 mt-1">{o.items?.map((it:any)=> `${it.product?.name || it.productId} x${it.quantity} @${it.unitPrice}`).join(' • ')}</div>
            <div className="flex gap-2 mt-3">
              <button onClick={async()=>{ await ordersApi.updateStatus(o.id, 'PAID'); await load(); }} className="text-xs px-3 py-1 rounded-full bg-emerald-600 text-white">Marcar PAID</button>
              <button onClick={async()=>{ await ordersApi.cancel(o.id); await load(); }} className="text-xs px-3 py-1 rounded-full bg-amber-600 text-white">Cancelar</button>
              <button onClick={async()=>{ await ordersApi.remove(o.id); await load(); }} className="text-xs px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700">Eliminar</button>
            </div>
          </div>
        ))}
        {orders.length===0 && <div className="text-sm text-slate-500 text-center py-8">No hay órdenes con ese filtro — crea una arriba</div>}
      </div>
    </div>
  );
}
