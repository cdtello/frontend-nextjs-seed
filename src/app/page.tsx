import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero - Apple glass */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-8 md:p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full blur-[80px] opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-cyan-400 to-emerald-600 rounded-full blur-[80px] opacity-20" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-widest uppercase backdrop-blur">Nuevo • Seed 2025</div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-4 leading-[0.95]">Tu tienda.<br /><span className="font-light bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Lista para vender.</span></h1>
          <p className="text-white/70 mt-4 max-w-2xl">Frontend Next.js + Tailwind Glass conectado a tu backend NestJS. Mismos módulos que en clase: Clientes, Productos y Pedidos con filtros y transacciones.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/products" className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition">Explorar tienda →</Link>
            <Link href="/orders" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur text-white font-medium hover:bg-white/15">Ver pedidos</Link>
            <span className="inline-flex items-center px-4 py-3 rounded-full bg-white/10 border border-white/10 text-xs font-mono">API {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}</span>
          </div>
        </div>
      </div>

      {/* Categorías como tienda real */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/users" className="group relative overflow-hidden rounded-[24px] bg-white border p-6 hover:shadow-lg transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">👥</div>
            <h3 className="font-semibold mt-3">Clientes</h3>
            <p className="text-sm text-slate-500">Gestiona tus clientes • soft delete</p>
            <span className="inline-flex mt-3 text-sm font-medium text-blue-600">Entrar →</span>
          </div>
        </Link>
        <Link href="/products" className="group relative overflow-hidden rounded-[24px] bg-white border p-6 hover:shadow-lg transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">🛍️</div>
            <h3 className="font-semibold mt-3">Tienda</h3>
            <p className="text-sm text-slate-500">Catálogo con filtros Like/Between</p>
            <span className="inline-flex mt-3 text-sm font-medium text-emerald-600">Comprar →</span>
          </div>
        </Link>
        <Link href="/orders" className="group relative overflow-hidden rounded-[24px] bg-white border p-6 hover:shadow-lg transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-110 transition" />
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center">🧾</div>
            <h3 className="font-semibold mt-3">Pedidos</h3>
            <p className="text-sm text-slate-500">Transacción con stock y filtros</p>
            <span className="inline-flex mt-3 text-sm font-medium text-violet-600">Ver pedidos →</span>
          </div>
        </Link>
      </div>

      <div className="rounded-2xl bg-white border p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <span className="text-slate-600">¿Backend local? <span className="font-mono bg-slate-100 border px-2 py-1 rounded">NEXT_PUBLIC_API_URL=http://localhost:3000</span></span>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Glass • Tailwind • Listo para Vercel</span>
      </div>
    </div>
  );
}
