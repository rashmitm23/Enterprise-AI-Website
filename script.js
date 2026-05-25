// Mobile nav
const t = document.getElementById('navToggle');
const m = document.getElementById('navMobile');
if (t) t.addEventListener('click', () => m.classList.toggle('open'));
m && m.querySelectorAll('a').forEach(a => a.addEventListener('click', () => m.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Why Syntra carousel
(function () {
  const track = document.getElementById('wsCarousel');
  if (!track) return;
  const cards = track.querySelectorAll('.ws-card');
  const visibleCount = () => window.innerWidth <= 920 ? 2 : 3;
  let current = 0;

  function maxIndex() { return cards.length - visibleCount(); }
  function slide() {
    const cardWidth = cards[0].getBoundingClientRect().width + 16;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
  }

  document.getElementById('wsNext').addEventListener('click', () => {
    current = Math.min(current + 1, maxIndex());
    slide();
  });
  document.getElementById('wsPrev').addEventListener('click', () => {
    current = Math.max(current - 1, 0);
    slide();
  });
  window.addEventListener('resize', () => {
    current = Math.min(current, maxIndex());
    slide();
  });
})();

// Tab toggling (visual only)
document.querySelectorAll('.dash-tabs').forEach(group => {
  group.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
});

// Why-card tabs with panel switching
document.querySelectorAll('.why-tabs').forEach(group => {
  const card = group.closest('.why-card');
  group.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const idx = tab.dataset.tab;
      card.querySelectorAll('.why-panel').forEach(p => p.classList.remove('active'));
      card.querySelector(`.why-panel[data-panel="${idx}"]`).classList.add('active');
    });
  });
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
    }
  });
});

// Analytics Tabs
(function () {
  const tabs = document.querySelectorAll('#atabTabs .atab-tab');
  const panels = document.querySelectorAll('#atabVisual .atab-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`#atabVisual .atab-panel[data-panel="${idx}"]`);
      if (panel) panel.classList.add('active');
    });
  });
})();

// Capabilities scroll-spy
(function () {
  const right = document.getElementById('capsRight');
  const tabs  = document.querySelectorAll('#capsTabs .caps-tab');
  if (!right || !tabs.length) return;

  const cards = right.querySelectorAll('.caps-card');

  // Click tab → scroll that card into view
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.tab);
      cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setActive(idx);
    });
  });

  function setActive(idx) {
    tabs.forEach(t => t.classList.remove('active'));
    if (tabs[idx]) tabs[idx].classList.add('active');
  }

  // Scroll-spy: watch which card is most visible in viewport
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.cap);
        setActive(idx);
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(card => spy.observe(card));
})();

// Number counter animation (About page stats)
(function () {
  const counters = document.querySelectorAll('.about-stat-num[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const step = 16;
    const totalSteps = duration / step;
    let current = 0;

    const timer = setInterval(() => {
      current += target / totalSteps;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();
