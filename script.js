document.getElementById('year').textContent = new Date().getFullYear();

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
