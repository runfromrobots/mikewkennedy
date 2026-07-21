# Project: Michael Kennedy (MK) Portfolio Site

Personal portfolio/resume site for Michael Kennedy, a Senior UX Researcher (13+ years) targeting Senior/Lead-level UX Research roles, fully remote. Static site, no build step, no framework.

## Stack

Plain HTML/CSS/JS. No React, no bundler, no dependencies. Fonts loaded via Google Fonts CDN link tags in each HTML file's `<head>`.

## File structure

```
index.html              homepage (hero, about, experience, toolkit, work, testimonials, contact)
styles.css               shared stylesheet for the whole site
script.js                 shared JS (footer year, nav scroll-spy)
case-studies/index.html  case studies landing page (links back via ../)
images/                  drop images here, reference as images/filename.jpg
.nojekyll                 present so GitHub Pages serves files as-is
DEPLOY.md                deployment notes (Netlify/GitHub Pages/Vercel)
```

## Design system

* Colors: navy `#0A2540` (surface accent — buttons, contact section), electric cyan `#22E5FF`/`#33CFEA` (primary accent — headings, links, borders, replaces the old teal), magenta `#FF2EC4` (secondary accent, used sparingly for gradients/hover), near-black `#08090D` (background), see `:root` in styles.css for full token list. The `--teal`/`--teal-deep` variable names are historical (kept so far fewer call sites needed touching) but now hold cyan values, not teal.
* Type: Fraunces (display/headlines), Inter (body), IBM Plex Mono (labels, dates, eyebrows, tags)
* Signature visual: an animated "signal convergence" SVG in the hero, representing multiple research data sources (interviews, surveys, analytics, field notes) converging into one insight — a nod to mixed-methods synthesis. The hero photo now sits at the convergence point, replacing the abstract node with an actual portrait.
* Keep all new sections consistent with this system rather than introducing new colors/fonts
* Spacing, small-text sizing, and breakpoints are systematized on the Carbon Design System (github.com/carbon-design-system) scale — CSS custom properties prefixed `--cds-` in `:root` (spacing-01 through 13, a handful of type-scale steps, a motion duration/easing pair). This is a token-level adoption only ("Option A"): Fraunces/Inter for display/body type and the signature SVG structure are unchanged — deliberately not a full swap to literal Carbon components/theme, which would clash with the site's personal-portfolio identity. (The brand *colors* were later overhauled separately for the hacker theme below — Option A was about spacing/grid/type-scale infrastructure, not colors.) Breakpoints follow Carbon's md (672px) and lg (1056px). When adding new spacing/gaps, reach for a `--cds-spacing-*` token instead of a new hardcoded px value.
* Buttons: flat fill only, no outline/ghost/bordered-transparent style anywhere on the site. `.btn-primary` is a cyan-to-magenta gradient with dark text and a glow; `.btn-secondary` is solid cyan (`--teal-deep`) with dark text. Every button uses the oversized `.btn-large` (or `.btn-header`) treatment per Fitt's Law — a shared `--action-btn-size` token (80px, Carbon's largest button size). The header "Get in touch" button lives outside `.wrap` as a direct sibling in `.site-header` (which is itself the flex container now) so it spans the full header bar height *and* reaches the true right edge of the page, not just the centered content column — `.header-content` wraps just the logo+nav so they still align with `.wrap`'s max-width. Paired buttons touch with zero gap (`.hero-actions`, `.contact-links` both `gap: 0`) so each pair reads as one continuous bar. Note: `.contact` has its own navy background — `.btn-primary` there needs the `.contact .btn-primary` override (dark text, since the gradient still applies) and `.btn-secondary` there is overridden to magenta fill; don't remove those overrides or the buttons become unreadable/invisible against navy.
* **This site has one theme only: a permanent dark/terminal "hacker" theme** (explicitly requested — nod to 1995's *Hackers* and CRT/terminal computing). There is no light mode, no toggle, and no `prefers-color-scheme` switch — that was tried and deliberately removed. Don't reintroduce a light theme or make the palette conditional without being asked.
* VT323 (a pixelated CRT-terminal Google Font) is loaded and used via `--font-mono` for all label/eyebrow/mono text (nav, eyebrow, dates, tags, footer) — Fraunces/Inter still handle headings/body copy.
* Effects layer, near the end of styles.css, unconditional (not media-query-gated): cyan glow on h1/h2/h3 (`text-shadow`), a cyan-to-magenta gradient on `.btn-primary` with glow `box-shadow`, blurred cyan/magenta gradient blobs behind the hero (`.hero::before/::after`), a slow CRT scan-sweep across the signal SVG (`.signal-wrap::after`, `@keyframes scan-sweep`), a fixed faint scanline texture over the whole page (`body::after`), and a one-shot (not looping) RGB-split glitch flicker on nav-link/`.link-cta` hover (`@keyframes glitch-flicker`). Keep new effects similarly restrained — a hover-triggered one-shot, not a constant loop, and check `prefers-reduced-motion` still disables animations (the existing reduced-motion rule at the top of styles.css covers this automatically via `* { animation-duration: 0.001ms !important; ... }`).
* `--heading` is a separate token from `--navy` (cyan vs. navy) so headings/text use the accent color while navy surfaces (buttons, the contact section, the skip link) stay literally navy — when adding new navy-colored text (not a background/fill), use `var(--heading)`, not `var(--navy)` directly.
* `body { color-scheme: dark; }` is set so browser chrome (scrollbars, form controls) matches.

## Deployment

* Repo: https://github.com/runfromrobots/mikewkennedy
* Currently deployed via GitHub Pages (Settings → Pages → branch `main`, folder `/root`) at https://runfromrobots.github.io/mikewkennedy/
* Also connected to Vercel for auto-deploy on every push to `main`
* Custom domain mikewkennedy.com currently points at a different, existing live site. Do NOT touch that domain's DNS or treat this repo as live-facing until explicitly told the switch is happening.

## Content status — what's real vs. placeholder

Real:

* Name, title, years of experience, degrees, certifications
* Company history/order in the Experience section
* Toolkit tool list (pulled from the actual live site: UserTesting, UserZoom, Userlytics, User Interviews, Maze, Qualtrics, Optimal Workshop, SurveyMonkey, SurveyGizmo, dScout, Ethnio, ProvenByUsers, Respondent, Pendo, Figma, Miro, Mural, Sketch, plus Claude/NotebookLM/Dovetail/Great Question for AI-enabled synthesis)
* Footer quote from C. Todd Lombardo (from the live site)
* Email (mikewkennedy@gmail.com), phone number (+1 (617) 803-5041), and LinkedIn (https://www.linkedin.com/in/mikewkennedy)
* Testimonials (Scott Williams, Marek Glinski, Thomas Mackey — real quotes and names, pulled from the live site)
* resume.pdf (real file, sourced from Michael's actual resume)
* Experience section titles, dates, and role descriptions (real, pulled from Michael's actual resume)
* Employer logos in Experience (images/logos/) and toolkit logos in Toolkit, sourced from each company's own site (or Wikimedia Commons where a direct fetch wasn't possible), full color, on a `.log-logo` / `.tool-chip` + `.tool-logo` pattern. SurveyGizmo has no logo (Alchemer's site blocks automated fetches) — it's still a plain text chip.
* Headshot (images/headshot.jpg) — real photo, displayed in the About section via object-fit: cover with a gradient fallback if ever removed
* Hero photo (images/hero-photo.jpg) — real photo, positioned at the convergence point of the signal SVG (`.signal-wrap` / `.hero-photo` in styles.css), replacing the abstract node with an actual portrait
* images/unplaced/ holds three more real photos (ibm-research.jpg, collaborative-laptop.jpg, home-office-dog.jpg) with no page placement decided yet — ask the site owner before using any of them
* Favicon (images/favicon.png) — real square photo, wired via `<link rel="icon">` / `<link rel="apple-touch-icon">` in both index.html and case-studies/index.html
* The blazer/window photo (images/headshot.jpg) is the confirmed final headshot choice — don't swap it for other candidate photos without being asked
* A LinkedIn feed (Juicer.io embed) was tried and explicitly removed — don't re-add it.

Still placeholder — do not treat as final content:

* Both case study cards (homepage "Selected work" and case-studies/index.html) — no case study content exists yet

## Decisions already made — don't relitigate

* An earlier concept called "InsightForge" (a branded AI-assisted research platform as case-study foundation) was explored and explicitly dropped. Do not reintroduce it or reference it anywhere. The site owner wants a different direction for the first case study, TBD.
* Case study content will be figured out after the site is deployed — the current placeholder cards are intentional, not an oversight.

## Conventions

* No em dashes in any content or copy written for this project
* Avoid "it's not X, it's Y" contrasting constructions in copy
* Keep prose concise and direct, avoid over-explaining
* Relative links only (`case-studies/`, `../`, `images/...`) so the site works correctly whether served from a domain root or a GitHub Pages subpath
