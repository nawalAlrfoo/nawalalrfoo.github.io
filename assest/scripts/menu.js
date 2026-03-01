// ============================================
// UTILITIES & HELPERS
// ============================================
const toggleBodyScroll = (disable) => {
  document.body.style.overflow = disable ? 'hidden' : '';
};

// ============================================
// COLLAPSIBLE SECTIONS (Closed by Default)
// ============================================
const initCollapsibleSections = () => {
  const sections = document.querySelectorAll('section:not(.hero)');
  
  sections.forEach(section => {
    const header = section.querySelector('h2, .contact-header');
    const content = section.querySelector('.section-content');
    
    if (!header || !content) return;
    
    // إخفاء المحتوى افتراضياً
    content.style.display = 'none';
    
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
      // فتح أو غلق السكشن
      const isOpen = section.classList.toggle('is-open');
      content.style.display = isOpen ? 'flex' : 'none';
    });
  });
};

// ============================================
// MOBILE MENU
// ============================================
const initMobileMenu = () => {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('siteNav');
  const overlay = document.getElementById('overlay');
  
  if (!menuBtn || !nav || !overlay) return;

  const openMenu = () => {
    nav.classList.add('open');
    overlay.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    toggleBodyScroll(true);
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    overlay.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    toggleBodyScroll(false);
  };

  menuBtn.addEventListener('click', () => {
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
};

// ============================================
// EMAILJS CONTACT FORM
// ============================================
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  emailjs.init('4TL6XDLiwaI_U6Cza');

  const btn = document.getElementById('submit-btn');
  const messageBox = document.getElementById('form-message');
  const btnText = btn.querySelector('.btn-text');

  const setLoadingState = (isLoading) => {
    btn.classList.toggle('loading', isLoading);
    btnText.textContent = isLoading ? 'Sending...' : 'Send Message';
    messageBox.textContent = '';
  };

  const showMessage = (text, type) => {
    messageBox.textContent = text;
    messageBox.className = `form-message ${type}`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setLoadingState(true);

    emailjs.sendForm('service_7xqpa4g', 'template_mcebsl8', form)
      .then(() => {
        setLoadingState(false);
        showMessage('Message sent successfully ✨', 'success');
        form.reset();
      })
      .catch(() => {
        setLoadingState(false);
        showMessage('Something went wrong. Try again.', 'error');
      });
  });
};

// ============================================
// PROJECTS ACCORDION
// ============================================
const initProjectsAccordion = () => {
  const projectTitles = document.querySelectorAll('.projects dt');
  
  projectTitles.forEach(title => {
    const description = title.nextElementSibling;
    if (!description || description.tagName !== 'DD') return;
    
    // إخفاء الوصف افتراضياً
    description.style.display = 'none';
    
    title.addEventListener('click', () => {
      title.classList.toggle('active');
      description.style.display = 
        description.style.display === 'block' ? 'none' : 'block';
    });
  });
};

// ============================================
// THEME MANAGEMENT
// ============================================
const ThemeManager = {
  init() {
    this.initThemeToggle();
    this.initThemeModal();
  },

  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const updateToggleUI = (isDark) => {
      themeToggle.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
      
      themeToggle.style.transform = 'scale(1.1)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
      }, 400);
    };

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
      updateToggleUI(true);
    } else {
      updateToggleUI(false);
    }

    themeToggle.addEventListener('click', () => {
      const isDarkNow = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
      updateToggleUI(isDarkNow);
    });
  },

  initThemeModal() {
    const themeModal = document.getElementById('themeModal');
    if (!themeModal) return;

    const modeBtns = document.querySelectorAll('.mode-btn');
    const colorOpts = document.querySelectorAll('.color-opt');

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const isDark = btn.dataset.mode === 'dark';
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('theme', btn.dataset.mode);
      });
    });

    colorOpts.forEach(opt => {
      opt.addEventListener('click', () => {
        colorOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        
        const selectedColor = opt.dataset.color;
        document.documentElement.style.setProperty('--brand1', selectedColor);
        localStorage.setItem('mainColor', selectedColor);
      });
    });

    const savedColor = localStorage.getItem('mainColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--brand1', savedColor);
      const activeColor = document.querySelector(`.color-opt[data-color="${savedColor}"]`);
      if (activeColor) activeColor.classList.add('active');
    }
  }
};

// ============================================
// INITIALIZE ALL MODULES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initCollapsibleSections();  // الأقسام مغلقة افتراضياً
  initMobileMenu();
  initContactForm();
  initProjectsAccordion();    // المشاريع مغلقة افتراضياً
  ThemeManager.init();
});