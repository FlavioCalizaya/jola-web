# JOLA School — Institutional Website

A production-ready bilingual (English / Spanish) website for **JOLA School**, a
school in Cochabamba, Bolivia. Built with Next.js App Router, React, TypeScript,
Tailwind CSS, MySQL and Prisma.

The site follows the 21-section structure of the JOLA institutional brief, plus the
optional **“What makes JOLA, JOLA?”** section. English is the default language and
Spanish is available from the header language switcher on every page.

> **Important:** All photography, stories, testimonials, statistics and contact
> details currently on the site are **clearly labelled placeholders**. They must be
> replaced with approved institutional material before launch. See
> [Content that must be replaced](#content-that-must-be-replaced).

---

## Contents

- [Stack](#stack)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Database setup](#database-setup)
- [Running the project](#running-the-project)
- [Project structure](#project-structure)
- [Internationalisation](#internationalisation)
- [Visit request flow](#visit-request-flow)
- [Content, images and demo data](#content-images-and-demo-data)
- [SEO and accessibility](#seo-and-accessibility)
- [Security notes](#security-notes)
- [Deployment](#deployment)
- [Launch checklist](#launch-checklist)
- [Content that must be replaced](#content-that-must-be-replaced)

---

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Animation | Framer Motion (restrained scroll reveals) |
| Icons / type | Lucide React, `next/font` (Cormorant Garamond + Manrope) |
| i18n | `next-intl` 4 with `[locale]` routing |
| Database | MySQL 8 / MariaDB 10.6+ |
| ORM | Prisma 6 |
| Forms | React Hook Form + Zod (shared client/server schema) |
| Auth primitives | bcryptjs (password hashing) |

No Supabase, Firebase or other BaaS is used. All persistence is a standard MySQL
database accessed server-side through Prisma.

## Requirements

- Node.js **20.9+** (Node 22 LTS recommended)
- npm 10+
- MySQL 8.x or MariaDB 10.6+ (local, Docker, or managed)
- A Unix-like shell or PowerShell on Windows

This project uses `npm.cmd` on Windows PowerShell if script execution is restricted.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env        # Windows: copy .env.example .env

# 3. Create the database (see Database setup), then:
npm run db:migrate          # applies migrations (development)
npm run db:seed             # optional: labelled demo content + admin user

# 4. Start the dev server
npm run dev
```

Open <http://localhost:3000>. You will be redirected to `/en`. Spanish lives at
`/es`.

## Environment variables

Copy `.env.example` to `.env`. Never commit `.env`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | MySQL connection string, e.g. `mysql://user:pass@127.0.0.1:3306/jola_school` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public origin used for canonical URLs, sitemap, Open Graph and JSON-LD |
| `NEXT_PUBLIC_CONTACT_PHONE` | At launch | Public phone number |
| `NEXT_PUBLIC_CONTACT_EMAIL` | At launch | General contact email |
| `NEXT_PUBLIC_ADMISSIONS_EMAIL` | At launch | Admissions email |
| `NEXT_PUBLIC_CONTACT_ADDRESS_LINE` | At launch | Street address line |
| `NEXT_PUBLIC_MAP_URL` | Optional | Link to Google Maps / OpenStreetMap |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Official Instagram profile |
| `NEXT_PUBLIC_FACEBOOK_URL` | Optional | Official Facebook page |
| `NEXT_PUBLIC_YOUTUBE_URL` | Optional | Official YouTube channel |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional | Hero video path, e.g. `/videos/hero.mp4`; empty uses the hero image |
| `ADMIN_NAME` | Seed only | Display name for the initial admin user |
| `ADMIN_EMAIL` | Seed only | Login email for the initial admin user |
| `ADMIN_PASSWORD` | Seed only | Password (12+ chars); stored only as a bcrypt hash |
| `IP_HASH_SALT` | Yes in production | Salt used to hash request IPs for rate limiting |

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put
secrets in them. Contact and social values may be left blank: the UI renders an
honest "to be confirmed" state instead of inventing details.

## Database setup

### Option A — local MySQL / MariaDB

```sql
CREATE DATABASE jola_school CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'jola_user'@'localhost' IDENTIFIED BY 'change-me';
GRANT ALL PRIVILEGES ON jola_school.* TO 'jola_user'@'localhost';
FLUSH PRIVILEGES;
```

Then set:

```env
DATABASE_URL="mysql://jola_user:change-me@127.0.0.1:3306/jola_school"
```

### Option B — Docker

```bash
docker run --name jola-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=jola_school \
  -e MYSQL_USER=jola_user \
  -e MYSQL_PASSWORD=change-me \
  -p 3306:3306 -d mysql:8
```

```env
DATABASE_URL="mysql://jola_user:change-me@127.0.0.1:3306/jola_school"
```

### Migrations

```bash
npm run db:migrate     # development: create + apply migrations
npm run db:deploy      # production: apply existing migrations only
npm run db:generate    # regenerate Prisma Client
npm run db:studio      # inspect data locally
```

The initial migration is committed at
`prisma/migrations/20261105130046_init/`.

### Seed data

```bash
npm run db:seed
```

The seed is **idempotent** and creates:

- 6 demo stories (`isDemo = true`)
- 6 demo testimonials (`isDemo = true`)
- 8 gallery image records
- one admin user, using `ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_PASSWORD`, with a
  bcrypt hash (cost 12)

If `ADMIN_EMAIL` or `ADMIN_PASSWORD` is missing, the admin user is skipped and
the seed prints a warning. Demo records are excluded from the sitemap, marked
`noindex`, and visibly labelled in the UI.

### Data models

`VisitRequest`, `Story`, `Testimonial`, `GalleryImage`, `AdminUser` — see
`prisma/schema.prisma`. Indexes cover the lookup paths used by the visit API
(email, IP hash, creation time, story slugs, publication state).

## Running the project

```bash
npm run dev        # development server (Turbopack)
npm run build      # prisma generate + production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

The build requires a reachable database because some pages read published
content at build time. If the database is unavailable, content services fall back
to labelled demo content and log a warning, so the build still succeeds. Always
run the final production build against the real database.

## Project structure

```
prisma/
  schema.prisma            # data models and indexes
  seed.ts                  # idempotent demo data + admin user
  migrations/              # committed SQL migrations
public/
  images/placeholders/     # branded, labelled JPG placeholders
src/
  app/
    [locale]/              # all localised pages (root layout lives here)
      page.tsx             # 21-section home page + JSON-LD
      about/ academics/ admissions/ admissions/book-a-visit/
      contact/ life-at-jola/ stories/ stories/[slug]/ not-found.tsx
    api/visits/route.ts    # POST endpoint for visit requests
    sitemap.ts robots.ts manifest.ts icon.svg globals.css
  proxy.ts                 # next-intl locale routing (Next 16 proxy)
  components/
    home/                  # one component per home section
    layout/                # header, footer, language switcher
    forms/VisitForm.tsx    # bilingual React Hook Form
    ui/                    # Container, Button, Photo, Reveal, PageHero, ...
  content/demo-content.ts  # fallback demo content, flagged in the UI
  i18n/                    # routing, request config, navigation helpers
  lib/                     # site config, metadata, security, prisma, auth
  messages/en.json es.json # all copy, key-for-key parity
  services/                # content queries and visit submission logic
```

Pages use the Next.js 16 async `params` convention
(`params: Promise<{ locale: string }>`) and validate the locale with
`hasLocale` + `notFound()`.

## Internationalisation

- Locales: `en` (default), `es`.
- Every route is prefixed: `/en/...`, `/es/...`; there is no unprefixed route.
- Automatic browser-language detection is disabled so English stays the default.
- The header switcher preserves the current pathname, query string and hash.
- All copy — navigation, metadata, forms, errors, section content and JSON-LD
  strings — lives in `src/messages/en.json` and `src/messages/es.json`.
- Add a locale by extending `src/i18n/routing.ts`, adding `src/messages/<locale>.json`,
  and adding the locale to the switcher.
- UI copy and form validation messages are localised. Database content
  (stories/testimonials) has `locale` fields; seed records exist for both.

## Visit request flow

1. Visitor submits the form at `/{locale}/admissions/book-a-visit`.
2. Client-side Zod validation via React Hook Form shows inline, localised errors.
3. The form posts JSON to `/api/visits`.
4. The API:
   - rejects cross-origin requests (same-origin check)
   - requires `application/json` and caps the body at 24 KB
   - re-validates every field with the shared Zod schema
   - rejects honeypot submissions and forms completed unrealistically fast
   - hashes the client IP with `IP_HASH_SALT` (raw IPs are never stored)
   - limits each IP hash to 5 requests per hour
   - rejects a second submission from the same email within 10 minutes
   - stores the request and returns `201` with the new ID
5. The UI shows a success confirmation or a specific error state
   (validation, duplicate, rate limit, unavailable).

To review submissions locally:

```bash
npm run db:studio
```

The admin user model and bcrypt helpers exist for a future admin area, but this
release does not include an admin UI. Requests are reviewed through Prisma Studio
or your database tooling.

## Content, images and demo data

- **Placeholders:** all images in `public/images/placeholders/` are generated,
  branded abstract compositions. `Photo` automatically adds a visible
  "placeholder" badge to any image served from `/placeholders/`, so it is obvious
  which assets are not final.
- **Replacing images:** drop licensed, approved photography into
  `public/images/` (outside `placeholders/`) and update the `src` values. Keep the
  same aspect ratios where possible to avoid layout shifts.
- **Alt text** is translated and lives in the message files; update it together
  with each image.
- **Demo stories/testimonials** are flagged `isDemo` in the database and labelled
  in the interface. Unpublish or replace them before launch:

  ```sql
  UPDATE Story SET isDemo = 0;            -- only after replacing content
  UPDATE Testimonial SET isDemo = 0;
  ```

  Or delete/replace the records via Prisma Studio.
- **Hero video:** set `NEXT_PUBLIC_HERO_VIDEO_URL` to a file in `public/videos/`
  or a CDN URL. Leave it empty to use the optimised hero image.

## SEO and accessibility

- Per-page, per-locale metadata with canonical URLs and `hreflang` alternates.
- Open Graph and Twitter metadata, including a generated OG image.
- `sitemap.xml` includes both locales and excludes demo stories.
- `robots.txt` allows public pages and disallows the API.
- JSON-LD `School` / `EducationalOrganization` structured data on the home page.
- Semantic landmarks, a skip link, labelled form fields, visible focus styles,
  keyboard-operable navigation and carousel controls.
- `next/image` with AVIF/WebP, responsive sizes and lazy loading below the fold.
- Reduced-motion support in the reveal animations.

## Security notes

- The API enforces same-origin requests, JSON content type and body-size limits.
- All input is validated server-side; never rely on client validation alone.
- IP addresses are salted-hashed before storage and used only for rate limiting.
- The honeypot and minimum completion time reduce basic bot traffic.
- The admin password is bcrypt-hashed (cost 12); plain passwords are never stored.
- Security headers (`nosniff`, `SAMEORIGIN`, referrer policy, permissions policy)
  are set in `next.config.ts`.
- Prisma parameterises queries, preventing SQL injection.
- Use HTTPS in production and set a long, random `IP_HASH_SALT`.
- Rate limiting is database-backed and per-instance. For multi-instance
  deployments, put a shared limiter (e.g. Redis, Cloudflare) in front of the API.

## Deployment

### Vercel (recommended for Next.js)

1. Push the repository to GitHub/GitLab.
2. Import the project in Vercel.
3. Add all environment variables from `.env.example`; set
   `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Provision MySQL (PlanetScale, AWS RDS, DigitalOcean, Railway, etc.) and set
   `DATABASE_URL` with TLS parameters as required by the provider.
5. Apply migrations during the build or as a release step:

   ```bash
   npx prisma migrate deploy
   ```

   Vercel's build command can be `npm run build`; run migrations from CI or a
   one-off command to avoid concurrent deploys racing.
6. Optionally run `npm run db:seed` once (or create the admin user manually).
7. Verify `/en`, `/es`, `/sitemap.xml`, `/robots.txt` and a test visit submission.

### Self-hosted (Node)

```bash
npm ci
npx prisma migrate deploy
npm run build
npm run start        # listens on port 3000 by default
```

Terminate TLS at a reverse proxy (Nginx, Caddy) and forward to the app. Restrict
database access to the application host. Back up the database on a schedule.

### Docker (application)

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Run `npx prisma migrate deploy` as a separate release job.

## Launch checklist

- [ ] Replace all placeholders in `public/images/placeholders/` with approved
      photography and remove the placeholder badge by leaving that folder.
- [ ] Review and translate all alt text in `en.json` / `es.json`.
- [ ] Replace or delete demo stories and testimonials; set `isDemo = 0` only
      after the content is real.
- [ ] Confirm statistics, class sizes, grade levels, programmes and calendar
      details with the school.
- [ ] Fill in phone, emails, address, map and social URLs in `.env`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Set a strong `IP_HASH_SALT`.
- [ ] Change/rotate the seeded admin password; create real admin accounts.
- [ ] Run `npm run typecheck`, `npm run lint`, `npm run build`.
- [ ] Apply migrations with `prisma migrate deploy`.
- [ ] Test the visit form end-to-end (success, duplicate, validation, rate limit).
- [ ] Submit a test story and check `/en/stories` and `/es/stories`.
- [ ] Verify metadata and Open Graph previews for both locales.
- [ ] Confirm `sitemap.xml` and `robots.txt`.
- [ ] Configure database backups and uptime monitoring.
- [ ] Run an accessibility audit (keyboard, screen reader, contrast).
- [ ] Add analytics/cookie consent only if required by policy.

## Content that must be replaced

The following are placeholders or unconfirmed and were deliberately **not
invented**. Confirm them with JOLA before launch:

- Official phone number, contact email, admissions email and street address.
- Official Instagram, Facebook and YouTube URLs.
- Final photography, campus imagery, video and logos.
- Names, roles and biographies of leadership and staff.
- Stories, testimonials and quotes (current records are labelled demo content).
- Statistics, student numbers, class sizes, grade range and founding year where
  not confirmed by the brief.
- Academic programme details, calendars and admissions deadlines.
- Any accreditation, affiliation or university-placement claims.

Search the codebase for `TODO`, `pending` and `isDemo` to find the corresponding
UI states and data.
