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
