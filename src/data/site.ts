export const site = {
  name: "Pablo Piskunow",
  url: "https://piskunow.com",
  email: "pablo@piskunow.com",
  jobTitle: "Software product developer",
  tagline:
    "I build and ship software products. Physicist by training, engineer by trade.",
  links: {
    github: "https://github.com/piskunow",
    linkedin: "https://linkedin.com/in/piskunow",
    scholar: "https://scholar.google.com/citations?user=NUSALlQAAAAJ&hl=en",
    orcid: "http://orcid.org/0000-0002-5607-2076",
  },
}

export type Product = {
  name: string
  url: string
  domain: string
  summary: string
  detail: string
  stack: string[]
}

export const products: Product[] = [
  {
    name: "Vigilia",
    url: "https://getvigilia.com",
    domain: "getvigilia.com",
    summary:
      "Runtime error monitoring for people building on Lovable, Bolt and Replit.",
    detail:
      "Vigilia watches an app after it goes live. When something breaks in front of a real user, it captures the error with the context around it and writes a fix prompt you paste straight back into the builder that made the app. It is aimed at people who ship working products without reading the code.",
    stack: ["TypeScript", "Firebase", "Cloud Run", "SDK"],
  },
  {
    name: "TowardsGM",
    url: "https://towardsgm.com",
    domain: "towardsgm.com",
    summary:
      "A chess opening trainer that learns from the games you have already played.",
    detail:
      "TowardsGM reads your game history from Lichess and Chess.com, finds where your openings actually fall apart, and builds a study path from those positions rather than from a generic repertoire. Progress is tracked per position, so review time goes where the losses are.",
    stack: ["Vite", "Firebase", "Firestore", "Playwright"],
  },
  {
    name: "NightFlow",
    url: "https://night-flow.com",
    domain: "night-flow.com",
    summary:
      "A visual platform for building AI workflows without writing code.",
    detail:
      "NightFlow assembles RAG pipelines, multi-agent systems and scheduled jobs on a canvas, then runs them on a hosted backend. Flows connect to Slack, Discord and Telegram, so a workflow can be triggered and answered from where a team already works.",
    stack: ["Python", "React", "Node graph runtime"],
  },
]

export type WorkItem = {
  name: string
  role: string
  years: string
  summary: string
  detail: string
  stack: string[]
  href?: string
  external?: string
  externalLabel?: string
}

export const work: WorkItem[] = [
  {
    name: "Deep Questions",
    role: "Founder and CTO",
    years: "2020 – 2022",
    summary:
      "A question-and-answer product built and launched before the current wave of language models.",
    detail:
      "I founded Deep Questions and led it as CTO. It shipped as a progressive web app on Firebase with offline support, server-side rendering and a full authentication and payment path. I built the product, ran the technical side of the company and took it through the fundraising process.",
    stack: ["Gatsby", "React", "Firebase", "PWA"],
    href: "/deep-questions/",
  },
  {
    name: "Kwant",
    role: "Open-source contributor",
    years: "2018 – 2021",
    summary:
      "Quantum transport simulation package used across condensed matter research.",
    detail:
      "At TU Delft I contributed the kernel polynomial method implementation, which lets Kwant compute spectral densities and topological invariants for systems far too large to diagonalise directly. The method is what made the disordered topological phase diagram work in Phys. Rev. Research 2, 013229 possible.",
    stack: ["Python", "NumPy", "SciPy"],
    external: "https://kwant-project.org",
    externalLabel: "kwant-project.org",
  },
  {
    name: "Fermi Contours",
    role: "Author",
    years: "2023",
    summary:
      "A published Python package for computing Fermi contours, built to modern packaging standards.",
    detail:
      "Fermi Contours is on PyPI with typed sources, a documentation site and a full CI pipeline. I built it on the Cookiecutter Hypermodern Python template partly as a real package and partly to find out where that template helps and where it gets in the way.",
    stack: ["Python", "Nox", "Poetry", "Sphinx"],
    href: "/fermi-contours/",
  },
  {
    name: "Prove Me Wrong",
    role: "Author",
    years: "2023",
    summary:
      "A collaborative editor with Notion-style blocks, running without a server.",
    detail:
      "Prove Me Wrong lets several people annotate and argue over a document at the block level. It is built on EditorJS with Firebase behind it, so the whole thing runs serverless while keeping edits consistent between users.",
    stack: ["Gatsby", "EditorJS", "Firebase"],
    href: "/prove-me-wrong/",
  },
]

export type Role = { org: string; title: string; years: string; note?: string }

export const experience: Role[] = [
  {
    org: "AstraZeneca",
    title: "Director, Data Science & AI",
    years: "Present",
    note: "MLOps, cloud deployment and agent infrastructure.",
  },
  { org: "ADP", title: "Lead Machine Learning Engineer", years: "" },
  { org: "Aily Labs", title: "Principal Data Scientist", years: "" },
  { org: "Stuart", title: "Senior Data Scientist", years: "" },
  { org: "Deep Questions", title: "Founder and CTO", years: "" },
]

export const research: Role[] = [
  {
    org: "ICN2",
    title: "Senior Postdoctoral Researcher",
    years: "",
    note: "Catalan Institute of Nanoscience and Nanotechnology.",
  },
  {
    org: "TU Delft",
    title: "Postdoctoral Researcher",
    years: "",
    note: "Kavli Institute of Nanoscience.",
  },
  {
    org: "National University of Córdoba",
    title: "PhD, Theoretical Physics",
    years: "",
    note: "Completed a year ahead of schedule.",
  },
]
