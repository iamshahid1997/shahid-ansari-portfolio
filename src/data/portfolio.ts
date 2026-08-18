export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Freelance", href: "#freelance" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/shahid-ansari12/",
  github: "https://github.com/iamshahid1997",
  email: "ansari.shah28@gmail.com",
  phone: "+91 8619180325",
};

export const aboutText = `With 5+ years of hands-on experience, I've built enterprise-grade dashboards, B2B/B2C e-commerce platforms, learning management systems, and healthcare portals using React, Next.js, TypeScript, and Tailwind CSS. From engineering the Exlr8 suite of admin, DP, and store management dashboards at Kratos to building gamified training platforms at Chaabi, patient transparency tools at ClaimTherapist, and transformative EdTech solutions at Belong — I specialize in turning complex business requirements into polished, high-performance web applications with seamless API integrations, RBAC, and pixel-perfect UI.`;

export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Electronics & Communication",
    school: "Jaipur Engineering College and Research Center",
    location: "Jaipur, India",
    year: "2020",
    score: "74.6%",
  },
  {
    degree: "Senior Secondary",
    field: "Physics, Chemistry & Maths with Computer Science",
    school: "Atomic Energy Central School",
    location: "Narora, India",
    year: "2016",
    score: "91%",
  },
];

export const experience = [
  {
    role: "Software Development Engineer - 2",
    company: "Kratos Gamer Network",
    period: "December 2024 - Present",
    location: "Bengaluru, India",
    bullets: [
      "Engineered an end-to-end centralized control panel (Exlr8 Superadmin Dashboard) using Next.js, Tailwind CSS, and TanStack Query for seamless API integration.",
      "Built workflows to onboard Content Partners (CPs) and Distribution Partners (DPs) and assign product variants to them.",
      "Implemented comprehensive Role-Based Access Control (RBAC) to manage feature visibility across the system.",
      "Developed robust bulk-upload capabilities for users, products, and assignments, alongside dynamic reporting tools and separate views for B2B and B2C orders.",
      "Developed a specialized B2B portal (Exlr8 DP Dashboard) functioning as an e-commerce platform for standard DPs to purchase digital vouchers in bulk.",
      "Integrated complex cart state management allowing users to browse listed products, add specific variants to their cart, and track detailed order summaries and purchase history.",
      "Architected a B2B2C store management system (Exlr8 Integrated DP Dashboard) empowering distribution partners to create and manage their own localized storefronts.",
      "Enabled DPs to assign specific products to their individual stores and independently monitor B2C orders placed by end-users.",
      "Built an inventory and fulfillment portal (Exlr8 Physical CP Dashboard) specifically for CPs providing physical merchandise.",
      "Integrated features for CPs to handle assigned products, dynamically update complex order states (shipped, delivered, cancelled, returned), and generate custom analytics reports.",
      "Directed a frontend team to build a complete B2C e-commerce platform (Kgen Kstore Website) for purchasing physical merchandise and digital vouchers.",
      "Engineered responsive, highly interactive UI elements using React and SCSS, including fluid animations like a floating cart feature.",
      "Implemented strict technical SEO standards and optimized the platform to consistently achieve Lighthouse performance scores of 85–90+.",
    ],
  },
  {
    role: "Software Developer",
    company: "Chaabi",
    period: "September 2023 - November 2024",
    location: "Gurgaon, India",
    bullets: [
      "Orchestrated a team of frontend developers to create landing pages and reusable components using React, enhancing UI consistency and increasing development speed by 30%.",
      "Implemented real-time analytics tools in an admin dashboard, enabling seamless performance tracking and user engagement monitoring, achieving a notable 20% uptick in user interaction.",
      "Engineered a dynamic training platform featuring gamified videos and interactive quizzes, leveraging Canva-like UI for user-friendly creation and content management, which elevated quiz participation by 50% and enhanced learning outcomes by 30%.",
    ],
  },
  {
    role: "Software Engineer",
    company: "ClaimTherapist",
    period: "February 2022 - August 2023",
    location: "Gurgaon, India",
    bullets: [
      "Led the construction of the SWADL website using React and RESTful APIs, enhancing patients' price transparency, achieving a 35% rise in user trust and a 25% increase in website traffic.",
      "Developed an engaging landing page and HQ portal for Claimtherapist, enhancing hospital connections and elevating online presence, which resulted in a 40% increase in hospital sign-ups.",
      "Engineered a cutting-edge dashboard for swift hospital and corporate onboarding, seamless integration of treatment and doctor information, and dynamic roomwise cost allocation, improving healthcare management and reducing onboarding time by 30%.",
      "Developed a user-friendly Cashless dashboard, revolutionizing the patient experience and optimizing cashless transactions for the team and hospitals, which streamlined processes and increased transaction efficiency by 25%.",
    ],
  },
  {
    role: "Junior Developer",
    company: "Belong | Ingenious Faces",
    period: "May 2021 - January 2022",
    location: "New Delhi, India",
    bullets: [
      "Developed a transformative learning platform for South African children, empowering skill development and knowledge acquisition, which led to a 35% improvement in learning outcomes.",
      "Created Effective Training Programs (ETPs) to enhance users' career prospects through internship opportunities, resulting in a 50% increase in internship placements.",
      "Led end-to-end development of a custom Learning Management System (LMS), enabling users to acquire diverse skills and achieve job readiness, which improved user skill acquisition rates by 45% and job placement rates by 25%.",
      "Provided valuable expertise to Belong | Ingenious Faces, contributing to their website and portal development, which enhanced their online presence and user experience, resulting in a 30% increase in site traffic.",
    ],
  },
];

export const skillCategories = [
  {
    title: "Core Frontend",
    skills: ["HTML5", "CSS", "JavaScript", "React JS", "Next JS", "TypeScript", "Tailwind CSS", "SCSS"],
  },
  {
    title: "Advanced",
    skills: ["Server-side Rendering", "GSAP Animations", "Three.js", "TanStack Query", "Lighthouse Performance"],
  },
  {
    title: "Integration & Architecture",
    skills: ["RESTful APIs", "GraphQL APIs", "End-to-End Project Development", "API Integrations", "State Management"],
  },
  { title: "Soft Skills", skills: ["Team Leadership", "UX Design", "SEO"] },
  { title: "Tools", skills: ["Git", "ESLint", "Remix JS"] },
  {
    title: "Quality Assurance",
    skills: ["Code Standards", "Performance Profiling", "Debugging", "Responsive Delivery"],
  },
];

import kstoreImg from "@/assets/projects/kstore.png";
import preemadeImg from "@/assets/projects/preemade.png";
import appleImg from "@/assets/projects/apple.png";
import portfolioImg from "@/assets/projects/portfolio.png";

export const projects = [
  {
    title: "Shahid Ansari — Interactive Portfolio",
    company: "Self",
    link: "https://shahid-portfolio-showcase.vercel.app/",
    period: "2025",
    description:
      "Designed and developed a one-of-a-kind interactive developer portfolio with a creative spatial layout — featuring a draggable ID lanyard with realistic rope physics, an animated boarding pass, a cycling code terminal, a sports arcade mini-experience, a music card, and a cinematic mobile navigation reveal. Built with React, TypeScript, Tailwind CSS, and Framer Motion. Engineered with strict semantic HTML, JSON-LD structured data, sitemap, and Lighthouse-grade performance for top SEO ranking.",
    techs: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "SEO", "JSON-LD"],
    image: portfolioImg,
  },
  {
    title: "Kgen Kstore Website",
    company: "Kratos Gamer Network",
    link: "https://kstore.global/",
    period: "2024 - Present",
    description:
      "Directed frontend development of a complete B2C e-commerce platform for purchasing physical merchandise and digital vouchers. Built end-to-end API integrations using TanStack Query for seamless data fetching, caching, and state management. Engineered responsive, highly interactive UI elements with fluid animations like a floating cart feature. Implemented strict technical SEO standards and optimized for Lighthouse scores of 85–90+.",
    techs: ["Next JS", "TypeScript", "TanStack Query", "SCSS", "SEO Optimization", "ESLint"],
    image: kstoreImg,
  },
  {
    title: "PreeMade Website",
    company: "Freelance for PreeMade",
    link: "https://www.preemadeds.com/",
    period: "2023",
    description:
      "Built from scratch as a freelance project for PreeMade — a company offering premium pre-made design assets, architectural plans, urban planning visuals, and creative services. Delivered a visually appealing, fully responsive showcase website with sections for About, Services, Projects, and Contact. Implemented modern UI/UX best practices with clean typography, smooth scrolling, fast performance, and mobile-first design.",
    techs: ["React JS", "Next JS", "Tailwind CSS", "GSAP", "ESLint", "Vercel"],
    image: preemadeImg,
  },
  {
    title: "Apple Redesign",
    company: "Self",
    link: "https://apple-resdesign.vercel.app/",
    period: "December 2022 - January 2023",
    description:
      "Orchestrated a comprehensive overhaul of the Apple website. Elevated the shopping experience through a responsive UI and secure Stripe payment integration.",
    techs: ["Next JS", "TypeScript", "Apollo Client", "Tailwind CSS", "Apollo GraphQL", "Node JS", "MongoDB", "Stripe", "ESLint", "Vercel"],
    image: appleImg,
  },
];

export const freelanceServices = [
  { title: "Custom Web Development", icon: "code" },
  { title: "React/Next.js Applications", icon: "layers" },
  { title: "UI/UX Design with Tailwind", icon: "palette" },
  { title: "API Integrations (GraphQL/Node)", icon: "plug" },
  { title: "Performance Optimizations", icon: "zap" },
  { title: "Gaming-Related Web Apps", icon: "gamepad" },
];
