import "dotenv/config";
import { connectToDatabase } from "../src/db/connect";
import { Project } from "../src/models/Project";
import { Service } from "../src/models/Service";
import mongoose from "mongoose";

// Mirrors the content currently hardcoded in sitewyre-frontend's
// lib/projects.ts and lib/services.ts, so the backend launches with the
// same real content already live on the site instead of starting empty.
const projects = [
  {
    title: "Egli Gartenbau AG",
    slug: "egli-gartenbau",
    client: "Egli Gartenbau AG",
    industry: "Garden architecture",
    location: "Switzerland",
    category: "WordPress",
    description:
      "A WordPress site for a Swiss garden architecture and landscaping company, built around clear service presentation and a fast, dependable front end for prospective clients researching a landscaping partner.",
    challenge:
      "Landscaping decisions are high-consideration and visual — the site needed to present past work and services clearly while staying fast on mobile, where most research happens.",
    approach:
      "Structured the information architecture around services and completed work, with a WordPress/Elementor foundation the client's team can maintain independently.",
    design: "A clean, editorial layout that lets photography of completed gardens carry the visual weight.",
    development: "Built on WordPress with Elementor, optimized for straightforward client-side content updates.",
    performance: "Image-heavy pages optimized for fast loading on mobile connections.",
    services: ["Web Design", "WordPress Development", "UX"],
    technologies: ["WordPress", "Elementor"],
    filters: ["Web Design", "WordPress"],
    featured: true,
  },
  {
    title: "Angling Edge",
    slug: "angling-edge",
    client: "Angling Edge",
    industry: "Fishing",
    category: "Content Platform",
    description:
      "A WordPress content platform built for a fishing-focused publisher, combining custom development with a WordPress backend for editorial workflows.",
    challenge:
      "Content-heavy publishing sites need to stay fast as the archive grows, without making the editorial workflow harder for non-technical writers.",
    approach:
      "Paired WordPress's editorial tooling with custom development where the default theme layer wasn't enough for the content structure required.",
    design: "A magazine-style reading experience prioritizing legibility and clear content hierarchy.",
    development: "WordPress backend with custom development for specific content and layout needs.",
    performance: "Optimized asset loading for content-heavy archive and article pages.",
    services: ["WordPress Development", "Custom Development"],
    technologies: ["WordPress"],
    filters: ["WordPress", "Development"],
    featured: true,
  },
  {
    title: "Freyhandel",
    slug: "freyhandel",
    client: "Freyhandel",
    industry: "E-commerce",
    category: "WooCommerce",
    description: "A WooCommerce store built for reliable checkout performance and straightforward catalog management.",
    challenge: "E-commerce needs to convert — every step from product page to checkout has to be fast and frictionless.",
    approach: "Built on WooCommerce with attention to checkout flow, catalog structure, and page-load performance.",
    design: "A clear, product-first layout that keeps the path to checkout short.",
    development: "WooCommerce on WordPress, configured for catalog and checkout reliability.",
    performance: "Performance and Core Web Vitals work focused on product and checkout pages.",
    services: ["E-commerce", "WooCommerce", "Performance Optimization"],
    technologies: ["WordPress", "WooCommerce"],
    filters: ["E-commerce", "WordPress", "Performance"],
    featured: true,
  },
  {
    title: "Westminster Medical Group",
    slug: "westminster-medical-group",
    client: "Westminster Medical Group",
    industry: "Healthcare",
    category: "WordPress",
    description:
      "A WordPress website for a medical practice, built to present services and make it straightforward for patients to find the right information.",
    challenge: "Healthcare visitors need to find relevant information quickly and trust the practice from the first screen.",
    approach: "Prioritized clear service navigation and fast page loads over decorative complexity.",
    design: "A calm, trustworthy visual tone appropriate to a medical practice.",
    development: "WordPress with a maintainable content structure for the practice's team.",
    performance: "Optimized for fast, reliable loading across devices.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
  {
    title: "Cross-works AG",
    slug: "cross-works",
    client: "Cross-works AG",
    industry: "Professional Services",
    location: "Switzerland",
    category: "WordPress",
    description: "A WordPress site for a Swiss professional-services company, focused on clear positioning and lead generation.",
    challenge: "B2B service businesses need their site to communicate credibility and capability quickly to prospective clients.",
    approach: "Built a clear structural narrative from services to proof points to contact.",
    design: "A restrained, professional visual system.",
    development: "WordPress, built for straightforward long-term maintenance.",
    performance: "Optimized for fast, dependable loading.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
  {
    title: "Lindner Media",
    slug: "lindner-media",
    client: "Lindner Media",
    industry: "Media",
    category: "WordPress",
    description: "A WordPress website built for a media company, structured around content presentation and audience growth.",
    challenge: "Media sites need a content structure that scales without slowing the site down as the archive grows.",
    approach: "Built a WordPress foundation structured for content growth and editorial flexibility.",
    design: "A content-forward layout with clear visual hierarchy.",
    development: "WordPress, configured for editorial workflow and content scale.",
    performance: "Optimized for fast content delivery as the archive grows.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
  {
    title: "Holistic Vet Care",
    slug: "holistic-vet-care",
    client: "Holistic Vet Care",
    industry: "Veterinary",
    category: "WordPress",
    description:
      "A WordPress website for a veterinary practice, built to present services clearly and make it easy for pet owners to get in touch.",
    challenge: "Pet owners researching care need clear, reassuring information and an easy way to make contact.",
    approach: "Focused the structure on services, approach to care, and a direct path to contact.",
    design: "A warm, approachable visual tone suited to a care-focused practice.",
    development: "WordPress with a content structure the practice can maintain independently.",
    performance: "Optimized for fast, reliable loading on mobile.",
    services: ["Web Design", "WordPress Development"],
    technologies: ["WordPress"],
    filters: ["Web Design", "WordPress"],
    featured: false,
  },
];

const services = [
  {
    slug: "web-design",
    title: "Web Design",
    description: "Visual direction and interface design grounded in your business goals — not decoration for its own sake.",
    useCases: ["New brand launch", "Site redesign", "Design system for a growing product"],
    technologies: ["Figma", "Design tokens", "Tailwind CSS"],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    description: "Premium WordPress builds using Elementor and custom development where the theme layer isn't enough.",
    useCases: ["Marketing sites", "Content platforms", "Client-editable business sites"],
    technologies: ["WordPress", "Elementor", "PHP"],
  },
  {
    slug: "nextjs-react",
    title: "Next.js / React",
    description: "Server-rendered, type-safe front ends for products and marketing sites that need to be fast and precise.",
    useCases: ["Marketing sites with complex interaction", "Web applications", "Performance-critical rebuilds"],
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    description: "WooCommerce builds focused on checkout reliability and catalog structure that converts.",
    useCases: ["New online stores", "Checkout optimization", "Catalog and inventory structure"],
    technologies: ["WooCommerce", "WordPress"],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description: "Full-stack applications built on the MERN stack for workflows that off-the-shelf tools can't handle.",
    useCases: ["Internal tools", "Customer-facing portals", "Data-driven applications"],
    technologies: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    description: "Core Web Vitals, caching, and image optimization work for sites that need to load fast and rank well.",
    useCases: ["Slow legacy sites", "Pre-launch performance audits", "Ongoing technical SEO"],
    technologies: ["Core Web Vitals", "Caching", "Image optimization"],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    description: "Structured redesigns that keep what works, fix what doesn't, and modernize the technical foundation.",
    useCases: ["Outdated visual identity", "Poor mobile experience", "Platform migration"],
    technologies: ["WordPress", "Next.js", "UX audit"],
  },
];

async function seed() {
  await connectToDatabase();

  for (const project of projects) {
    await Project.findOneAndUpdate({ slug: project.slug }, project, { upsert: true, new: true });
  }
  console.log(`Seeded ${projects.length} projects`);

  for (const service of services) {
    await Service.findOneAndUpdate({ slug: service.slug }, service, { upsert: true, new: true });
  }
  console.log(`Seeded ${services.length} services`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
