# Sandun Munasinghe Portfolio

A nine-page responsive portfolio built with Next.js, React, and Tailwind CSS. The page markup, artwork, photographs, and visual styles are carried over from the supplied Sandun portfolio HTML pages.

## Start locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Blog administration

The public `/blog` page reads published posts from Supabase. `/admin` provides a private dashboard for adding, editing, and deleting posts, with optional cover image uploads and a publish checkbox in the post form.

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor. The schema creates the public-read `blog-images` storage bucket and adds the image path column; uploads are restricted to JPEG, PNG, WebP, and AVIF images under 3 MB.
2. Copy `.env.example` to `.env.local`. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a long random `ADMIN_SESSION_SECRET` for the server-verified admin login. Set the Supabase URL, anon key, and service-role key when ready; keep the service-role key private because it is only used on the server.
3. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. Until the Supabase URL and service-role key are set, login works but blog storage remains unavailable.
4. Add the same environment variables in Vercel and redeploy.

Admin credentials are verified on the server. The eight-hour session is signed with `ADMIN_SESSION_SECRET` and stored in an HttpOnly, SameSite=Strict cookie. Every write rechecks that session before using the server-only service-role client. The table uses row-level security so anonymous clients can select published rows only. Post content is plain text, not HTML.

Environment variables are listed in [`.env.example`](.env.example). Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.

## Pages

`/` Overview · `/about` · `/experience` · `/projects` · `/skills` · `/education` · `/blog` · `/recommendations` · `/contact`

The responsive navigation, project category filters, theme switch, and browser-local experience draft are interactive. Animations respect the operating system's reduced-motion preference.
