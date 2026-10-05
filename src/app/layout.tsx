import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Next.js Seed",
  description: "Seed Next.js + Tailwind + TypeScript conectado a backend NestJS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900 antialiased">
        <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold tracking-tight">
              Frontend <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Next.js Seed</span>
            </Link>
            <nav className="flex gap-2 text-sm">
              <Link href="/users" className="px-3 py-1.5 rounded-full bg-white border hover:bg-slate-50">Users</Link>
              <Link href="/products" className="px-3 py-1.5 rounded-full bg-white border hover:bg-slate-50">Products</Link>
              <Link href="/orders" className="px-3 py-1.5 rounded-full bg-white border hover:bg-slate-50">Orders</Link>
              <a href="https://github.com/cdtello/backend-nestjs-seed" target="_blank" className="px-3 py-1.5 rounded-full bg-slate-900 text-white">Backend</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto w-full px-4 py-8">{children}</main>
        <footer className="max-w-6xl mx-auto w-full px-4 py-6 text-xs text-slate-500 text-center">
          Env: <span className="font-mono bg-white border px-2 py-1 rounded">NEXT_PUBLIC_API_URL</span> = {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"} • Tailwind glass
        </footer>
      </body>
    </html>
  );
}
