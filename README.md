# BrewHaus

A small coffee shop web app: browse beans and brewing gear, open a product page, and sign up or sign in.

**Live:** https://brew-haus-b-inky.vercel.app

## Stack

| Part | Tech | Hosted on |
|---|---|---|
| Frontend (`client/`) | React 19, Vite, Tailwind CSS 4, React Router | Vercel |
| Backend (`server/`) | Node.js, Express 5 | Railway |
| Database | PostgreSQL via Drizzle ORM | Neon |
| Auth | better-auth (email + password, cookie sessions) | — |

In production, Vercel rewrites `/api/*` to the Railway backend, so the browser only ever talks to one origin. In development, the Vite dev server proxies `/api` to `localhost:3000` the same way.

## Project structure

```
client/                 React frontend
  src/components/       Header, Hero, Shop, ProductCard, ProductDetail, Login, ...
  src/lib/              auth client and price formatting
  vercel.json           API rewrite + SPA fallback
server/                 Express API
  src/index.js          app setup, routes, error handling
  src/auth.js           better-auth config
  src/routes/           /api/products
  src/db/               schema, connection, seed data and seed script
  railway.json          deploy config
```

## API

| Method | Path | Returns |
|---|---|---|
| GET | `/api/products` | all products |
| GET | `/api/products/:slug` | one product with its `images`, or 404 |
| GET | `/api/health` | `{ ok: true, time }` |
| * | `/api/auth/*` | handled by better-auth (sign-up, sign-in, sign-out, session) |

Prices are stored as whole cents (`priceCents: 1850` = $18.50).

## Running locally

Requires Node 20+ and a Postgres database (a free [Neon](https://neon.tech) project works).

**1. Backend**

```bash
cd server
npm install
cp .env.example .env
```

Fill in `server/.env`:

- `DATABASE_URL`: your Neon pooled connection string
- `BETTER_AUTH_SECRET`: generate one with
  `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
- leave `BETTER_AUTH_URL`, `CLIENT_URL` and `PORT` as they are for local development

Then create the tables, add the products, and start the API:

```bash
npm run db:push
npm run db:seed
npm run dev
```

The API runs on http://localhost:3000.

**2. Frontend** (in a second terminal)

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

**server/**

- `npm run dev`: start the API, restarting on file changes
- `npm start`: start the API (production)
- `npm run db:push`: apply `src/db/schema.js` to the database
- `npm run db:seed`: insert products from `src/db/products.data.js` (safe to re-run)
- `npm run db:studio`: browse the database in the browser

**client/**

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: run ESLint

## Adding products

Add an entry to `server/src/db/products.data.js`, put its image in `client/public/images/products/`, and run `npm run db:seed`. Products whose `slug` already exists are skipped.

## Deployment

- **Railway** (root directory `server`) needs the variables `DATABASE_URL`, `BETTER_AUTH_SECRET`, `PORT=3000`, and `CLIENT_URL` and `BETTER_AUTH_URL`, both set to the Vercel URL. Paste values without quotes.
- **Vercel** (root directory `client`) needs no variables. If the Railway domain changes, update it in `client/vercel.json`.
