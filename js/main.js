const SUPABASE_URL = "https://eztzkivwjkcyxwcopxns.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CVHtnwHwG2TF4AXBam0_Sw_Jt2NhU_r";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);




// ---------------------------------------------------------------------------
// Data (mirrors src/data/beautyHubData.ts)
// -------------------------------------
const BUSINESS_INFO = {
  name: 'Pearl Beauty Hub',
  category: 'Beauty Parlour',
  address: '3/7 57th Street, Korattur Railway Station Road, Venkatraman Nagar, Korattur, Chennai, Tamil Nadu 600080',
  googleRating: 4.7,
  googleReviewCount: 3,
};

const SERVICES = [
  { id: 'acne-treatments', name: 'Acne Treatments', category: 'Skin Care', description: 'Targeted skin therapy designed to cleanse pores, reduce breakouts, and promote clear, healthy skin.' },
  { id: 'balayage', name: 'Balayage', category: 'Hair', description: 'Custom hand-painted hair highlighting technique creating seamless, natural dimension and radiant shine.' },
  { id: 'body-waxing', name: 'Body Waxing', category: 'Nails & Body', description: 'Gentle, thorough body waxing treatments for ultra-smooth skin with long-lasting hair removal.' },
  { id: 'bridal-services', name: 'Bridal Services', category: 'Makeup', description: 'Comprehensive beauty transformations for brides including skin preparation, makeup, and hair styling.' },
  { id: 'facials', name: 'Facials', category: 'Skin Care', description: 'Revitalizing deep-cleansing facial treatments tailored to nourish your skin type and restore youthful glow.' },
  { id: 'haircut', name: 'Haircut', category: 'Hair', description: 'Precision haircuts and styling custom-shaped to enhance your face features and personal style.' },
  { id: 'hairstyling', name: 'Hairstyling', category: 'Hair', description: 'Elegant blowouts, up-dos, curls, and hair designs crafted for everyday confidence or special occasions.' },
  { id: 'make-up', name: 'Make-up', category: 'Makeup', description: 'Professional makeup application using high-quality products for an effortless, radiant look.' },
  { id: 'make-up-services', name: 'Make-up Services', category: 'Makeup', description: 'Customized glam and natural makeup sessions for parties, photo shoots, and special events.' },
  { id: 'manicure', name: 'Manicure', category: 'Nails & Body', description: 'Pampering hand care, nail shaping, cuticle nourishment, and flawless polish application.' },
  { id: 'pedicure', name: 'Pedicure', category: 'Nails & Body', description: 'Relaxing foot treatment including exfoliating scrub, nail care, massage, and elegant polish.' },
  { id: 'shampoo-conditioning', name: 'Shampoo & Conditioning', category: 'Hair', description: 'Deep hair washing and moisture-locking conditioning treatment for soft, manageable tresses.' },
  { id: 'skin-care', name: 'Skin Care', category: 'Skin Care', description: 'Specialized dermatological and cosmetic skincare routines to maintain radiant, hydrated skin.' },
  { id: 'spa-services', name: 'Spa Services', category: 'Spa', description: 'Relaxing spa therapies created to relieve stress, refresh your senses, and revitalize your body.' },
  { id: 'waxing', name: 'Waxing', category: 'Nails & Body', description: 'Smooth precision waxing for face and delicate areas using gentle, skin-friendly wax formulations.' },
  { id: 'wedding-event-prep', name: 'Wedding & Event Preparation', category: 'Makeup', description: 'All-inclusive beauty prep sessions tailored for wedding parties, families, and milestone celebrations.' },
];

const CLIENT_STAT = { count: 1000, suffix: '+', label: 'Happy Clients' };

const SERVICE_ICONS = {
  'acne-treatments': 'shield-alert',
  'balayage': 'scissors',
  'haircut': 'scissors',
  'hairstyling': 'scissors',
  'shampoo-conditioning': 'scissors',
  'bridal-services': 'heart-handshake',
  'wedding-event-prep': 'heart-handshake',
  'make-up': 'palette',
  'make-up-services': 'palette',
  'facials': 'sparkle',
  'skin-care': 'sparkle',
  'manicure': 'footprints',
  'pedicure': 'footprints',
  'body-waxing': 'flame',
  'waxing': 'flame',
  'spa-services': 'bath',
};

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let activeSection = 'hero';
let preselectedService = '';
let selectedCategory = 'All';
let searchQuery = '';

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderBookingOptions();
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  initInitialLoader();
  initScrollProgressBar();
  initNavbar();
  initMobileMenu();
  initServiceFilters();
  initHappyClientsCounter();
  initGalleryLightbox();
  initBookingForm();
  initBackToTop();
  initSectionScrollSpy();

  setActiveSection('hero');

  if (window.lucide) window.lucide.createIcons();
});

// ---------------------------------------------------------------------------
// Navigation helpers
// ---------------------------------------------------------------------------
function navigateTo(sectionId) {
  setActiveSection(sectionId);
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function selectServiceToBook(serviceName) {
  preselectedService = serviceName;
  const fieldService = document.getElementById('field-service');
  if (fieldService) fieldService.value = serviceName;
  navigateTo('booking');
}

function setActiveSection(sectionId) {
  activeSection = sectionId;
  document.querySelectorAll('.nav-pill').forEach((btn) => {
    const isActive = btn.dataset.navLink === sectionId;
    btn.classList.toggle('text-[#2C2623]', isActive);
    btn.classList.toggle('bg-[#EFE4D6]', isActive);
    btn.classList.toggle('shadow-xs', isActive);
    btn.classList.toggle('text-[#62554B]', !isActive);
    btn.classList.toggle('hover:text-[#2C2623]', !isActive);
    btn.classList.toggle('hover:bg-[#F3EADF]', !isActive);
  });
  document.querySelectorAll('.nav-pill-mobile').forEach((btn) => {
    const isActive = btn.dataset.navLink === sectionId;
    btn.classList.toggle('bg-[#EFE4D6]', isActive);
    btn.classList.toggle('text-[#2C2623]', isActive);
    btn.classList.toggle('font-semibold', isActive);
    btn.classList.toggle('text-[#54463A]', !isActive);
    btn.classList.toggle('hover:bg-[#F3EADF]', !isActive);
  });
}

// Wire up every element with data-nav-link (logo, nav links, CTAs, footer links)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-nav-link]');
  if (!btn) return;
  navigateTo(btn.dataset.navLink);
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
});

// ---------------------------------------------------------------------------
// Initial loader (700ms, mirrors InitialLoader.tsx)
// ---------------------------------------------------------------------------
function initInitialLoader() {
  const loader = document.getElementById('initial-loader');
  setTimeout(() => {
    if (loader) loader.remove();
  }, 700);
}

// ---------------------------------------------------------------------------
// Scroll progress bar
// ---------------------------------------------------------------------------
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${progress}%`;
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// ---------------------------------------------------------------------------
// Navbar scrolled state
// ---------------------------------------------------------------------------
function initNavbar() {
  const header = document.getElementById('main-navbar');
  const scrolledClasses = ['bg-[#FAF7F2]/90', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-[#E8DDCF]'];
  const topClasses = ['bg-gradient-to-b', 'from-[#FAF7F2]/90', 'via-[#FAF7F2]/60', 'to-transparent'];

  const handleScroll = () => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled) {
      header.classList.remove(...topClasses);
      header.classList.add(...scrolledClasses);
    } else {
      header.classList.remove(...scrolledClasses);
      header.classList.add(...topClasses);
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    toggle.innerHTML = isOpen
      ? '<i data-lucide="menu" class="w-6 h-6"></i>'
      : '<i data-lucide="x" class="w-6 h-6"></i>';
    if (window.lucide) window.lucide.createIcons();
  });
}

// ---------------------------------------------------------------------------
// Active-section scroll spy (mirrors App.tsx's scroll handler)
// ---------------------------------------------------------------------------
function initSectionScrollSpy() {
  const sections = ['hero', 'about', 'services', 'why-choose-us', 'gallery', 'booking', 'location'];
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 200;
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };
  window.addEventListener('scroll', handleScroll);
}

// ---------------------------------------------------------------------------
// Services grid + filters
// ---------------------------------------------------------------------------
function renderServices() {
  const grid = document.getElementById('services-grid');
  const empty = document.getElementById('services-empty');
  const emptyQuery = document.getElementById('services-empty-query');

  const filtered = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = service.name.toLowerCase().includes(q) || service.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    empty.classList.remove('hidden');
    emptyQuery.textContent = searchQuery;
    return;
  }

  grid.classList.remove('hidden');
  empty.classList.add('hidden');

  grid.innerHTML = filtered.map((service) => `
    <div class="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DDCF] shadow-xs hover:shadow-md hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-[#F3EADF] flex items-center justify-center border border-[#E3D4C2] group-hover:scale-110 transition-transform duration-300">
            <i data-lucide="${SERVICE_ICONS[service.id] || 'droplets'}" class="w-6 h-6 text-[#8C6D53]"></i>
          </div>
          <span class="text-[11px] font-semibold tracking-wider text-[#8C6D53] uppercase bg-[#F3EADF] px-2.5 py-1 rounded-full border border-[#E3D4C2]">${service.category}</span>
        </div>
        <h3 class="font-serif-display text-xl font-bold text-[#2C2623] mb-2 group-hover:text-[#8C6D53] transition-colors">${service.name}</h3>
        <p class="text-xs sm:text-sm text-[#62554B] leading-relaxed mb-6">${service.description}</p>
      </div>
      <button data-book-service="${service.name.replace(/"/g, '&quot;')}" class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F3EADF] hover:bg-[#2C2623] text-[#2C2623] hover:text-[#FAF7F2] text-xs font-semibold transition-all duration-300 cursor-pointer group-hover:shadow-xs">
        <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
        <span>Book This Service</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function initServiceFilters() {
  const tabs = document.querySelectorAll('.category-tab');
  const activeClasses = ['bg-[#2C2623]', 'text-[#FAF7F2]', 'shadow-sm'];
  const inactiveClasses = ['bg-[#FAF7F2]', 'text-[#54463A]', 'hover:bg-[#EFE4D6]', 'border', 'border-[#E8DDCF]'];

  const applyTabStyles = () => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.category === selectedCategory;
      tab.classList.remove(...activeClasses, ...inactiveClasses);
      tab.classList.add(...(isActive ? activeClasses : inactiveClasses));
    });
  };
  applyTabStyles();

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      selectedCategory = tab.dataset.category;
      applyTabStyles();
      renderServices();
    });
  });

  const search = document.getElementById('service-search');
  search.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderServices();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    selectedCategory = 'All';
    searchQuery = '';
    search.value = '';
    applyTabStyles();
    renderServices();
  });

  // Delegate "Book This Service" clicks from the rendered grid
  document.getElementById('services-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-book-service]');
    if (!btn) return;
    selectServiceToBook(btn.dataset.bookService);
  });
}

// ---------------------------------------------------------------------------
// Happy clients counter (IntersectionObserver count-up)
// ---------------------------------------------------------------------------
function initHappyClientsCounter() {
  const section = document.getElementById('clients-counter-section');
  const countEl = document.getElementById('clients-count');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        let start = 0;
        const end = CLIENT_STAT.count;
        const duration = 2000;
        const incrementTime = 20;
        const steps = duration / incrementTime;
        const stepValue = end / steps;

        const timer = setInterval(() => {
          start += stepValue;
          if (start >= end) {
            countEl.textContent = end.toLocaleString();
            clearInterval(timer);
          } else {
            countEl.textContent = Math.floor(start).toLocaleString();
          }
        }, incrementTime);
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}

// ---------------------------------------------------------------------------
// Gallery lightbox
// ---------------------------------------------------------------------------
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const panel = document.getElementById('gallery-lightbox-panel');
  const img = document.getElementById('gallery-lightbox-img');
  const category = document.getElementById('gallery-lightbox-category');
  const title = document.getElementById('gallery-lightbox-title');
  const closeBtn = document.getElementById('gallery-lightbox-close');

  const open = (item) => {
    img.src = item.dataset.src;
    img.alt = item.dataset.alt;
    category.textContent = item.dataset.category;
    title.textContent = item.dataset.title;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
  };

  const close = () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  };

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => open(item));
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', close);
  panel.addEventListener('click', (e) => e.stopPropagation());
}

// ---------------------------------------------------------------------------
// Booking form (select options, validation, fake submit, confirmation modal)
// ---------------------------------------------------------------------------
const TIME_SLOTS = [
  '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '06:30 PM', '07:00 PM',
];

function renderBookingOptions() {
  const serviceSelect = document.getElementById('field-service');
  SERVICES.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = `${s.name} (${s.category})`;
    serviceSelect.appendChild(opt);
  });

  const timeSelect = document.getElementById('field-time');
  TIME_SLOTS.forEach((slot) => {
    const opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot;
    if (slot === '10:00 AM') opt.selected = true;
    timeSelect.appendChild(opt);
  });

  const dateField = document.getElementById('field-date');
  dateField.min = new Date().toISOString().split('T')[0];
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  const nameField = document.getElementById('field-name');
  const phoneField = document.getElementById('field-phone');
  const serviceField = document.getElementById('field-service');
  const dateField = document.getElementById('field-date');
  const timeField = document.getElementById('field-time');
  const messageField = document.getElementById('field-message');

  const errorFields = {
    name: document.getElementById('error-name'),
    phone: document.getElementById('error-phone'),
    service: document.getElementById('error-service'),
    date: document.getElementById('error-date'),
    time: document.getElementById('error-time'),
  };
  const inputFields = {
    name: nameField,
    phone: phoneField,
    service: serviceField,
    date: dateField,
    time: timeField,
  };

  const clearError = (key) => {
    errorFields[key].classList.add('hidden');
    inputFields[key].classList.remove('border-rose-400', 'bg-rose-50/50');
    inputFields[key].classList.add('border-[#E8DDCF]');
  };
  const setError = (key, message) => {
    errorFields[key].textContent = message;
    errorFields[key].classList.remove('hidden');
    inputFields[key].classList.remove('border-[#E8DDCF]');
    inputFields[key].classList.add('border-rose-400', 'bg-rose-50/50');
  };

  Object.keys(inputFields).forEach((key) => {
    inputFields[key].addEventListener('input', () => clearError(key));
    inputFields[key].addEventListener('change', () => clearError(key));
  });

  const validate = () => {
    let valid = true;
    Object.keys(inputFields).forEach(clearError);

    if (!nameField.value.trim()) {
      setError('name', 'Please enter your full name');
      valid = false;
    }
    if (!phoneField.value.trim()) {
      setError('phone', 'Please enter your phone number');
      valid = false;
    } else if (!/^[0-9+\s-]{8,15}$/.test(phoneField.value.trim())) {
      setError('phone', 'Please enter a valid phone number');
      valid = false;
    }
    if (!serviceField.value) {
      setError('service', 'Please select a service');
      valid = false;
    }
    if (!dateField.value) {
      setError('date', 'Please select your preferred date');
      valid = false;
    }
    if (!timeField.value) {
      setError('time', 'Please select a preferred time');
      valid = false;
    }
    return valid;
  };

  const submitBtn = document.getElementById('booking-submit');
  const submitLabel = document.getElementById('booking-submit-label');
  const submitSpinner = document.getElementById('booking-submit-spinner');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitLabel.classList.add('hidden');
    submitSpinner.classList.remove('hidden');

    try {
        const { data, error } = await supabase
  .from("appointments")
  .insert([
    {
      name: nameField.value,
      phone: phoneField.value,
      service: serviceField.value,
      date: dateField.value,
      time: timeField.value,
    },
  ])
  .select()
  .single();

if (error) throw error;

document.getElementById("confirm-id").textContent = data.id;
document.getElementById("confirm-name").textContent = nameField.value;
document.getElementById("confirm-phone").textContent = phoneField.value;
document.getElementById("confirm-service").textContent = serviceField.value;
document.getElementById("confirm-datetime").textContent =
`${dateField.value} at ${timeField.value}`;

const modal = document.getElementById("booking-confirmation");
modal.classList.remove("hidden");
modal.classList.add("flex");

    } catch (error) {
        alert(error.message);
    } finally {
        submitBtn.disabled = false;
        submitLabel.classList.remove("hidden");
        submitSpinner.classList.add("hidden");
    }
});

  const closeModal = () => {
    const modal = document.getElementById('booking-confirmation');
    modal.classList.add('hidden');
    modal.classList.remove('flex');

    form.reset();
    document.getElementById('field-time').value = '10:00 AM';
    Object.keys(inputFields).forEach(clearError);
    preselectedService = '';
  };

  document.getElementById('booking-confirmation-close').addEventListener('click', closeModal);
  document.getElementById('booking-confirmation-done').addEventListener('click', closeModal);
}

// ---------------------------------------------------------------------------
// Back to top button
// ---------------------------------------------------------------------------
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  const handleScroll = () => {
    btn.classList.toggle('hidden', window.scrollY <= 400);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
