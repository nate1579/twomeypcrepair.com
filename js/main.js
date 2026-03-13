/**
 * Twomey Pages Template — Main JS
 * Reads config.json and builds the entire site dynamically.
 * To spin up a new client site: copy the template, edit config.json, deploy.
 */

(async function () {
  const res = await fetch('config.json');
  const config = await res.json();
  initTheme(config.theme);
  initNavbar(config.business);
  initHero(config);
  initAbout(config);
  initServices(config.services);
  initGallery(config.images.gallery);
  initTestimonials(config.testimonials);
  initContact(config);
  initMap(config.map);
  initFooter(config);
  initMobileMenu();
  initScrollEffects();
})();

/* ── Theme ── */
function initTheme(theme) {
  const r = document.documentElement.style;
  r.setProperty('--primary', theme.primaryColor);
  r.setProperty('--secondary', theme.secondaryColor);
  r.setProperty('--accent', theme.accentColor);
  r.setProperty('--font-heading', theme.fontHeading);
  r.setProperty('--font-body', theme.fontBody);
}

/* ── Navbar ── */
function initNavbar(biz) {
  const logo = document.querySelector('.navbar-logo');
  // If a logo image exists, show it; otherwise show text
  const img = logo.querySelector('img');
  const text = logo.querySelector('.logo-text');
  if (text) text.textContent = biz.name;
}

/* ── Hero ── */
function initHero(config) {
  const bg = document.querySelector('.hero-bg');
  if (config.images.hero) {
    bg.style.backgroundImage = `url('${config.images.hero}')`;
  }
  document.querySelector('.hero h1').textContent = config.business.name;
  document.querySelector('.hero p').textContent = config.business.tagline;
}

/* ── About ── */
function initAbout(config) {
  const aboutImg = document.querySelector('.about-image img');
  if (aboutImg && config.images.about) {
    aboutImg.src = config.images.about;
    aboutImg.alt = config.business.name;
  }
  const aboutText = document.querySelector('.about-text p');
  if (aboutText) aboutText.textContent = config.business.description;
}

/* ── Services ── */
function initServices(services) {
  const grid = document.querySelector('.services-grid');
  if (!grid || !services) return;
  grid.innerHTML = '';

  const icons = {
    wrench: '🔧', shield: '🛡️', clock: '⏰', star: '⭐',
    heart: '❤️', bolt: '⚡', globe: '🌐', phone: '📞',
    truck: '🚚', home: '🏠', tool: '🛠️', chart: '📊',
    laptop: '💻', paint: '🎨', camera: '📷', leaf: '🍃'
  };

  services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-icon">${icons[s.icon] || '⭐'}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.description)}</p>
    `;
    grid.appendChild(card);
  });
}

/* ── Gallery ── */
function initGallery(images) {
  const grid = document.querySelector('.gallery-grid');
  if (!grid || !images || images.length === 0) {
    const section = document.getElementById('gallery');
    if (section) section.style.display = 'none';
    return;
  }
  grid.innerHTML = '';
  images.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${esc(src)}" alt="Gallery image ${i + 1}" loading="lazy">`;
    grid.appendChild(item);
  });
}

/* ── Testimonials ── */
function initTestimonials(testimonials) {
  const grid = document.querySelector('.testimonials-grid');
  if (!grid || !testimonials || testimonials.length === 0) {
    const section = document.getElementById('testimonials');
    if (section) section.style.display = 'none';
    return;
  }
  grid.innerHTML = '';
  testimonials.forEach(t => {
    const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="quote-mark">"</div>
      <div class="stars">${stars}</div>
      <p>${esc(t.text)}</p>
      <div class="author">— ${esc(t.name)}</div>
    `;
    grid.appendChild(card);
  });
}

/* ── Contact ── */
function initContact(config) {
  const biz = config.business;
  const addr = biz.address;

  setText('.contact-phone', biz.phone);
  setText('.contact-email', biz.email);
  setText('.contact-address', `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`);

  const hoursEl = document.querySelector('.contact-hours');
  if (hoursEl) {
    hoursEl.innerHTML = `${esc(biz.hours.weekdays)}<br>${esc(biz.hours.saturday)}<br>${esc(biz.hours.sunday)}`;
  }

  // Phone link
  const phoneLink = document.querySelector('.contact-phone-link');
  if (phoneLink) phoneLink.href = `tel:${biz.phone.replace(/\D/g, '')}`;

  // Email link
  const emailLink = document.querySelector('.contact-email-link');
  if (emailLink) emailLink.href = `mailto:${biz.email}`;

  // Contact form — FormSubmit
  const form = document.querySelector('.contact-form');
  if (form && biz.email) {
    form.action = `https://formsubmit.co/${biz.email}`;
    form.method = 'POST';
  }
}

/* ── Map ── */
function initMap(map) {
  const iframe = document.querySelector('.map-section iframe');
  if (iframe && map && map.embedUrl) {
    iframe.src = map.embedUrl;
  }
}

/* ── Footer ── */
function initFooter(config) {
  const biz = config.business;
  setText('.footer-business-name', biz.name);
  setText('.footer-description', biz.description);

  const credit = document.querySelector('.footer-credit');
  if (credit && config.footer) {
    credit.innerHTML = `© ${new Date().getFullYear()} ${esc(biz.name)}. All rights reserved. | <a href="${esc(config.footer.creditUrl)}" target="_blank">${esc(config.footer.credit)}</a>`;
  }

  // Social links
  const socialContainer = document.querySelector('.social-links');
  if (socialContainer && biz.social) {
    socialContainer.innerHTML = '';
    const platforms = {
      facebook: { icon: 'f', label: 'Facebook' },
      google: { icon: 'G', label: 'Google' },
      instagram: { icon: '📸', label: 'Instagram' },
      twitter: { icon: '𝕏', label: 'Twitter' },
      youtube: { icon: '▶', label: 'YouTube' }
    };
    Object.entries(biz.social).forEach(([key, url]) => {
      if (!url) return;
      const p = platforms[key];
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', p.label);
      a.textContent = p.icon;
      socialContainer.appendChild(a);
    });
  }
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('active'));
  });
}

/* ── Scroll Effects ── */
function initScrollEffects() {
  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 10px rgba(0,0,0,0.06)';
    }
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(s => {
    s.classList.add('fade-in');
    observer.observe(s);
  });
}

/* ── Helpers ── */
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

function setText(selector, text) {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = text || '';
  });
}
