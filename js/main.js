/**
 * Main Application Script
 * Navigation, Smooth Scroll, Progress Bar Animations, Modals & Hire Bar
 */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProgressBars();
  initHireBar();
  initContactForm();
  initSoundToggle();
});

// Sound Toggle in Nav
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      const active = window.soundEngine.toggle();
      if (active) {
        soundBtn.classList.add('active');
        soundBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          Sound On
        `;
        window.soundEngine.playClick();
      } else {
        soundBtn.classList.remove('active');
        soundBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
          Muted
        `;
      }
    }
  });
}

// Navigation & Smooth Scroll
function initNav() {
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  // Scroll spy
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else if (href === '#video-editing' && (current === 'presentation-videos' || current === 'motion-graphics' || current === 'social-reels' || current === 'video-editing')) {
        link.classList.add('active');
      }
    });

    if (window.scrollY > 40) {
      nav.style.background = 'rgba(10, 10, 12, 0.95)';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(14, 14, 16, 0.85)';
      nav.style.boxShadow = 'none';
    }
  });

  // Smooth scroll on buttons and links
  document.querySelectorAll('a[href^="#"], button[data-scroll]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetId = trigger.getAttribute('href') || trigger.getAttribute('data-scroll');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (window.soundEngine) window.soundEngine.playClick();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Mobile Menu Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (toggleBtn && navLinksList) {
    toggleBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
      navLinksList.classList.toggle('mobile-open');
    });

    // Close menu when any nav link is clicked
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('mobile-open');
      });
    });
  }
}

// Animate Progress Bars On Scroll
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetPercent = entry.target.getAttribute('data-percent') || '85%';
        entry.target.style.width = targetPercent;
      }
    });
  }, { threshold: 0.25 });

  bars.forEach(bar => observer.observe(bar));
}

// Floating Candidate Bar (Matches Behance Candidate Bar)
function initHireBar() {
  const hireBar = document.getElementById('floating-hire-bar');
  const hireBtn = document.getElementById('hire-bar-btn');
  const saveBtn = document.getElementById('save-candidate-btn');
  const closeBtn = document.getElementById('hire-bar-close');
  const hireModal = document.getElementById('hire-modal');
  const hireModalClose = document.getElementById('hire-modal-close');

  if (hireBtn) {
    hireBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playWhoosh();
      if (hireModal) hireModal.classList.add('active');
    });
  }

  // Also bind all .btn-hire triggers
  document.querySelectorAll('.btn-hire-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.soundEngine) window.soundEngine.playWhoosh();
      if (hireModal) hireModal.classList.add('active');
    });
  });

  if (hireModalClose && hireModal) {
    hireModalClose.addEventListener('click', () => {
      hireModal.classList.remove('active');
    });
    hireModal.addEventListener('click', (e) => {
      if (e.target === hireModal) hireModal.classList.remove('active');
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playClick();
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      saveBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
        Saved!
      `;
      setTimeout(() => {
        saveBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Save Candidate
        `;
      }, 3000);
    });
  }

  if (closeBtn && hireBar) {
    closeBtn.addEventListener('click', () => {
      hireBar.style.transform = 'translate(-50%, 150%)';
      setTimeout(() => {
        hireBar.style.display = 'none';
      }, 400);
    });
  }
}

// Contact Form & Inquiry Handling (Sends all inquiries to dnagaraboyina@gmail.com)
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const hireForm = document.getElementById('quick-hire-form');
  const recipientEmail = 'dnagaraboyina@gmail.com';

  const handleForm = (f) => {
    if (!f) return;
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (window.soundEngine) window.soundEngine.playClick();

      const btn = f.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending to ' + recipientEmail + '...';
      btn.disabled = true;

      const formData = new FormData(f);

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          btn.textContent = `✓ Sent to ${recipientEmail}!`;
          btn.style.background = '#10b981';
          btn.style.borderColor = '#10b981';
          f.reset();
        } else {
          throw new Error('Network error');
        }
      } catch (err) {
        // Fallback: Dispatch via mailto to dnagaraboyina@gmail.com
        const name = formData.get('name') || 'Client';
        const service = formData.get('service') || formData.get('company') || 'Creative Project';
        const msg = formData.get('message') || formData.get('scope') || '';
        const subject = encodeURIComponent(`New Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nService/Company: ${service}\n\nProject Details:\n${msg}`);
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

        btn.textContent = `✓ Opening Email to ${recipientEmail}...`;
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
      }

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        const hireModal = document.getElementById('hire-modal');
        if (hireModal) hireModal.classList.remove('active');
      }, 4000);
    });
  };

  handleForm(form);
  handleForm(hireForm);
}
