import "server-only";

import { createClient } from "@supabase/supabase-js";

export const defaultProjects = [
  {
    group_name: "LLM Research",
    title: "LLM Truthfulness & Interpretability",
    summary:
      "Evaluating how adversarial prompts influence truthfulness in large language models.",
    problem:
      "Understand how different prompting strategies affect model truthfulness and where untruthful behaviors emerge inside the model.",
    approach:
      "Used TruthfulQA (790 questions) with four prompt conditions, generated responses using Gemma-3-4B-it, and analyzed results with GPT-5.6 Sol. Applied logit lens analysis to study internal activations.",
    key_results: [
      "Baseline: 89.7%",
      "Conspiracy: 75.6%",
      "Popular Myth: 72.0%",
      "Force Wrong: 60.5%",
    ],
    result_label: "Key Results",
    tags: [
      "Python",
      "PyTorch",
      "Transformers",
      "TruthfulQA",
      "Interpretability",
      "Logit Lens",
      "Pandas",
      "Matplotlib",
    ],
    link: "https://github.com/sandunmunasinghe91/truthfulqa-adversarial-eval",
    kind: "green",
    label: "01 / LLM RESEARCH",
    art: "chart",
    badge: "",
    sort_order: 0,
  },
  {
    group_name: "AI Systems",
    title: "Multi-Agent LLM Conflict Resolution",
    summary:
      "Exploring multi-agent decision-making using LangGraph orchestration strategies such as majority voting, structured debate, hierarchical authority, and evidence-weighted consensus.",
    problem:
      "Investigate how multiple LLM agents with different roles can collaborate, resolve disagreements, and make better decisions on complex, open-ended tasks.",
    approach:
      "Built a multi-agent framework using LangGraph with majority voting, structured debate, hierarchical authority, and evidence-weighted consensus. Evaluated across 9 behavioral metrics and 32 scenarios.",
    key_results: [
      "Misinformation agents outperformed factual agents in 88% of cases (p < 0.006) across 9 behavioral metrics and 32 scenarios.",
    ],
    result_label: "Key Results",
    tags: [
      "Python",
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Next.js",
      "NLP",
      "Multi-Agent Systems",
    ],
    link: "https://github.com/sandunmunasinghe91/Multi-agent-LLM-conflict-resolution-research-",
    kind: "blue",
    label: "02 / AI SYSTEMS",
    art: "agents",
    badge: "",
    sort_order: 1,
  },
  {
    group_name: "Engineering AI",
    title: "Chemical Engineering LLM from Scratch",
    summary:
      "Building a domain-specific language model for chemical and process engineering using a GPT-2 style decoder-only transformer.",
    problem:
      "Create a specialized language model that understands chemical engineering concepts, equations, process design knowledge, and troubleshooting steps for real industrial applications.",
    approach:
      "Built a GPT-2 style decoder-only transformer in PyTorch. Developed automated pipelines to collect 3,000+ arXiv papers and Wikipedia articles, and processed 2,300+ research papers into a curated 10M-token corpus.",
    key_results: [],
    result_label: "Long-term Goal",
    goal:
      "Develop an AI-powered chemical engineering assistant capable of answering technical questions, explaining engineering concepts, and supporting process troubleshooting and engineering design.",
    tags: [
      "PyTorch",
      "tiktoken",
      "Transformers",
      "NLP",
      "Data Processing",
      "Chemical Engineering",
    ],
    link: "https://github.com/sandunmunasinghe91/ChemEng-LLM",
    kind: "violet",
    label: "03 / ENGINEERING AI",
    art: "atom",
    badge: "IN PROGRESS",
    sort_order: 2,
  },
];

export const defaultPortfolioSettings = {
  contact_email: "sandunmunasinghe2017@gmail.com",
  github_url: "https://github.com/sandunmunasinghe91?tab=repositories",
  linkedin_url: "https://www.linkedin.com/in/sandun-munasinghe-268a1a27b",
  location: "Hoboken, New Jersey, USA",
  availability:
    "Research opportunities · Internships · Full-time roles\nCollaborations · Technical discussions",
  contact_intro:
    "Have a research idea, an opportunity, or a project in mind? I’d love to hear from you.",
  contact_description:
    "I’m open to machine learning and AI opportunities, research collaborations, and interesting technical challenges at the intersection of computer science and chemical engineering.",
  contact_lede:
    "I’m open to machine learning and AI opportunities, research collaborations, project discussions, and technical conversations at the intersection of computer science and chemical engineering.",
  footer_heading: "Let’s build something meaningful.",
  footer_description:
    "Open to opportunities in machine learning, AI, and chemical engineering. Great ideas begin with a conversation.",
  contact_form_endpoint: "https://formspree.io/f/mrpejwge",
};

function hasPublicConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

function isPortfolioSchemaMissing(error) {
  return (
    error.code === "PGRST205" ||
    /could not find the table .* in the schema cache/i.test(error.message ?? "")
  );
}

export async function getPortfolioProjects() {
  if (!hasPublicConfig()) return defaultProjects;

  const { data, error } = await createPublicClient()
    .from("portfolio_projects")
    .select(
      "id, group_name, title, summary, problem, approach, key_results, result_label, goal, tags, link, kind, label, art, badge, sort_order",
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    if (isPortfolioSchemaMissing(error)) {
      console.warn(
        "Portfolio tables are not installed yet. Run supabase/schema.sql in the Supabase SQL Editor.",
      );
    } else {
      console.error("Unable to load portfolio projects:", error.message);
    }
    return defaultProjects;
  }
  return data ?? [];
}

export async function getPortfolioSettings() {
  if (!hasPublicConfig()) return defaultPortfolioSettings;

  const { data, error } = await createPublicClient()
    .from("portfolio_settings")
    .select("settings")
    .eq("id", "main")
    .maybeSingle();

  if (error) {
    if (isPortfolioSchemaMissing(error)) {
      console.warn(
        "Portfolio tables are not installed yet. Run supabase/schema.sql in the Supabase SQL Editor.",
      );
    } else {
      console.error("Unable to load portfolio settings:", error.message);
    }
    return defaultPortfolioSettings;
  }
  return { ...defaultPortfolioSettings, ...(data?.settings ?? {}) };
}
