# fireplace-site-frontend

Next.js (App Router) frontend.

## Запуск

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL, default: local backend
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000).

## Deploy

Deployed to [Vercel](https://vercel.com) from `main`. Required variable: `NEXT_PUBLIC_API_URL` (backend URL with `/api`). It is inlined at build time, so redeploy after changing it. CI runs in GitHub Actions (`.github/workflows/ci.yml`).
