document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle: slider switch between the dark theme and its inverted
// counterpart. The <head> of every page also has a small inline script that
// applies the saved choice before first paint, so there's no flash of the
// wrong theme; this block only needs to build the switch and wire it up.
(function () {
  const headerContent = document.querySelector('.header-content');
  if (!headerContent) return;

  const isInverted = document.documentElement.getAttribute('data-theme') === 'inverted';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'theme-toggle';
  toggle.setAttribute('aria-pressed', String(isInverted));
  toggle.setAttribute('aria-label', 'Switch color theme');
  toggle.innerHTML = `
    <span class="theme-toggle-label">Invert</span>
    <span class="theme-toggle-track"><span class="theme-toggle-thumb"></span></span>
  `;
  headerContent.appendChild(toggle);

  toggle.addEventListener('click', () => {
    const nowInverted = document.documentElement.getAttribute('data-theme') !== 'inverted';
    document.documentElement.setAttribute('data-theme', nowInverted ? 'inverted' : 'dark');
    toggle.setAttribute('aria-pressed', String(nowInverted));
    localStorage.setItem('mk-theme', nowInverted ? 'inverted' : 'dark');
  });
})();

// Highlight the active nav link based on scroll position
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--teal-deep)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => observer.observe(section));

// Image carousels on case study pages
document.querySelectorAll('.cs-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.cs-carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.cs-carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.cs-carousel-dot'));
  const counter = carousel.querySelector('.cs-carousel-counter');
  const caption = carousel.querySelector('.cs-carousel-caption');
  const prevBtn = carousel.querySelector('.cs-carousel-prev');
  const nextBtn = carousel.querySelector('.cs-carousel-next');
  let index = 0;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    if (caption) caption.textContent = slides[index].dataset.caption || '';
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      render();
    });
  });

  render();
});

// Small dismissible banner pointing to the "how this site was made" write-up.
// Skipped on that page itself, and remembered via localStorage once dismissed.
(function () {
  const path = window.location.pathname;
  if (path.endsWith('how-this-site-was-made.html')) return;
  if (localStorage.getItem('mk-site-banner-dismissed') === 'true') return;

  const inCaseStudies = path.includes('/case-studies/');
  const articleHref = (inCaseStudies ? '../' : '') + 'how-this-site-was-made.html';

  const banner = document.createElement('div');
  banner.className = 'site-banner';
  banner.innerHTML = `
    <a href="${articleHref}" class="site-banner-link">Curious how this site was built? Read the write-up &rarr;</a>
    <button type="button" class="site-banner-close" aria-label="Dismiss">&times;</button>
  `;
  document.body.appendChild(banner);

  banner.querySelector('.site-banner-close').addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('mk-site-banner-dismissed', 'true');
  });
})();
