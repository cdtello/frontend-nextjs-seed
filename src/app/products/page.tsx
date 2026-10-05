"use client";
import { useEffect, useState } from "react";
import { productsService } from "@/modules/products/services/productsService";
import type { Product } from "@/types/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ name: "", minPrice: "", maxPrice: "" });
  const [form, setForm] = useState({ name: "", description: "", price: 99, stock: 10 });

  async function load() {
    const f: Record<string, string | number> = {};
    if (filter.name) f.name = filter.name;
    if (filter.minPrice) f.minPrice = Number(filter.minPrice);
    if (filter.maxPrice) f.maxPrice = Number(filter.maxPrice);
    const data = await productsService.getAll(f);
    setProducts(data);
  }
  // eslint-disable-next-line
  useEffect(() => { void load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await productsService.create({ ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm({ name: "", description: "", price: 99, stock: 10 });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-[1px]">
        <div className="rounded-[23px] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <p className="text-sm text-slate-500">CRUD + filtros Like/Between • {products.length} activos</p>
            </div>
            <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">Stock total: {products.reduce((a,p)=>a+p.stock,0)}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-50 border">
            <input className="flex-1 min-w-[160px] border rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="🔍 name? whey" value={filter.name} onChange={e=>setFilter({...filter, name:e.target.value})} />
            <input className="border rounded-full px-4 py-2.5 text-sm w-28 bg-white" type="number" placeholder="minPrice" value={filter.minPrice} onChange={e=>setFilter({...filter, minPrice:e.target.value})} />
            <input className="border rounded-full px-4 py-2.5 text-sm w-28 bg-white" type="number" placeholder="maxPrice" value={filter.maxPrice} onChange={e=>setFilter({...filter, maxPrice:e.target.value})} />
            <button onClick={load} className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold">Filtrar</button>
            <button onClick={()=>{ setFilter({name:"",minPrice:"",maxPrice:""}); setTimeout(load,0);}} className="px-4 py-2.5 rounded-full bg-white border text-sm">Limpiar</button>
          </div>

          <form onSubmit={create} className="mt-4 grid md:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border">
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="Nombre 2-120" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white" placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} required />
            <input className="border rounded-xl px-3 py-2.5 text-sm bg-white" type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock: Number(e.target.value)})} required />
            <button className="md:col-span-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow hover:opacity-90">+ Crear producto</button>
          </form>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="group relative overflow-hidden rounded-[20px] bg-white border shadow-sm hover:shadow-lg transition">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600" />
            <div className="p-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg">📦</div>
              <div className="font-semibold mt-3 leading-tight">{p.name}</div>
              <div className="text-xs font-mono text-slate-400 truncate">{p.id.slice(0,8)}…</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold">${Number(p.price).toFixed(2)}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${p.stock>20?'bg-emerald-50 text-emerald-700 border border-emerald-200': p.stock>5?'bg-amber-50 text-amber-700 border border-amber-200':'bg-red-50 text-red-700 border border-red-200'}`}>stock {p.stock}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 line-clamp-2 h-8">{p.description || "Sin descripción"}</div>
              <button onClick={async()=>{ if(confirm(`Eliminar ${p.name}?`)){ await productsService.delete(p.id); await load(); } }} className="mt-4 w-full py-2 rounded-full bg-white border text-xs font-semibold group-hover:bg-slate-900 group-hover:text-white transition">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      {products.length===0 && <div className="text-center py-12 rounded-2xl bg-white border border-dashed"><p className="text-sm text-slate-500">No hay productos con ese filtro</p></div>}
    </div>
  );
}
