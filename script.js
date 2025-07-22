document.addEventListener('DOMContentLoaded', function() {
// Typing animation
const typedEl = document.querySelector(".typed-text");
const texts = JSON.parse(typedEl.dataset.text);
let idx = 0, charIdx = 0, forward = true;

function type() {
  const current = texts[idx];
  typedEl.textContent = current.slice(0, charIdx);
  if (forward) {
    if (charIdx < current.length) charIdx++;
    else forward = false;
  } else {
    if (charIdx > 0) charIdx--;
    else { forward = true; idx = (idx + 1) % texts.length; }
  }
  setTimeout(type, forward ? 100 : 160);
}
type();

// Intersection Observer for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// Animate skill bars

// Project filtering + lightbox
// 🔄 Project Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btns button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btns .active')?.classList.remove('active');
    btn.classList.add('active');

    const category = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const type = card.getAttribute('data-category');
      if (category === 'all' || category === type) {
        card.style.display = 'block';
        setTimeout(() => card.classList.remove('fade-out'), 10);
      } else {
        card.classList.add('fade-out');
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});
// Experience Section
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

// Testimonial slider
const testiCards = document.querySelectorAll('.testi-card');
const nextBtn = document.getElementById('testi-next');
const prevBtn = document.getElementById('testi-prev');
const testiTrack = document.querySelector('.testi-track');

let currentIndex = 0;
let autoInterval = null;

function updateTestimonials(index) {
  testiCards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  const offset = -index * testiCards[0].clientWidth;
  testiTrack.style.transform = `translateX(${offset}px)`;
}

// Manual nav
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testiCards.length;
  updateTestimonials(currentIndex);
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testiCards.length) % testiCards.length;
  updateTestimonials(currentIndex);
  resetAutoSlide();
});

// Autoplay every 5 seconds
function startAutoSlide() {
  autoInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testiCards.length;
    updateTestimonials(currentIndex);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoInterval);
  startAutoSlide();
}

// Init
updateTestimonials(currentIndex);
startAutoSlide();


// Form validation
// Contact Form Validation
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  if (!nameInput.value.trim()) {
    showError('name-error', 'Name is required');
    valid = false;
  } else {
    clearError('name-error');
  }

  if (!emailInput.value.match(/^\S+@\S+\.\S+$/)) {
    showError('email-error', 'Enter a valid email');
    valid = false;
  } else {
    clearError('email-error');
  }

  if (!messageInput.value.trim()) {
    showError('message-error', 'Message cannot be empty');
    valid = false;
  } else {
    clearError('message-error');
  }

  if (valid) {
    form.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 3000);
  }
});

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

function clearError(id) {
  document.getElementById(id).textContent = '';
}

const backTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backTopBtn.classList.toggle('show', window.scrollY > 600);
});

backTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3️⃣ Dark Mode Toggle
const darkToggleBtn = document.getElementById('dark-toggle');
const body = document.body;

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  darkToggleBtn.textContent = '🌞';
} else {
  darkToggleBtn.textContent = '🌙';
}

// Toggle logic
darkToggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  darkToggleBtn.textContent = isDark ? '🌞' : '🌙';

  // Optional animation
  body.classList.add('theme-transition');
  setTimeout(() => body.classList.remove('theme-transition'), 400);
});
  // ===================== Progress Bar ==========================
  const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${scrollPercent}%`;
});


// Smooth nav highlight
const navLinks = document.querySelectorAll('#navbar .nav-links a');
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 200;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinksList = document.querySelector('.nav-links');

if (hamburger && navLinksList) {
  hamburger.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });
  // Close menu when a link is clicked (mobile UX)
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
    });
  });
}

// Updated Skill Section Coding
// 1️⃣ Animate Skill Bars
  // ===============================
  const skillItems = document.querySelectorAll('.skill-item');

  if (skillItems.length > 0) {
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-fill');
          const percent = entry.target.dataset.percent;
          fill.style.width = percent + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    skillItems.forEach(item => skillObserver.observe(item));
  }

// 4️⃣ Scroll Animation (fade-in, etc.)
  // ===============================
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // Popup Model code here
  const modal = document.getElementById('under-construction-modal');
const closeBtn = document.getElementById('modal-close');

// Catch clicks on social links or Read More
// Only show modal for social links that are NOT GitHub or Download CV
const githubProfileUrl = 'https://github.com/abaseenahmed';
const downloadCvUrl = 'Images/cv.pdf';
const linkedInProfile = `https://www.linkedin.com/in/abaseen-ahmed-b2b19827a/`
document.querySelectorAll('.social-list a, .read-more').forEach(link => {
  const href = link.getAttribute('href');
  if (
    href === githubProfileUrl ||
    href === downloadCvUrl  ||
    href === linkedInProfile
  ) {
    // Allow normal navigation/download
    return;
  }
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent navigation
    modal.style.display = 'flex';
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Scroll-triggered animations for fade-in, slide-in, zoom-in
const animatedEls = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      animObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });
animatedEls.forEach(el => animObserver.observe(el));

// Sticky navbar blur/shadow on scroll
const header = document.querySelector('header');
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header && header.classList.add('scrolled');
    nav && nav.classList.add('scrolled');
  } else {
    header && header.classList.remove('scrolled');
    nav && nav.classList.remove('scrolled');
  }
});

// --- Project Modal Logic ---
const projectModal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-project-content');
const closeProjectModal = document.getElementById('close-project-modal');

projectCards.forEach(card => {
  const liveDemoBtn = card.querySelector('.live-demo-btn');
  liveDemoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const img = card.querySelector('img');
    const title = card.querySelector('.project-info h3');
    const desc = card.querySelector('.project-info p');
    const demoLink = card.getAttribute('data-demo');
    const videoLink = card.getAttribute('data-video');
    modalContent.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <h3>${title.textContent}</h3>
      <p>${desc.textContent}</p>
      <div class="project-extra">This project demonstrates modern web development best practices, including responsive design, accessibility, and performance optimization.</div>
      <div class="modal-links">
        <a href="#" class="modal-demo-btn">View Live Demo</a>
        <a href="#" class="modal-video-btn">Watch Video</a>
      </div>
    `;
    projectModal.classList.add('show');

    // Add event listeners to modal buttons for under-construction modal
    setTimeout(() => {
      const demoBtn = document.querySelector('.modal-demo-btn');
      const videoBtn = document.querySelector('.modal-video-btn');
      const underModal = document.getElementById('under-construction-modal');
      if (demoBtn) demoBtn.onclick = function(ev) {
        ev.preventDefault();
        projectModal.classList.remove('show');
        underModal.style.display = 'flex';
      };
      if (videoBtn) videoBtn.onclick = function(ev) {
        ev.preventDefault();
        projectModal.classList.remove('show');
        underModal.style.display = 'flex';
      };
    }, 0);
  });
  card.addEventListener('click', (e) => {
    // Only open modal if not clicking the live demo button
    if (e.target.classList.contains('live-demo-btn')) return;
    const img = card.querySelector('img');
    const title = card.querySelector('.project-info h3');
    const desc = card.querySelector('.project-info p');
    const demoLink = card.getAttribute('data-demo');
    const videoLink = card.getAttribute('data-video');
    modalContent.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <h3>${title.textContent}</h3>
      <p>${desc.textContent}</p>
      <div class="project-extra">This project demonstrates modern web development best practices, including responsive design, accessibility, and performance optimization.</div>
      <div class="modal-links">
        <a href="#" class="modal-demo-btn">View Live Demo</a>
        <a href="#" class="modal-video-btn">Watch Video</a>
      </div>
    `;
    projectModal.classList.add('show');

    // Add event listeners to modal buttons for under-construction modal
    setTimeout(() => {
      const demoBtn = document.querySelector('.modal-demo-btn');
      const videoBtn = document.querySelector('.modal-video-btn');
      const underModal = document.getElementById('under-construction-modal');
      if (demoBtn) demoBtn.onclick = function(ev) {
        ev.preventDefault();
        projectModal.classList.remove('show');
        underModal.style.display = 'flex';
      };
      if (videoBtn) videoBtn.onclick = function(ev) {
        ev.preventDefault();
        projectModal.classList.remove('show');
        underModal.style.display = 'flex';
      };
    }, 0);
  });
});
closeProjectModal.addEventListener('click', () => {
  projectModal.classList.remove('show');
});
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) projectModal.classList.remove('show');
});

// --- Parallax Effect for Hero Background ---
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
  if (parallaxBg) {
    const offset = window.scrollY * 0.25;
    parallaxBg.style.transform = `translateY(${offset}px)`;
  }
});

// --- Animated Page Loader ---
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => loader.style.display = 'none', 800);
  }
});

// --- Section Transitions on Nav Click ---
const navLinks2 = document.querySelectorAll('nav .nav-links a');
const sections = document.querySelectorAll('[data-section]');
navLinks2.forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const target = document.querySelector(hash + '[data-section]');
      if (target) {
        e.preventDefault();
        // Hide all sections
        sections.forEach(sec => sec.classList.add('section-hide'));
        // Show target
        target.classList.remove('section-hide');
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Focus first heading
        setTimeout(() => {
          const h = target.querySelector('h1,h2,h3');
          if (h) h.focus && h.focus();
        }, 700);
      }
    }
  });
});
// On page load, remove section-hide from first section
window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('[data-section]');
  if (first) first.classList.remove('section-hide');
});

// --- Modal Keyboard Accessibility ---
document.addEventListener('keydown', e => {
  if (document.getElementById('project-modal').classList.contains('show')) {
    if (e.key === 'Escape') {
      document.getElementById('project-modal').classList.remove('show');
    }
    // Trap focus inside modal
    const focusable = document.querySelectorAll('#project-modal .modal-content button, #project-modal .modal-content [tabindex]:not([tabindex="-1"])');
    if (focusable.length) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }
});

});
