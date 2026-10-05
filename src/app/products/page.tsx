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
      <h1 className="text-2xl font-bold">Products <span className="text-sm font-normal text-slate-500">/products — filtros Like/Between</span></h1>

      <div className="rounded-2xl bg-white border p-4 flex flex-wrap gap-2">
        <input className="border rounded-full px-4 py-2 text-sm" placeholder="name? whey" value={filter.name} onChange={e=>setFilter({...filter, name:e.target.value})} />
        <input className="border rounded-full px-4 py-2 text-sm w-32" type="number" placeholder="minPrice" value={filter.minPrice} onChange={e=>setFilter({...filter, minPrice:e.target.value})} />
        <input className="border rounded-full px-4 py-2 text-sm w-32" type="number" placeholder="maxPrice" value={filter.maxPrice} onChange={e=>setFilter({...filter, maxPrice:e.target.value})} />
        <button onClick={load} className="px-5 py-2 rounded-full bg-slate-900 text-white text-sm">Filtrar</button>
        <button onClick={()=>{ setFilter({name:"",minPrice:"",maxPrice:""}); setTimeout(load,0);}} className="px-4 py-2 rounded-full bg-white border text-sm">Limpiar</button>
      </div>

      <form onSubmit={create} className="rounded-2xl bg-white border p-4 grid md:grid-cols-4 gap-3">
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="name 2-120" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className="border rounded-xl px-3 py-2 text-sm" type="number" step="0.01" placeholder="price" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} required />
        <input className="border rounded-xl px-3 py-2 text-sm" type="number" placeholder="stock" value={form.stock} onChange={e=>setForm({...form, stock: Number(e.target.value)})} required />
        <button className="md:col-span-4 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold">Crear producto</button>
      </form>

      <div className="grid md:grid-cols-3 gap-3">
        {products.map(p => (
          <div key={p.id} className="rounded-2xl bg-white border p-4">
            <div className="font-semibold">{p.name}</div>
            <div className="text-xs font-mono text-slate-500 truncate">{p.id}</div>
            <div className="text-sm mt-1">${p.price} • stock {p.stock}</div>
            <div className="text-xs text-slate-500">{p.description || "—"}</div>
            <button onClick={async()=>{ await productsService.delete(p.id); await load(); }} className="mt-2 text-xs px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
