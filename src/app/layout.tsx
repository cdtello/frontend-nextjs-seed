import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tienda Seed — Frontend Next.js",
  description: "Tienda con Next.js + Tailwind Glass — Backend NestJS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-[#f5f5f7] text-slate-900 antialiased">
        {/* Apple glass header */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-white flex items-center justify-center">◈</span>
              <span className="font-semibold tracking-tight">Tienda<span className="font-light text-slate-500">Seed</span></span>
              <span className="hidden md:inline-flex ml-2 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold tracking-widest">GLASS</span>
            </Link>
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="w-full relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                <input placeholder="Buscar productos, marcas..." className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-100 border border-transparent focus:bg-white focus:border-slate-200 focus:outline-none text-sm" />
              </div>
            </div>
            <nav className="flex items-center gap-1.5">
              <Link href="/users" className="px-4 py-2 rounded-full bg-white border border-black/10 text-sm font-medium hover:bg-slate-50">Clientes</Link>
              <Link href="/products" className="px-4 py-2 rounded-full bg-white border border-black/10 text-sm font-medium hover:bg-slate-50">Tienda</Link>
              <Link href="/orders" className="relative px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-black">
                Pedidos
                <span className="ml-2 inline-flex w-5 h-5 rounded-full bg-white text-slate-900 text-xs items-center justify-center font-bold">3</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8">{children}</main>
        <footer className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 border-t border-black/5 pt-6">
            <span>© Tienda Seed — Next.js + Tailwind Glass • Backend NestJS en <span className="font-mono bg-white border px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}</span></span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Apple glass • Hecho para clase</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
