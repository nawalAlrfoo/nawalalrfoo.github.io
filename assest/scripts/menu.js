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
// COMPLETE THEME MANAGEMENT
// ============================================
const ThemeManager = {
  // تعريف أنظمة الألوان المتكاملة مع الـ header والـ dark mode
  colorSchemes: {
    // الأزرق الداكن (الافتراضي - أول لون)
    darkblue: {
      name: 'Dark Blue',
      icon: '🔵',
      light: {
        bg1: '#ffffff',
        bg2: '#f3f6fa',
        card1: '#f4f7fa',
        card2: '#e9f0f6',
        text: '#1f2a33',
        muted: '#6c7a86',
        brand1: '#1f2f3d',
        brand2: '#9bb8d3',
        accent: '#e6c8d6',
        
        headerBg: '#1f2f3d',
        headerText: '#ffffff',
        headerHover: '#9bb8d3',
        
        gradient: 'linear-gradient(135deg, #1f2f3d, #9bb8d3)',
        headerGradient: 'linear-gradient(135deg, #1f2f3d, #2a3f52)',
        shadow: '0 20px 50px rgba(15,36,54,.12)',
        shadowSoft: '0 12px 28px rgba(15,36,54,.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(31,47,61,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(230,200,214,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#0a0f14',
        bg2: '#12181f',
        card1: '#1a222c',
        card2: '#151c25',
        text: '#f0f4f8',
        muted: '#a0aec0',
        brand1: '#b2c9df',
        brand2: '#4a6d8c',
        accent: '#d4a5bc',
        
        headerBg: '#0f151c',
        headerText: '#f0f4f8',
        headerHover: '#b2c9df',
        
        gradient: 'linear-gradient(135deg, #b2c9df, #4a6d8c)',
        headerGradient: 'linear-gradient(135deg, #0f151c, #1a222c)',
        shadowSoft: '0 12px 28px rgba(0, 0, 0, 0.4)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(74,109,140,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(212,165,188,0.08), transparent 55%)'
      }
    },
    
    // بينك
    pink: {
      name: 'Pink',
      icon: '🌸',
      light: {
        bg1: '#fff5f8',
        bg2: '#ffeef2',
        card1: '#ffe4e9',
        card2: '#ffd9e0',
        text: '#3d2a33',
        muted: '#9e6b7a',
        brand1: '#d48cb0',
        brand2: '#f8b0d0',
        accent: '#b86b9a',
        
        headerBg: '#d48cb0',
        headerText: '#ffffff',
        headerHover: '#f8b0d0',
        
        gradient: 'linear-gradient(135deg, #d48cb0, #f8b0d0)',
        headerGradient: 'linear-gradient(135deg, #d48cb0, #c47ca0)',
        shadow: '0 20px 50px rgba(212,140,176,0.15)',
        shadowSoft: '0 12px 28px rgba(212,140,176,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(212,140,176,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(248,176,208,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#1a1215',
        bg2: '#241a1d',
        card1: '#2e2226',
        card2: '#281c20',
        text: '#fce4ec',
        muted: '#e6a6b9',
        brand1: '#f8b0d0',
        brand2: '#d48cb0',
        accent: '#e06a9a',
        
        headerBg: '#2e2226',
        headerText: '#fce4ec',
        headerHover: '#f8b0d0',
        
        gradient: 'linear-gradient(135deg, #f8b0d0, #d48cb0)',
        headerGradient: 'linear-gradient(135deg, #2e2226, #3a2a30)',
        shadowSoft: '0 12px 28px rgba(212,140,176,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(212,140,176,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(248,176,208,0.08), transparent 55%)'
      }
    },
    
    // لافندر
    lavender: {
      name: 'Lavender',
      icon: '💜',
      light: {
        bg1: '#f8f5ff',
        bg2: '#f2edff',
        card1: '#ede5ff',
        card2: '#e6dcff',
        text: '#2a2350',
        muted: '#7f6e9e',
        brand1: '#9f8fdf',
        brand2: '#c7b9ff',
        accent: '#7a6ab0',
        
        headerBg: '#9f8fdf',
        headerText: '#ffffff',
        headerHover: '#c7b9ff',
        
        gradient: 'linear-gradient(135deg, #9f8fdf, #c7b9ff)',
        headerGradient: 'linear-gradient(135deg, #9f8fdf, #8f7fcf)',
        shadow: '0 20px 50px rgba(159,143,223,0.15)',
        shadowSoft: '0 12px 28px rgba(159,143,223,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(159,143,223,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(199,185,255,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#1a1726',
        bg2: '#231f30',
        card1: '#2c273a',
        card2: '#262233',
        text: '#f0eaff',
        muted: '#b5a6d9',
        brand1: '#c7b9ff',
        brand2: '#9f8fdf',
        accent: '#8a7ac0',
        
        headerBg: '#2c273a',
        headerText: '#f0eaff',
        headerHover: '#c7b9ff',
        
        gradient: 'linear-gradient(135deg, #c7b9ff, #9f8fdf)',
        headerGradient: 'linear-gradient(135deg, #2c273a, #363045)',
        shadowSoft: '0 12px 28px rgba(159,143,223,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(159,143,223,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(199,185,255,0.08), transparent 55%)'
      }
    },
    
    // أخضر
    green: {
      name: 'Green',
      icon: '🌿',
      light: {
        bg1: '#f0f9f4',
        bg2: '#e8f5ee',
        card1: '#e0f1e8',
        card2: '#d6ece2',
        text: '#1a3a2a',
        muted: '#5f8b73',
        brand1: '#7bc9a5',
        brand2: '#a8e6cf',
        accent: '#5aa582',
        
        headerBg: '#7bc9a5',
        headerText: '#ffffff',
        headerHover: '#a8e6cf',
        
        gradient: 'linear-gradient(135deg, #7bc9a5, #a8e6cf)',
        headerGradient: 'linear-gradient(135deg, #7bc9a5, #6bb995)',
        shadow: '0 20px 50px rgba(123,201,165,0.15)',
        shadowSoft: '0 12px 28px rgba(123,201,165,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(123,201,165,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(168,230,207,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#142118',
        bg2: '#1b2a21',
        card1: '#22332a',
        card2: '#1d2c23',
        text: '#e0f2e9',
        muted: '#a3d1bb',
        brand1: '#a8e6cf',
        brand2: '#7bc9a5',
        accent: '#6ab592',
        
        headerBg: '#22332a',
        headerText: '#e0f2e9',
        headerHover: '#a8e6cf',
        
        gradient: 'linear-gradient(135deg, #a8e6cf, #7bc9a5)',
        headerGradient: 'linear-gradient(135deg, #22332a, #2b3f34)',
        shadowSoft: '0 12px 28px rgba(123,201,165,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(123,201,165,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(168,230,207,0.08), transparent 55%)'
      }
    },
    
    // أزرق فاتح
    blue: {
      name: 'Blue',
      icon: '💙',
      light: {
        bg1: '#f0f7ff',
        bg2: '#e8f2ff',
        card1: '#e0ecff',
        card2: '#d6e5ff',
        text: '#1a3a5a',
        muted: '#5f8bb0',
        brand1: '#6ba6e3',
        brand2: '#9ac7ff',
        accent: '#4a7db0',
        
        headerBg: '#6ba6e3',
        headerText: '#ffffff',
        headerHover: '#9ac7ff',
        
        gradient: 'linear-gradient(135deg, #6ba6e3, #9ac7ff)',
        headerGradient: 'linear-gradient(135deg, #6ba6e3, #5b96d3)',
        shadow: '0 20px 50px rgba(107,166,227,0.15)',
        shadowSoft: '0 12px 28px rgba(107,166,227,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(107,166,227,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(154,199,255,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#141f2a',
        bg2: '#1a2735',
        card1: '#202f40',
        card2: '#1b2938',
        text: '#e0f0ff',
        muted: '#9fc1e6',
        brand1: '#9ac7ff',
        brand2: '#6ba6e3',
        accent: '#5a96d0',
        
        headerBg: '#202f40',
        headerText: '#e0f0ff',
        headerHover: '#9ac7ff',
        
        gradient: 'linear-gradient(135deg, #9ac7ff, #6ba6e3)',
        headerGradient: 'linear-gradient(135deg, #202f40, #2a3b50)',
        shadowSoft: '0 12px 28px rgba(107,166,227,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(107,166,227,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(154,199,255,0.08), transparent 55%)'
      }
    },
    
    // بيچ
    peach: {
      name: 'Peach',
      icon: '🍑',
      light: {
        bg1: '#fff7f0',
        bg2: '#fff2e8',
        card1: '#ffebe0',
        card2: '#ffe4d6',
        text: '#5a3a2a',
        muted: '#b08a6f',
        brand1: '#ffa07a',
        brand2: '#ffc8b0',
        accent: '#e07a5a',
        
        headerBg: '#ffa07a',
        headerText: '#ffffff',
        headerHover: '#ffc8b0',
        
        gradient: 'linear-gradient(135deg, #ffa07a, #ffc8b0)',
        headerGradient: 'linear-gradient(135deg, #ffa07a, #f0906a)',
        shadow: '0 20px 50px rgba(255,160,122,0.15)',
        shadowSoft: '0 12px 28px rgba(255,160,122,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(255,160,122,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(255,200,176,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#2a1e17',
        bg2: '#35261d',
        card1: '#402e23',
        card2: '#38281e',
        text: '#ffe8dc',
        muted: '#ffbba6',
        brand1: '#ffc8b0',
        brand2: '#ffa07a',
        accent: '#e08a6a',
        
        headerBg: '#402e23',
        headerText: '#ffe8dc',
        headerHover: '#ffc8b0',
        
        gradient: 'linear-gradient(135deg, #ffc8b0, #ffa07a)',
        headerGradient: 'linear-gradient(135deg, #402e23, #4d382b)',
        shadowSoft: '0 12px 28px rgba(255,160,122,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(255,160,122,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(255,200,176,0.08), transparent 55%)'
      }
    },
    
    // منت (Mint)
    mint: {
      name: 'Mint',
      icon: '🌱',
      light: {
        bg1: '#f0faf8',
        bg2: '#e8f7f3',
        card1: '#e0f4ee',
        card2: '#d6f0e9',
        text: '#1a4a40',
        muted: '#5f9e8f',
        brand1: '#8fc0b0',
        brand2: '#b0e0d0',
        accent: '#6a9c8a',
        
        headerBg: '#8fc0b0',
        headerText: '#ffffff',
        headerHover: '#b0e0d0',
        
        gradient: 'linear-gradient(135deg, #8fc0b0, #b0e0d0)',
        headerGradient: 'linear-gradient(135deg, #8fc0b0, #7fb0a0)',
        shadow: '0 20px 50px rgba(143,192,176,0.15)',
        shadowSoft: '0 12px 28px rgba(143,192,176,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(143,192,176,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(176,224,208,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#142521',
        bg2: '#1a2f2a',
        card1: '#203933',
        card2: '#1b312b',
        text: '#e0f2ec',
        muted: '#aad9cc',
        brand1: '#b0e0d0',
        brand2: '#8fc0b0',
        accent: '#7aac9a',
        
        headerBg: '#203933',
        headerText: '#e0f2ec',
        headerHover: '#b0e0d0',
        
        gradient: 'linear-gradient(135deg, #b0e0d0, #8fc0b0)',
        headerGradient: 'linear-gradient(135deg, #203933, #29463e)',
        shadowSoft: '0 12px 28px rgba(143,192,176,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(143,192,176,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(176,224,208,0.08), transparent 55%)'
      }
    },
    
    // بيربل
    purple: {
      name: 'Purple',
      icon: '🟣',
      light: {
        bg1: '#faf5ff',
        bg2: '#f5edff',
        card1: '#f0e5ff',
        card2: '#eadcff',
        text: '#3a2a5a',
        muted: '#8f6fb0',
        brand1: '#b28aff',
        brand2: '#d9b0ff',
        accent: '#8a5ae0',
        
        headerBg: '#b28aff',
        headerText: '#ffffff',
        headerHover: '#d9b0ff',
        
        gradient: 'linear-gradient(135deg, #b28aff, #d9b0ff)',
        headerGradient: 'linear-gradient(135deg, #b28aff, #a27aef)',
        shadow: '0 20px 50px rgba(178,138,255,0.15)',
        shadowSoft: '0 12px 28px rgba(178,138,255,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(178,138,255,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(217,176,255,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#1f1730',
        bg2: '#281d3d',
        card1: '#31234a',
        card2: '#2a1e40',
        text: '#f0e6ff',
        muted: '#cbadff',
        brand1: '#d9b0ff',
        brand2: '#b28aff',
        accent: '#9a6af0',
        
        headerBg: '#31234a',
        headerText: '#f0e6ff',
        headerHover: '#d9b0ff',
        
        gradient: 'linear-gradient(135deg, #d9b0ff, #b28aff)',
        headerGradient: 'linear-gradient(135deg, #31234a, #3d2c5a)',
        shadowSoft: '0 12px 28px rgba(178,138,255,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(178,138,255,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(217,176,255,0.08), transparent 55%)'
      }
    },
    
    // كورال
    coral: {
      name: 'Coral',
      icon: '🪸',
      light: {
        bg1: '#fff5f2',
        bg2: '#ffeeea',
        card1: '#ffe7e2',
        card2: '#ffdfd9',
        text: '#5a2e2a',
        muted: '#b0766f',
        brand1: '#ff8a8a',
        brand2: '#ffb0b0',
        accent: '#e05a5a',
        
        headerBg: '#ff8a8a',
        headerText: '#ffffff',
        headerHover: '#ffb0b0',
        
        gradient: 'linear-gradient(135deg, #ff8a8a, #ffb0b0)',
        headerGradient: 'linear-gradient(135deg, #ff8a8a, #ef7a7a)',
        shadow: '0 20px 50px rgba(255,138,138,0.15)',
        shadowSoft: '0 12px 28px rgba(255,138,138,0.10)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(255,138,138,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(255,176,176,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#2a1918',
        bg2: '#35201e',
        card1: '#402724',
        card2: '#38211f',
        text: '#ffe4e2',
        muted: '#ffb6b6',
        brand1: '#ffb0b0',
        brand2: '#ff8a8a',
        accent: '#e06a6a',
        
        headerBg: '#402724',
        headerText: '#ffe4e2',
        headerHover: '#ffb0b0',
        
        gradient: 'linear-gradient(135deg, #ffb0b0, #ff8a8a)',
        headerGradient: 'linear-gradient(135deg, #402724, #4d312e)',
        shadowSoft: '0 12px 28px rgba(255,138,138,0.3)',
        
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(255,138,138,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(255,176,176,0.08), transparent 55%)'
      }
    }
  },

  init() {
    this.initThemeToggle();
    this.createThemeCustomizer();
    this.loadSavedTheme();
    this.applyHeaderStyles();
  },

  // تطبيق أنماط الـ header
  applyHeaderStyles() {
    if (!document.getElementById('header-styles')) {
      const style = document.createElement('style');
      style.id = 'header-styles';
      style.textContent = `
        header {
          background: var(--headerBg) !important;
          color: var(--headerText) !important;
          transition: all 0.3s ease;
        }
        
        header a, 
        header #name, 
        header .nav-right a,
        header .menu-btn {
          color: var(--headerText) !important;
          transition: all 0.3s ease;
        }
        
        header a:hover, 
        header .nav-right a:hover,
        header .menu-btn:hover {
          color: var(--headerHover) !important;
        }
        
        .menu-btn span {
          background: var(--headerText) !important;
        }
      `;
      document.head.appendChild(style);
    }
  },

  // تبديل الوضع الفاتح/الداكن
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

    // Load saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
      updateToggleUI(true);
    }

    themeToggle.addEventListener('click', () => {
      const isDarkNow = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
      updateToggleUI(isDarkNow);
      
      const currentScheme = localStorage.getItem('userColorScheme') || 'darkblue';
      this.applyColorScheme(currentScheme);
    });
  },

  // إنشاء لوحة تخصيص الألوان
  createThemeCustomizer() {
    if (!document.querySelector('.theme-customizer-btn')) {
      const customizerBtn = document.createElement('div');
      customizerBtn.className = 'theme-customizer-btn';
      customizerBtn.style.top = '215px';
      customizerBtn.innerHTML = '<i class="fa-solid fa-palette"></i>';
      customizerBtn.setAttribute('title', 'تخصيص الألوان');
      document.body.appendChild(customizerBtn);

      const palettePanel = document.createElement('div');
      palettePanel.className = 'theme-customizer-panel';
      palettePanel.style.top = '280px';
      
      const colorOptions = [
        'darkblue', 'pink', 'lavender', 'green', 
        'blue', 'peach', 'mint', 'purple', 'coral'
      ].map(color => 
        `<div class="color-option" data-color="${color}" title="${this.colorSchemes[color].name}" style="background: ${this.colorSchemes[color].light.gradient}"></div>`
      ).join('');

      palettePanel.innerHTML = `
        <div class="panel-header">
          <h3>Customize Theme</h3>
          <button class="close-panel" aria-label="Close"><i class="fa-solid fa-times"></i></button>
        </div>
        
        <div class="panel-section">
          <h4>Color Schemes</h4>
          <div class="color-grid">
            ${colorOptions}
          </div>
        </div>
        
        <div class="panel-section">
          <h4>Theme Mode</h4>
          <div class="theme-mode-options">
            <div class="mode-option" data-mode="light">
              <i class="fa-solid fa-sun"></i>
              <span>Light</span>
            </div>
            <div class="mode-option" data-mode="dark">
              <i class="fa-solid fa-moon"></i>
              <span>Dark</span>
            </div>
          </div>
        </div>
        
        <button class="reset-theme">
          <i class="fa-solid fa-rotate-left"></i>
          Reset to Default
        </button>
      `;
      
      document.body.appendChild(palettePanel);
      this.initCustomizerEvents(customizerBtn, palettePanel);
    }
  },

  // تطبيق نظام الألوان الكامل
  applyColorScheme(schemeName) {
    const scheme = this.colorSchemes[schemeName];
    if (!scheme) return;

    const isDark = document.body.classList.contains('dark');
    const colors = isDark ? scheme.dark : scheme.light;

    // تحديث جميع متغيرات CSS
    Object.keys(colors).forEach(key => {
      if (key !== 'radial1' && key !== 'radial2') {
        document.documentElement.style.setProperty(`--${key}`, colors[key]);
      }
    });

    // تحديث الخلفية مع التدرجات الشعاعية
    document.body.style.background = `
      ${colors.radial1},
      ${colors.radial2},
      ${colors.bg1}
    `;

    // تحديث الـ header مباشرة
    const header = document.querySelector('header');
    if (header) {
      header.style.background = colors.headerBg;
      header.style.color = colors.headerText;
    }

    localStorage.setItem('userColorScheme', schemeName);
    
    const customizerBtn = document.querySelector('.theme-customizer-btn');
    if (customizerBtn) {
      customizerBtn.style.background = colors.gradient;
    }
  },

  // تهيئة أحداث المخصص
  initCustomizerEvents(btn, panel) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });

    const closeBtn = panel.querySelector('.close-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    const colorOptions = panel.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const colorName = option.dataset.color;
        this.applyColorScheme(colorName);
        
        setTimeout(() => {
          panel.classList.remove('open');
        }, 500);
      });
    });

    const modeOptions = panel.querySelectorAll('.mode-option');
    modeOptions.forEach(option => {
      option.addEventListener('click', () => {
        modeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const mode = option.dataset.mode;
        document.body.classList.toggle('dark', mode === 'dark');
        localStorage.setItem('theme', mode);
        
        const currentScheme = localStorage.getItem('userColorScheme') || 'darkblue';
        this.applyColorScheme(currentScheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
          themeToggle.innerHTML = mode === 'dark' 
            ? '<i class="fa-solid fa-sun"></i>' 
            : '<i class="fa-solid fa-moon"></i>';
        }
      });
    });

    // زر إعادة التعيين
    const resetBtn = panel.querySelector('.reset-theme');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetToDefault();
        
        colorOptions.forEach(opt => opt.classList.remove('active'));
        modeOptions.forEach(opt => opt.classList.remove('active'));
        
        const defaultColor = Array.from(colorOptions).find(opt => opt.dataset.color === 'darkblue');
        if (defaultColor) defaultColor.classList.add('active');
        
        const lightMode = Array.from(modeOptions).find(opt => opt.dataset.mode === 'light');
        if (lightMode) lightMode.classList.add('active');
        
        this.showNotification('Theme reset to default Dark Blue!');
      });
    }

    this.loadSavedSettings(colorOptions, modeOptions);
  },

  // تحميل الإعدادات المحفوظة
  loadSavedSettings(colorOptions, modeOptions) {
    const savedScheme = localStorage.getItem('userColorScheme');
    if (savedScheme && this.colorSchemes[savedScheme]) {
      this.applyColorScheme(savedScheme);
      
      colorOptions.forEach(opt => {
        if (opt.dataset.color === savedScheme) {
          opt.classList.add('active');
        }
      });
    } else {
      const defaultColor = Array.from(colorOptions).find(opt => opt.dataset.color === 'darkblue');
      if (defaultColor) {
        defaultColor.classList.add('active');
        this.applyColorScheme('darkblue');
      }
    }

    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      document.body.classList.toggle('dark', savedMode === 'dark');
      
      modeOptions.forEach(opt => {
        if (opt.dataset.mode === savedMode) {
          opt.classList.add('active');
        }
      });
    } else {
      const lightMode = Array.from(modeOptions).find(opt => opt.dataset.mode === 'light');
      if (lightMode) lightMode.classList.add('active');
    }
  },

  loadSavedTheme() {
    const savedScheme = localStorage.getItem('userColorScheme');
    if (savedScheme && this.colorSchemes[savedScheme]) {
      this.applyColorScheme(savedScheme);
    } else {
      this.applyColorScheme('darkblue');
    }
    
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      document.body.classList.toggle('dark', savedMode === 'dark');
    }
  },

  resetToDefault() {
    localStorage.removeItem('userColorScheme');
    localStorage.removeItem('theme');
    
    document.body.classList.remove('dark');
    this.applyColorScheme('darkblue');
  },

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--brand1);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      z-index: 999999;
      animation: slideIn 0.3s ease;
      font-family: sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
};

// ============================================
// INITIALIZE ALL MODULES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initCollapsibleSections();
  initMobileMenu();
  initContactForm();
  initProjectsAccordion();
  ThemeManager.init();
});

// إضافة أنيميشن إضافي للإشعارات
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .theme-customizer-btn.notification {
    animation: pulse 0.5s ease;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

document.head.appendChild(style);