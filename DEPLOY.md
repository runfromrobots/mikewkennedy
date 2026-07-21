# Deploying your site

This is a static site — three files: `index.html`, `styles.css`, `script.js`. No build step, no server required. Here are the easiest ways to get it live.

## Option A: Netlify (drag-and-drop, easiest)
1. Go to https://app.netlify.com/drop
2. Drag the whole `portfolio-site` folder onto the page
3. Netlify gives you a live URL immediately (e.g. `your-name.netlify.app`)
4. Optional: add a custom domain under Site settings → Domain management

## Option B: GitHub Pages (free, good if you want version control)
1. Create a new GitHub repo, e.g. `mk-portfolio`
2. Push these three files to the repo root
3. In the repo: Settings → Pages → Source → select `main` branch, `/root`
4. Your site goes live at `https://<your-username>.github.io/mk-portfolio`

Quick commands once you have a repo created on GitHub:
```
cd portfolio-site
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/mk-portfolio.git
git push -u origin main
```

## Option C: Vercel
1. Go to https://vercel.com/new
2. Import the folder or connected GitHub repo
3. Framework preset: "Other" (no build command needed)
4. Deploy — you get a `.vercel.app` URL, with custom domain support

## Before you go live, edit these placeholders
- Drop a real photo at `images/headshot.jpg` to replace the navy/teal gradient placeholder — it displays automatically via `object-fit: cover`, with the gradient as a graceful fallback if the file is missing
- Case study cards on both the homepage and `/case-studies` are placeholders — swap in real write-ups when ready, or link out to a PDF/Figma prototype

## Custom domain
If you want something like `michaelkennedy.com` instead of a subdomain, buy the domain through any registrar (Namecheap, Google Domains successor Squarespace Domains, Cloudflare Registrar) and point its DNS at whichever host you choose above — each has a "custom domain" setting with the exact records to add.
