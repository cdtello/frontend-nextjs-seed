"use client";
import { useEffect, useState } from "react";
import { ordersService } from "@/modules/orders/services/ordersService";
import { productsService } from "@/modules/products/services/productsService";
import { usersService } from "@/modules/users/services/usersService";
import type { Order, Product, User, OrderItem } from "@/types/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ status: "", userId: "" });
  const [form, setForm] = useState({ userId: "1000000001", productId: "", quantity: 1 });

  async function load() {
    const f: Record<string, string> = {};
    if (filter.status) f.status = filter.status;
    if (filter.userId) f.userId = filter.userId;
    const data = await ordersService.getAll(f);
    setOrders(data);
  }
  async function loadRefs() {
    setUsers(await usersService.getAll());
    setProducts(await productsService.getAll());
    if (!form.productId) {
      const prods = await productsService.getAll();
      if (prods[0]) setForm(s=>({ ...s, productId: prods[0].id }));
    }
  }
  // eslint-disable-next-line
  useEffect(() => { void load(); void loadRefs(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await ordersService.create({ userId: form.userId, items: [{ productId: form.productId, quantity: Number(form.quantity) }] });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-[1px]">
        <div className="rounded-[23px] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
              <p className="text-sm text-slate-500">Tienda • User 1—N Order 1—N OrderItem N—1 Product • {orders.length} órdenes</p>
            </div>
            <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700">Transacción con Repository</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
            <select className="border rounded-full px-4 py-2.5 text-sm bg-white" value={filter.status} onChange={e=>setFilter({...filter, status:e.target.value})}>
              <option value="">status: todos</option><option>PENDING</option><option>PAID</option><option>CANCELLED</option>
            </select>
            <input className="border rounded-full px-4 py-2.5 text-sm bg-white flex-1 min-w-[160px]" placeholder="userId 1000000001" value={filter.userId} onChange={e=>setFilter({...filter, userId:e.target.value})} />
            <button onClick={load} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
            <button onClick={()=>{ setFilter({status:"",userId:""}); setTimeout(load,0);}} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
          </div>

          <form onSubmit={create} className="mt-4 grid md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border">
            <select className="border rounded-xl px-3 py-2.5 text-sm bg-white" value={form.userId} onChange={e=>setForm({...form, userId:e.target.value})}>
              {users.map(u=> <option key={u.id} value={u.id}>{u.id} — {u.name}</option>)}
            </select>
            <select className="border rounded-xl px-3 py-2.5 text-sm bg-white" value={form.productId} onChange={e=>setForm({...form, productId:e.target.value})}>
              {products.map(p=> <option key={p.id} value={p.id}>{p.name} — ${p.price} (stock {p.stock})</option>)}
            </select>
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white" type="number" min={1} value={form.quantity} onChange={e=>setForm({...form, quantity: Number(e.target.value)})} />
            <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow">+ Crear orden</button>
          </form>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map(o => (
          <div key={o.id} className="group relative overflow-hidden rounded-[20px] bg-white border shadow-sm hover:shadow-md transition">
            <div className={`h-1.5 ${o.status==='PENDING'?'bg-gradient-to-r from-amber-500 to-orange-600': o.status==='PAID'?'bg-gradient-to-r from-emerald-500 to-teal-600':'bg-gradient-to-r from-slate-400 to-slate-600'}`} />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">{o.id.slice(0,8)}… • {new Date(o.createdAt).toLocaleDateString()}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-bold border ${o.status==='PENDING'?'bg-amber-50 text-amber-700 border-amber-200': o.status==='PAID'?'bg-emerald-50 text-emerald-700 border-emerald-200':'bg-slate-100 text-slate-600 border-slate-200'}`}>{o.status}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold">{o.user?.name?.charAt(0) || "?"}</div>
                <div>
                  <div className="font-semibold leading-tight">{o.user?.name || o.userId}</div>
                  <div className="text-xs text-slate-500">{o.user?.email || o.userId} • Total <b className="text-slate-900">${Number(o.total).toFixed(2)}</b></div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {o.items?.map((it: OrderItem)=> (
                  <span key={it.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border text-xs">
                    <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-[10px]">📦</span>
                    {it.product?.name || it.productId} <b>x{it.quantity}</b> <span className="text-slate-500">@${it.unitPrice}</span>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={async()=>{ await ordersService.updateStatus(o.id, 'PAID'); await load(); }} className="flex-1 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700">Marcar PAID</button>
                <button onClick={async()=>{ await ordersService.cancel(o.id); await load(); }} className="flex-1 py-2 rounded-full bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600">Cancelar</button>
                <button onClick={async()=>{ await ordersService.delete(o.id); await load(); }} className="flex-1 py-2 rounded-full bg-white border text-xs font-semibold hover:bg-slate-50">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
        {orders.length===0 && <div className="text-center py-12 rounded-2xl bg-white border border-dashed"><p className="text-sm text-slate-500">No hay órdenes con ese filtro — crea una arriba</p></div>}
      </div>
    </div>
  );
}
