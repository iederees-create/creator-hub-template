// creator-layout.js
// Handles dynamic injection of navigation and footer for the Creator Hub ecosystem.

function initCreatorLayout() {
  const headerMount = document.getElementById('creator-header-mount');
  const footerMount = document.getElementById('creator-footer-mount');

  // Inject Global Header
  if (headerMount) {
    headerMount.innerHTML = `
      <nav id="navbar">
        <a href="index.html" class="brand">CreatorHub.</a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="portfolio.html">Portfolio</a>
          <a href="booking.html">Contact</a>
        </div>
        <a href="booking.html" class="btn btn-primary">Work With Me</a>
      </nav>
    `;

    // Re-attach scroll listener for new navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Inject Global Footer
  if (footerMount) {
    footerMount.innerHTML = `
      <footer>
        <a href="index.html" class="brand footer-brand">CreatorHub.</a>
        <div class="social-links">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">YouTube</a>
        </div>
        <p class="copyright">&copy; 2026 Creator Hub Pro x InkwellMedia. All rights reserved.</p>
      </footer>
    `;
  }
}

// Initialize layout when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCreatorLayout);
} else {
  initCreatorLayout();
}
