create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts
  add column if not exists image_path text;

alter table public.blog_posts enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant all on public.blog_posts to service_role;

drop policy if exists "Published posts are publicly readable" on public.blog_posts;
create policy "Published posts are publicly readable"
  on public.blog_posts
  for select
  to anon, authenticated
  using (published = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 3145728, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.set_blog_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.set_blog_post_updated_at();

notify pgrst, 'reload schema';