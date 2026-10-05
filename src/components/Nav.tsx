"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/users", label: "Clientes" },
  { href: "/products", label: "Tienda" },
  { href: "/orders", label: "Pedidos" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1.5">
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
              active
                ? "bg-slate-900 text-white border-slate-900 shadow"
                : "bg-white border-black/10 hover:bg-slate-50"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
      <a
        href="https://github.com/cdtello/backend-nestjs-seed"
        target="_blank"
        className="hidden md:inline-flex px-4 py-2 rounded-full bg-white border border-black/10 text-sm font-medium hover:bg-slate-50"
      >
        Backend
      </a>
    </nav>
  );
}
