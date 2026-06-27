document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const form = document.getElementById('booking-form');

  // Handle scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle form submission gracefully
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = "Sending Proposal...";
      btn.style.opacity = '0.8';
      
      // Simulate API call
      setTimeout(() => {
        btn.textContent = "Sent Successfully! ✨";
        btn.style.background = "var(--success, #059669)";
        btn.style.opacity = '1';
        form.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
        }, 3000);
      }, 1500);
    });
  }
});
