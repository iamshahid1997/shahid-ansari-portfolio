# SEO Audit + Improvements

## TL;DR — Current SEO Health

**What's already working** (solid foundation, ~70% of the way there):

- Title, meta description, keywords, canonical URL
- Open Graph + Twitter Card meta with 1200×630 OG image
- Three JSON-LD blocks: `Person`, `WebSite`, `ProfessionalService`
- `robots.txt` allowing all major + AI crawlers, with sitemap reference
- `sitemap.xml` listing the homepage and section anchors
- `site.webmanifest` + `favicon.svg`
- Theme color, viewport, language, preconnect hints

**What's hurting rank** (the blockers):

1. **It's a SPA — Google sees an empty `<div id="root">`.** Bots that don't render JS (most social previews, AI crawlers, smaller search engines) see nothing. Google does render JS but treats statically-rendered content with much higher confidence.
2. **No real `<h1>`/`<h2>` semantic structure crawlable without JS.** All headings live inside React components.
3. **Section anchors in `sitemap.xml` (`/#about`)** — Google ignores fragment URLs. Wastes sitemap entries.
4. **Domain is hardcoded as `shahidansari.dev`** but the site isn't actually published there yet. Canonical/OG URLs point to a non-existent address — currently a self-inflicted ranking penalty.
5. **No real favicon.ico** (only an SVG fallback) — older crawlers + browsers can throw 404s.
6. **No image `alt` text audit** across components — many decorative assets, but project screenshots / avatars need descriptive alts.
7. **No analytics or Search Console verification meta** — you can't measure what you can't see.

## Plan — What I'll Change

### 1. Quick fixes (this build)

- Swap "cups of chai" → "cups of coffee" in `src/components/portfolio/About.tsx`.
- Add a real `<h1>` server-rendered into `index.html` inside a visually-hidden wrapper so crawlers always see the primary heading even before JS runs: "Shahid Ansari — Frontend Engineer Portfolio".
- Add a static SEO-only block inside `<body>` (rendered before React mounts) containing a one-paragraph summary, key skills as a bullet list, and links to all sections — visible to crawlers, hidden visually with `sr-only`-style CSS so the design isn't affected.
- Replace section-anchor URLs in `sitemap.xml` with just the homepage (Google indexes section anchors automatically when they're in the on-page nav).
- Add `lastmod` dates to `sitemap.xml`.
- Expand `robots.txt` with explicit `Disallow:` for nothing (clean) and add a `Host` hint.
- Add `application-name`, `apple-mobile-web-app-title`, `format-detection`, and `referrer` meta.
- Add a `BreadcrumbList` JSON-LD schema (helps Google show section breadcrumbs in results).
- Add `FAQPage` JSON-LD with 3-4 common questions ("Is Shahid available for freelance?", "What stack does he use?", "Where is he based?") — these can earn rich-result snippets.
- Audit and add descriptive `alt` text to every `<img>` and meaningful SVG (`role="img"` + `aria-label`).
- Generate a real `favicon.ico` (multi-size PNG-in-ICO) alongside the SVG.

### 2. Performance signals (Core Web Vitals — a Google ranking factor)

- Add `font-display: swap` to any custom font loads.
- Add `loading="lazy"` + explicit `width`/`height` to non-LCP images (prevents CLS).
- Add `fetchpriority="high"` to the LCP element (the hero name/lanyard area).
- Verify all Tailwind `bg-image` calls aren't blocking render.

### 3. Content depth (the real ranking lever)

Search engines rank pages with **substantive, unique text content**. Right now the page is highly visual. I'll add (still hidden in `sr-only` so design is untouched, OR optionally surfaced in a long-form "About" expansion):

- A 200-300 word professional bio paragraph in the About section.
- Per-project descriptions (200+ chars each) in Projects section.
- Per-role responsibility summaries in Experience section.
- Skill descriptions ("React — 5 years building production apps with...", etc.).

This dramatically improves keyword coverage for queries like _"freelance React developer Bengaluru"_, _"Next.js portfolio"_, _"frontend engineer for hire"_.

### 4. Things YOU need to do (I cannot do these from code)

These are the highest-leverage items for actually ranking — none of them are code changes:

1. **Buy & publish to a real domain.** Right now `shahidansari.dev` is hardcoded but not live. Pick one (`.dev`, `.com`, `.me`) and deploy.
2. **Submit to Google Search Console** — verify ownership, submit sitemap, monitor coverage + Core Web Vitals. ([search.google.com/search-console](https://search.google.com/search-console))
3. **Submit to Bing Webmaster Tools** — same thing for Bing/DuckDuckGo. ([bing.com/webmasters](https://www.bing.com/webmasters))
4. **Get backlinks** — the #1 ranking factor outside of content. Easy wins:
   - Add the portfolio URL to your GitHub profile README.
   - Add it to your LinkedIn "Featured" section.
   - Post a "I built my portfolio" thread on dev.to / Hashnode / Medium with link.
   - Submit to portfolio galleries: Awwwards, CSSDesignAwards, httpster, sitInspire, godly.website, lapa.ninja, bestportfolios.com, onepagelove.com.
   - Submit to dev directories: codrops, frontendfront, frontendmasters showcase.
5. **Update LinkedIn/GitHub profiles** to link to the portfolio domain — these are high-authority backlinks.
6. **Add the URL to your email signature, Twitter/X bio, Bluesky bio.**
7. **Set up Google Analytics 4 or Plausible** — measure what queries bring traffic.
8. **Get a few testimonials** on LinkedIn that mention "frontend engineer / React / freelance" — Google reads LinkedIn profiles when they're linked from your site (`sameAs` already does this).
9. **Write blog posts on the same domain** (long-term play). A `/blog` with 5-10 technical articles on React/Next.js/performance topics will multiply organic traffic 5-10× over 6 months.
10. **Get listed on "hire a freelance developer" platforms** (Toptal, Upwork, Contra, Wellfound) with the portfolio URL — those profile pages count as backlinks.

### 5. Optional / longer-term

- **Pre-render with Vite SSG plugin** (`vite-ssg`) — generates a fully static HTML version at build time. Biggest possible SEO upgrade for a SPA. Roughly 1-2 hours of work; happy to do it as a follow-up task.
- **Create individual routes for each project** (`/projects/exlr8`, `/projects/chaabi`, etc.) — each gets its own indexable page with its own meta tags. Massively expands keyword surface.
- **Add a `/resume` or `/cv` page** with structured employment data — ranks for "Shahid Ansari resume" / "Shahid Ansari CV" queries.

## Files I'll Touch in This Build

- `src/components/portfolio/About.tsx` — chai → coffee
- `index.html` — hidden SEO content block, real H1, breadcrumb + FAQ JSON-LD, extra meta tags
- `public/sitemap.xml` — clean up anchor URLs, add lastmod
- `public/robots.txt` — minor cleanup
- Various components — alt text audit
- `public/favicon.ico` — generate proper multi-size icon
