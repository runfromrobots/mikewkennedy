# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are hiring managers, recruiters, and hiring committees evaluating Michael Kennedy for Senior/Lead-level UX Research, Product/UX Design, UX Operations, Quantitative UX Research, UX Team Management, and Product Management roles, fully remote. They typically arrive from a resume, LinkedIn, or a direct application link, often reviewing quickly under time pressure, sometimes via a role-tailored landing page (`for/<role>.html`) sent specifically for that application. [Inferred from CLAUDE.md's headline framing and the in-progress role-tailored landing page pattern, e.g. `for/product-designer.html`; confirm if the intended audience is narrower.]

## Product Purpose

A personal portfolio/resume site that gets Michael Kennedy hired into a Senior/Lead-level UX role. It exists to demonstrate real research and design practice through in-depth case studies, not just a bullet-point resume, backed by actual client/employer artifacts, and to let Michael tailor the pitch per application via role-specific landing pages.

## Positioning

Differentiates from a typical portfolio/resume site on two axes: (1) real, detailed case studies built from actual source decks and artifacts, showing genuine research process rather than polished-but-thin project summaries; (2) unusual transparency, including a public write-up of exactly how the site itself was built with Claude Code (`how-this-site-was-made.html`) and a signed personal statement on AI use (`ai-stance.html`).

## Operating Context

Static site, no build step, no framework, no dependencies (plain HTML/CSS/JS). Fonts load via Google Fonts CDN link tags per page. Deployed via GitHub Pages and Vercel (auto-deploy on push to `main`), live at mikewkennedy.com. Development happens on `claude/new-website-i90ets` and ships to `main`. No CMS; content is hand-authored HTML per page, sharing one `styles.css` and one `script.js`.

## Capabilities and Constraints

- No build step, no bundler, no npm dependency for the site itself. (Impeccable's own tooling in `.claude/` is separate, project-local, and gitignored.)
- Relative links only (`case-studies/`, `../`, `images/...`) so the site works from a domain root or a GitHub Pages subpath.
- Real content is carefully distinguished from placeholder; CLAUDE.md's "Content status" section is the authoritative, actively maintained record of what's real, what's anonymized, and what's deliberately cropped or obscured for confidentiality or privacy.
- Two real case-study images are permanently redacted or cropped for participant privacy; never restore the originals.
- The most recent Experience entry's real employer is intentionally never named (reads as "Research Consulting"); don't reintroduce the real name or a real logo.
- Case-study product screenshots are deliberately blurred with a "Full detail shown in conversation" badge rather than shown at full clarity, since they're real client/employer artifacts.

## Brand Commitments

- Name/initials: Michael Kennedy / "MK".
- Self-description: "UX Research Leader" (chosen deliberately over "Senior UX Researcher"), with past titles named in the About copy (Principal UX Researcher, UX Designer / Researcher, UX Research Operations specialist).
- Voice: concise and direct, no em dashes in written copy, avoids "it's not X, it's Y" contrasting constructions.
- Visual identity: permanent dark theme only (no light mode), single cyan accent, Newsreader/Public Sans/Space Mono typefaces, Carbon Design System-derived spacing and type-scale tokens. CLAUDE.md's Design System section is the living source of truth for visual detail and should be read before visual work rather than duplicated here.

## Evidence on Hand

- Real: name, titles, years of experience, degrees and certifications, company history and dates, toolkit list, footer quote (C. Todd Lombardo), contact info, testimonials (Scott Williams, Marek Glinski, Thomas Mackey), resume.pdf, headshot and hero photos, three real case studies built from actual source decks Michael supplied.
- Do not fabricate testimonials, customers, benchmarks, or metrics beyond what CLAUDE.md already documents as real.
- Full inventory and provenance of every real, placeholder, or redacted asset lives in CLAUDE.md's "Content status" section; treat it as current and authoritative rather than re-deriving it here.

## Product Principles

1. Every case study and claim must be real and traceable to source material Michael actually supplied; no fabricated project work.
2. Confidentiality and privacy over portfolio polish: real client/employer artifacts stay obscured or blurred, and real third-party names stay out, even when it costs some persuasive detail.
3. One coherent design system, applied consistently, rather than novel treatment per page or per section.
4. Copy stays honest about AI's role in building the site and in Michael's own working process, rather than hiding or overselling it.
5. Role-tailored landing pages reorder and reframe real content per audience; they never invent new experience to fit a role.

## Accessibility & Inclusion

Target: WCAG 2.1 AA.
