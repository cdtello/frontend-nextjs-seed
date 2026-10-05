# Frontend Next.js Seed — Tailwind

Seed Next.js 16 App Router + TypeScript + Tailwind, espejo del `backend-nestjs-seed`. Consume el backend NestJS vía `NEXT_PUBLIC_API_URL`.

> **Env local:** `NEXT_PUBLIC_API_URL=http://localhost:3000` (ver `.env.example`). Para Vercel cambia a tu EC2/RDS o backend desplegado.

## Stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS 4
- `fetch` nativo (sin librerías raras) — didáctico

## Estructura

```
src/app/
  layout.tsx              # header glass + nav Users/Products/Orders
  page.tsx                # home con links y API_URL
  users/page.tsx          # CRUD Users (usa lib/api.ts)
  products/page.tsx       # CRUD + filtros ?name, ?minPrice
  orders/page.tsx         # tienda con relaciones + filtros ?status&userId
src/lib/api.ts            # fetch wrappers con API_URL + params
```

## Env

```bash
cp .env.example .env
# .env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

En Vercel: Project → Settings → Environment Variables → `NEXT_PUBLIC_API_URL=https://tu-backend.com`

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000 (frontend)
# en otra terminal, backend
cd ../backend-nestjs-seed && npm run start:dev # http://localhost:3000 (backend) → si coinciden puertos, cambia frontend a 3001: PORT=3001 npm run dev
```

Asegúrate de tener el backend corriendo en `NEXT_PUBLIC_API_URL`.

## Páginas

- `/` — home con links
- `/users` — crear/listar/desactivar
- `/products` — crear/listar/filtrar por nombre/precio/stock
- `/orders` — crear orden (elige user/product), listar, filtrar por status/userId, cambiar a PAID/cancelar

Todo usa `src/lib/api.ts` con `fetch` y `cache: no-store`.

## Deploy Vercel (1 click)

1. Push a GitHub (ver abajo)
2. Vercel → New Project → Import `frontend-nextjs-seed` → añade `NEXT_PUBLIC_API_URL` → Deploy

## GitHub

```bash
git remote -v
# si es el seed, cámbialo a tu repo:
git remote set-url origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```
