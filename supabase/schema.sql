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

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  title text not null,
  summary text not null default '',
  problem text not null default '',
  approach text not null default '',
  key_results text[] not null default '{}',
  result_label text not null default 'Key Results',
  goal text,
  tags text[] not null default '{}',
  link text not null default '',
  kind text not null default 'green',
  label text not null default '',
  art text not null default 'chart',
  badge text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_projects enable row level security;
grant select on public.portfolio_projects to anon, authenticated;
grant all on public.portfolio_projects to service_role;

drop policy if exists "Portfolio projects are publicly readable" on public.portfolio_projects;
create policy "Portfolio projects are publicly readable"
  on public.portfolio_projects
  for select
  to anon, authenticated
  using (true);

create table if not exists public.portfolio_settings (
  id text primary key check (id = 'main'),
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_settings enable row level security;
grant select on public.portfolio_settings to anon, authenticated;
grant all on public.portfolio_settings to service_role;

drop policy if exists "Portfolio settings are publicly readable" on public.portfolio_settings;
create policy "Portfolio settings are publicly readable"
  on public.portfolio_settings
  for select
  to anon, authenticated
  using (id = 'main');

insert into public.portfolio_projects (
  id, group_name, title, summary, problem, approach, key_results, result_label,
  goal, tags, link, kind, label, art, badge, sort_order
) values
  (
    '00000000-0000-4000-8000-000000000001',
    'LLM Research',
    'LLM Truthfulness & Interpretability',
    'Evaluating how adversarial prompts influence truthfulness in large language models.',
    'Understand how different prompting strategies affect model truthfulness and where untruthful behaviors emerge inside the model.',
    'Used TruthfulQA (790 questions) with four prompt conditions, generated responses using Gemma-3-4B-it, and analyzed results with GPT-5.6 Sol. Applied logit lens analysis to study internal activations.',
    array['Baseline: 89.7%', 'Conspiracy: 75.6%', 'Popular Myth: 72.0%', 'Force Wrong: 60.5%'],
    'Key Results',
    null,
    array['Python', 'PyTorch', 'Transformers', 'TruthfulQA', 'Interpretability', 'Logit Lens', 'Pandas', 'Matplotlib'],
    'https://github.com/sandunmunasinghe91/truthfulqa-adversarial-eval',
    'green', '01 / LLM RESEARCH', 'chart', '', 0
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'AI Systems',
    'Multi-Agent LLM Conflict Resolution',
    'Exploring multi-agent decision-making using LangGraph orchestration strategies such as majority voting, structured debate, hierarchical authority, and evidence-weighted consensus.',
    'Investigate how multiple LLM agents with different roles can collaborate, resolve disagreements, and make better decisions on complex, open-ended tasks.',
    'Built a multi-agent framework using LangGraph with majority voting, structured debate, hierarchical authority, and evidence-weighted consensus. Evaluated across 9 behavioral metrics and 32 scenarios.',
    array['Misinformation agents outperformed factual agents in 88% of cases (p < 0.006) across 9 behavioral metrics and 32 scenarios.'],
    'Key Results',
    null,
    array['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Next.js', 'NLP', 'Multi-Agent Systems'],
    'https://github.com/sandunmunasinghe91/Multi-agent-LLM-conflict-resolution-research-',
    'blue', '02 / AI SYSTEMS', 'agents', '', 1
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'Engineering AI',
    'Chemical Engineering LLM from Scratch',
    'Building a domain-specific language model for chemical and process engineering using a GPT-2 style decoder-only transformer.',
    'Create a specialized language model that understands chemical engineering concepts, equations, process design knowledge, and troubleshooting steps for real industrial applications.',
    'Built a GPT-2 style decoder-only transformer in PyTorch. Developed automated pipelines to collect 3,000+ arXiv papers and Wikipedia articles, and processed 2,300+ research papers into a curated 10M-token corpus.',
    '{}',
    'Long-term Goal',
    'Develop an AI-powered chemical engineering assistant capable of answering technical questions, explaining engineering concepts, and supporting process troubleshooting and engineering design.',
    array['PyTorch', 'tiktoken', 'Transformers', 'NLP', 'Data Processing', 'Chemical Engineering'],
    'https://github.com/sandunmunasinghe91/ChemEng-LLM',
    'violet', '03 / ENGINEERING AI', 'atom', 'IN PROGRESS', 2
  )
on conflict (id) do nothing;

insert into public.portfolio_settings (id, settings)
values (
  'main',
  '{
    "contact_email": "sandunmunasinghe2017@gmail.com",
    "github_url": "https://github.com/sandunmunasinghe91?tab=repositories",
    "linkedin_url": "https://www.linkedin.com/in/sandun-munasinghe-268a1a27b",
    "location": "Hoboken, New Jersey, USA",
    "availability": "Research opportunities · Internships · Full-time roles\nCollaborations · Technical discussions",
    "contact_intro": "Have a research idea, an opportunity, or a project in mind? I’d love to hear from you.",
    "contact_description": "I’m open to machine learning and AI opportunities, research collaborations, and interesting technical challenges at the intersection of computer science and chemical engineering.",
    "contact_lede": "I’m open to machine learning and AI opportunities, research collaborations, project discussions, and technical conversations at the intersection of computer science and chemical engineering.",
    "footer_heading": "Let’s build something meaningful.",
    "footer_description": "Open to opportunities in machine learning, AI, and chemical engineering. Great ideas begin with a conversation.",
    "contact_form_endpoint": "https://formspree.io/f/mrpejwge"
  }'::jsonb
)
on conflict (id) do nothing;

notify pgrst, 'reload schema';