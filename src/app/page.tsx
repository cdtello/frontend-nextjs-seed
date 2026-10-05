import { API_URL } from "@/lib/api";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-white border shadow-sm p-8">
        <div className="inline-flex px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-widest uppercase">Frontend Next.js Seed • Tailwind</div>
        <h1 className="text-3xl font-bold tracking-tight mt-3">Seed conectado a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">backend NestJS</span></h1>
        <p className="text-slate-600 mt-2">Next 16 App Router + TypeScript + Tailwind. Consume <span className="font-mono bg-slate-100 border px-2 py-1 rounded text-sm">{API_URL}</span> (ver <span className="font-mono bg-slate-100 border px-2 py-1 rounded">.env → NEXT_PUBLIC_API_URL</span>)</p>
        <div className="flex flex-wrap gap-3 mt-6">
          <a href="/users" className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold">Users CRUD →</a>
          <a href="/products" className="px-5 py-2.5 rounded-full bg-white border font-medium">Products + filtros</a>
          <a href="/orders" className="px-5 py-2.5 rounded-full bg-white border font-medium">Orders tienda</a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-500">Users</div>
          <div className="font-mono text-sm mt-2">GET /users</div>
          <div className="text-xs text-slate-500 mt-1">5 requests • soft delete</div>
        </div>
        <div className="rounded-2xl bg-white border p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-500">Products</div>
          <div className="font-mono text-sm mt-2">GET /products?name=whey</div>
          <div className="text-xs text-slate-500 mt-1">8 requests • Like/Between</div>
        </div>
        <div className="rounded-2xl bg-white border p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-500">Orders</div>
          <div className="font-mono text-sm mt-2">POST /orders</div>
          <div className="text-xs text-slate-500 mt-1">11 requests • OrderItem</div>
        </div>
      </div>

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm">
        <b>¿Backend local?</b> Asegúrate de tener <span className="font-mono bg-white border px-2 py-1 rounded">backend-nestjs-seed → npm run start:dev</span> en <span className="font-mono bg-white border px-2 py-1 rounded">{API_URL}</span> y que <span className="font-mono bg-white border px-2 py-1 rounded">NEXT_PUBLIC_API_URL</span> en <span className="font-mono bg-white border px-2 py-1 rounded">.env</span> apunte ahí. Para Vercel, cambia a tu EC2/RDS.
      </div>
    </div>
  );
}
