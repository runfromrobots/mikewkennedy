// Update footer year
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Hero image carousel
  const heroImages = document.querySelectorAll('.hero-image');
  if (heroImages.length > 0) {
    let currentIndex = 0;

    setInterval(() => {
      // Remove active class from current image
      heroImages[currentIndex].classList.remove('active');

      // Move to next image
      currentIndex = (currentIndex + 1) % heroImages.length;

      // Add active class to new image
      heroImages[currentIndex].classList.add('active');
    }, 8000); // 8 second cycle (matches animation duration)
  }
});
