// ============================================
// UTILITIES & HELPERS
// ============================================
const toggleBodyScroll = (disable) => {
  document.body.style.overflow = disable ? 'hidden' : '';
  document.body.style.paddingRight = disable ? '15px' : '';
};

// ============================================
// RESPONSIVE DESIGN MANAGER
// ============================================
const ResponsiveManager = {
  breakpoints: {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1440
  },

  init() {
    this.checkScreenSize();
    this.setViewportHeight();
    this.initOrientationHandler();
    this.initResizeHandler();
    this.adjustForTouchDevices();
    this.addResponsiveClasses();
    this.fixPanelPositions();
  },

  checkScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = this.getDeviceType(width);
    
    document.body.classList.remove('mobile-view', 'tablet-view', 'laptop-view', 'desktop-view', 'wide-view');
    document.body.classList.add(`${deviceType}-view`);
    
    document.documentElement.style.setProperty('--viewport-width', `${width}px`);
    document.documentElement.style.setProperty('--viewport-height', `${height}px`);
    
    return { width, height, deviceType };
  },

  getDeviceType(width) {
    if (width <= this.breakpoints.mobile) return 'mobile';
    if (width <= this.breakpoints.tablet) return 'tablet';
    if (width <= this.breakpoints.laptop) return 'laptop';
    if (width <= this.breakpoints.desktop) return 'desktop';
    return 'wide';
  },

  setViewportHeight() {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);
  },

  initOrientationHandler() {
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.checkScreenSize();
        this.adjustForOrientation();
      }, 100);
    });
  },

  adjustForOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    document.body.classList.toggle('landscape', isLandscape);
    document.body.classList.toggle('portrait', !isLandscape);
    
    if (isLandscape && window.innerWidth <= this.breakpoints.tablet) {
      this.adjustForMobileLandscape();
    }
  },

  adjustForMobileLandscape() {
    const panels = document.querySelectorAll('.theme-customizer-panel, .font-size-panel');
    panels.forEach(panel => {
      panel.style.maxHeight = '80vh';
      panel.style.overflowY = 'auto';
    });
  },

  initResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.checkScreenSize();
        this.adjustElementsForScreen();
      }, 150);
    });
  },

  adjustElementsForScreen() {
    const width = window.innerWidth;
    this.adjustButtonsPosition(width);
    this.adjustFontSizeForScreen(width);
    this.adjustSpacing(width);
  },

  adjustButtonsPosition(width) {
    const themeBtn = document.querySelector('.theme-customizer-btn');
    const fontSizeBtn = document.querySelector('.font-size-btn');
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeBtn || !fontSizeBtn || !themeToggle) return;
    
    if (width <= 480) {
      themeBtn.style.top = '100px';
      themeBtn.style.right = '15px';
      
      fontSizeBtn.style.top = '165px';
      fontSizeBtn.style.right = '15px';
      
      themeToggle.style.top = '230px';
      themeToggle.style.right = '15px';
      
    } else if (width <= 768) {
      themeBtn.style.top = '120px';
      themeBtn.style.right = '20px';
      
      fontSizeBtn.style.top = '190px';
      fontSizeBtn.style.right = '20px';
      
      themeToggle.style.top = '260px';
      themeToggle.style.right = '20px';
      
    } else if (width <= 1024) {
      themeBtn.style.top = '140px';
      themeBtn.style.right = '30px';
      
      fontSizeBtn.style.top = '215px';
      fontSizeBtn.style.right = '30px';
      
      themeToggle.style.top = '290px';
      themeToggle.style.right = '30px';
      
    } else {
      themeBtn.style.top = '150px';
      themeBtn.style.right = '30px';
      
      fontSizeBtn.style.top = '230px';
      fontSizeBtn.style.right = '30px';
      
      themeToggle.style.top = '310px';
      themeToggle.style.right = '30px';
    }
  },

  adjustFontSizeForScreen(width) {
    const savedSize = localStorage.getItem('userFontSize');
    if (savedSize) return;
    
    if (width <= 480) {
      document.documentElement.style.setProperty('--responsive-scale', '0.85');
    } else if (width <= 768) {
      document.documentElement.style.setProperty('--responsive-scale', '0.9');
    } else if (width <= 1024) {
      document.documentElement.style.setProperty('--responsive-scale', '0.95');
    } else {
      document.documentElement.style.setProperty('--responsive-scale', '1');
    }
  },

  adjustSpacing(width) {
    if (width <= 480) {
      document.documentElement.style.setProperty('--section-padding', '15px');
      document.documentElement.style.setProperty('--container-margin', '10px');
    } else if (width <= 768) {
      document.documentElement.style.setProperty('--section-padding', '20px');
      document.documentElement.style.setProperty('--container-margin', '15px');
    } else {
      document.documentElement.style.setProperty('--section-padding', '30px');
      document.documentElement.style.setProperty('--container-margin', '20px');
    }
  },

  adjustForTouchDevices() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
      document.body.classList.add('touch-device');
      
      const style = document.createElement('style');
      style.textContent = `
        .touch-device .btn-custom,
        .touch-device #submit-btn,
        .touch-device .menu-btn,
        .touch-device .color-option,
        .touch-device .size-option,
        .touch-device .mode-option {
          min-height: 44px;
          min-width: 44px;
        }
        
        .touch-device .nav-right a {
          padding: 12px 20px;
        }
        
        .touch-device input,
        .touch-device textarea {
          font-size: 16px !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.classList.add('mouse-device');
    }
  },

  fixPanelPositions() {
    const style = document.createElement('style');
    style.textContent = `
      .theme-customizer-panel {
        position: fixed;
        top: 150px !important;
        right: 100px !important;
        z-index: 999998;
      }
      
      .font-size-panel {
        position: fixed;
        top: 230px !important;
        right: 100px !important;
        z-index: 999998;
      }
      
      @media (max-width: 768px) {
        .theme-customizer-panel {
          top: 120px !important;
          right: 80px !important;
        }
        
        .font-size-panel {
          top: 190px !important;
          right: 80px !important;
        }
      }
      
      @media (max-width: 480px) {
        .theme-customizer-panel {
          top: 100px !important;
          right: 70px !important;
        }
        
        .font-size-panel {
          top: 165px !important;
          right: 70px !important;
        }
      }
      
      @media (orientation: landscape) and (max-height: 500px) {
        .theme-customizer-panel {
          top: 80px !important;
          max-height: 70vh;
        }
        
        .font-size-panel {
          top: 80px !important;
          max-height: 70vh;
        }
      }
    `;
    document.head.appendChild(style);
  },

  addResponsiveClasses() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --responsive-scale: 1;
        --section-padding: 30px;
        --container-margin: 20px;
        --safe-area-inset-top: env(safe-area-inset-top, 0px);
        --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        --safe-area-inset-left: env(safe-area-inset-left, 0px);
        --safe-area-inset-right: env(safe-area-inset-right, 0px);
      }
      
      body {
        padding-top: var(--safe-area-inset-top);
        padding-bottom: var(--safe-area-inset-bottom);
        padding-left: var(--safe-area-inset-left);
        padding-right: var(--safe-area-inset-right);
      }
      
      h1 {
        font-size: clamp(1.8rem, 5vw, 3.5rem);
      }
      
      h2 {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
      }
      
      h3 {
        font-size: clamp(1.2rem, 3vw, 2rem);
      }
      
      body {
        font-size: clamp(0.9rem, 2vw, 1.1rem);
      }
      
      .btn-custom, #submit-btn {
        font-size: clamp(0.9rem, 2vw, 1rem);
      }
      
      @media (max-width: 768px) {
        section {
          padding: var(--section-padding) !important;
          margin: var(--container-margin) auto !important;
        }
        
        h1 {
          font-size: calc(var(--font-size-h1) * var(--responsive-scale));
        }
        
        h2 {
          font-size: calc(var(--font-size-h2) * var(--responsive-scale));
        }
        
        h3 {
          font-size: calc(var(--font-size-h3) * var(--responsive-scale));
        }
        
        body {
          font-size: calc(var(--font-size-body) * var(--responsive-scale));
        }
        
        .btn-custom, #submit-btn {
          font-size: calc(var(--font-size-btn) * var(--responsive-scale));
        }
      }
      
      @media (max-width: 480px) {
        .profile-wrap {
          flex: 0 0 100%;
          justify-content: center;
        }
        
        .profile-wrap img {
          width: 120px;
          height: 120px;
        }
        
        .hero-text {
          text-align: center;
          align-items: center;
        }
        
        .buttons-group {
          flex-direction: column;
          width: 100%;
        }
        
        .btn-custom, #submit-btn {
          width: 100%;
          text-align: center;
          justify-content: center;
        }
        
        .contact .buttons-group {
          flex-direction: column;
        }
        
        .cards-grid {
          grid-template-columns: 1fr;
        }
      }
      
      @media (min-width: 769px) and (max-width: 1024px) {
        .cards-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (min-width: 1025px) and (max-width: 1366px) {
        .cards-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (min-width: 1440px) {
        section {
          max-width: 1400px;
        }
        
        .cards-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (min-width: 2000px) {
        section {
          max-width: 1800px;
        }
        
        .profile-wrap img {
          width: 200px;
          height: 200px;
        }
        
        .cards-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      
      @media (orientation: landscape) and (max-height: 500px) {
        header {
          padding: 5px 15px;
        }
        
        #name {
          font-size: 1.2rem;
        }
        
        .hero {
          padding: 20px !important;
        }
        
        .profile-wrap img {
          width: 80px;
          height: 80px;
        }
        
        .theme-customizer-panel,
        .font-size-panel {
          max-height: 80vh;
          overflow-y: auto;
        }
      }
      
      @media (max-width: 280px) {
        .color-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        
        .size-option {
          flex-direction: column;
          gap: 5px;
        }
        
        .size-preview {
          flex-direction: row;
          min-width: auto;
        }
        
        .theme-mode-options {
          flex-direction: column;
        }
        
        .mode-option {
          flex-direction: row;
          justify-content: center;
        }
      }
      
      @media (hover: none) and (pointer: coarse) {
        .btn-custom, 
        #submit-btn,
        .menu-btn,
        .color-option,
        .size-option,
        .mode-option {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        
        .btn-custom:active,
        #submit-btn:active {
          transform: scale(0.95);
        }
      }
      
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      @media (prefers-contrast: high) {
        .btn-custom,
        #submit-btn {
          border: 2px solid currentColor;
        }
        
        section {
          border: 2px solid currentColor;
        }
      }
      
      @media print {
        .theme-customizer-btn,
        .font-size-btn,
        #themeToggle,
        .menu-btn,
        .buttons-group,
        .contact-form {
          display: none !important;
        }
      }
      
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .profile-wrap img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      }
      
      .cards-grid {
        container-type: inline-size;
        container-name: cards;
      }
      
      @container cards (max-width: 500px) {
        .card {
          padding: 15px;
        }
      }
      
      img[loading="lazy"] {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      img.loaded {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
};

// ============================================
// FONT SIZE MANAGER
// ============================================
const FontSizeManager = {
  sizes: {
    small: {
      name: 'Small',
      icon: '🔤',
      desc: 'Compact',
      root: '14px',
      h1: '2rem',
      h2: '1.75rem',
      h3: '1.5rem',
      body: '0.9rem',
      btn: '0.9rem'
    },
    medium: {
      name: 'Medium',
      icon: '🔤',
      desc: 'Default',
      root: '16px',
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.75rem',
      body: '1rem',
      btn: '1rem'
    },
    large: {
      name: 'Large',
      icon: '🔤',
      desc: 'Comfortable',
      root: '18px',
      h1: '3rem',
      h2: '2.5rem',
      h3: '2rem',
      body: '1.1rem',
      btn: '1.1rem'
    },
    xlarge: {
      name: 'X-Large',
      icon: '🔤',
      desc: 'Accessible',
      root: '20px',
      h1: '3.5rem',
      h2: '3rem',
      h3: '2.5rem',
      body: '1.2rem',
      btn: '1.2rem'
    }
  },

  init() {
    this.createFontSizeButton();
    this.createFontSizePanel();
    this.loadSavedFontSize();
  },

  createFontSizeButton() {
    if (document.querySelector('.font-size-btn')) return;

    const btn = document.createElement('div');
    btn.className = 'font-size-btn';
    btn.setAttribute('data-tooltip', 'Text Size');
    btn.style.cssText = `
      position: fixed;
      top: 230px;
      right: 30px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: var(--btn-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999999;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    document.body.appendChild(btn);

    return btn;
  },

  createFontSizePanel() {
    if (document.querySelector('.font-size-panel')) return;

    const panel = document.createElement('div');
    panel.className = 'font-size-panel';
    panel.style.cssText = `
      position: fixed;
      top: 230px;
      right: 100px;
      background: var(--card1);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-radius: 20px;
      padding: 15px;
      box-shadow: var(--shadow-soft);
      border: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 999998;
      display: none;
      flex-direction: column;
      gap: 12px;
      min-width: 240px;
      max-width: 260px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
    `;

    const sizeOptions = Object.entries(this.sizes).map(([key, size]) => `
      <div class="size-option" data-size="${key}">
        <div class="size-info">
          <span class="size-name">${size.name}</span>
          <span class="size-desc">${size.desc}</span>
        </div>
        <div class="size-preview">
          <span class="preview-letter ${key === 'small' ? 'small' : key === 'medium' ? 'medium' : key === 'large' ? 'large' : 'xlarge'}">A</span>
          <span class="preview-text">a</span>
        </div>
        <div class="size-value">${size.root}</div>
      </div>
    `).join('');

    panel.innerHTML = `
      <div class="panel-header">
        <h3>Text Size</h3>
        <button class="close-panel" aria-label="Close"><i class="fa-solid fa-times"></i></button>
      </div>
      
      <div class="panel-section">
        <div class="font-size-grid">
          ${sizeOptions}
        </div>
      </div>
      
      <div class="preview-section">
        <div class="preview-label">Preview</div>
        <div class="preview-content">
          <div class="preview-line">
            <span>Text size example</span>
          </div>
          <div class="preview-line">
            <span class="btn-preview">Button</span>
          </div>
        </div>
      </div>
      
      <button class="reset-font">
        <i class="fa-solid fa-rotate-left"></i>
        Reset to Default
      </button>
    `;

    document.body.appendChild(panel);
    this.initPanelEvents(panel);
  },

  initPanelEvents(panel) {
    const btn = document.querySelector('.font-size-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
      panel.style.display = panel.classList.contains('open') ? 'flex' : 'none';
      btn.classList.add('notification');
      setTimeout(() => btn.classList.remove('notification'), 500);
    });

    const closeBtn = panel.querySelector('.close-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
        panel.style.display = 'none';
      });
    }

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
        panel.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
        panel.style.display = 'none';
      }
      
      if (e.altKey && e.key === 'f') {
        e.preventDefault();
        panel.classList.toggle('open');
        panel.style.display = panel.classList.contains('open') ? 'flex' : 'none';
      }
    });

    const sizeOptions = panel.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const sizeKey = option.dataset.size;
        this.applyFontSize(sizeKey);
        
        ThemeManager.showNotification(`✨ Font size changed to ${this.sizes[sizeKey].name}`, 'info');
        
        setTimeout(() => {
          panel.classList.remove('open');
          panel.style.display = 'none';
        }, 500);
      });
    });

    const resetBtn = panel.querySelector('.reset-font');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetToDefault();
        
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        const mediumOption = Array.from(sizeOptions).find(opt => opt.dataset.size === 'medium');
        if (mediumOption) mediumOption.classList.add('active');
        
        ThemeManager.showNotification('📏 Font size reset to default', 'success');
      });
    }

    this.loadSavedSize(sizeOptions);
  },

  applyFontSize(sizeKey) {
    const size = this.sizes[sizeKey];
    if (!size) return;

    document.documentElement.style.setProperty('--font-size-root', size.root);
    document.documentElement.style.setProperty('--font-size-h1', size.h1);
    document.documentElement.style.setProperty('--font-size-h2', size.h2);
    document.documentElement.style.setProperty('--font-size-h3', size.h3);
    document.documentElement.style.setProperty('--font-size-body', size.body);
    document.documentElement.style.setProperty('--font-size-btn', size.btn);

    document.body.style.fontSize = size.body;
    
    document.querySelectorAll('h1').forEach(el => {
      el.style.fontSize = size.h1;
    });
    
    document.querySelectorAll('h2').forEach(el => {
      el.style.fontSize = size.h2;
    });
    
    document.querySelectorAll('h3').forEach(el => {
      el.style.fontSize = size.h3;
    });
    
    document.querySelectorAll('.btn-custom, #submit-btn').forEach(el => {
      el.style.fontSize = size.btn;
    });

    localStorage.setItem('userFontSize', sizeKey);
  },

  loadSavedSize(sizeOptions) {
    const savedSize = localStorage.getItem('userFontSize');
    if (savedSize && this.sizes[savedSize]) {
      this.applyFontSize(savedSize);
      
      sizeOptions.forEach(opt => {
        if (opt.dataset.size === savedSize) {
          opt.classList.add('active');
        }
      });
    } else {
      const mediumOption = Array.from(sizeOptions).find(opt => opt.dataset.size === 'medium');
      if (mediumOption) {
        mediumOption.classList.add('active');
        this.applyFontSize('medium');
      }
    }
  },

  resetToDefault() {
    localStorage.removeItem('userFontSize');
    this.applyFontSize('medium');
  }
};

// ============================================
// COMPLETE THEME MANAGEMENT
// ============================================
const ThemeManager = {
  colorSchemes: {
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
        btnPrimary: 'linear-gradient(135deg, #1f2f3d, #9bb8d3)',
        btnHover: 'linear-gradient(135deg, #2a4050, #aac8e3)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #6c7a86, #8a9aa8)',
        btnSuccess: 'linear-gradient(135deg, #2e7d5e, #3e9e7a)',
        btnDanger: 'linear-gradient(135deg, #b0003a, #d0305a)',
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
        btnPrimary: 'linear-gradient(135deg, #4a6d8c, #b2c9df)',
        btnHover: 'linear-gradient(135deg, #5a7d9c, #c2d9ef)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #6c7a86, #8a9aa8)',
        btnSuccess: 'linear-gradient(135deg, #2e7d5e, #3e9e7a)',
        btnDanger: 'linear-gradient(135deg, #b0003a, #d0305a)',
        gradient: 'linear-gradient(135deg, #b2c9df, #4a6d8c)',
        headerGradient: 'linear-gradient(135deg, #0f151c, #1a222c)',
        shadowSoft: '0 12px 28px rgba(0, 0, 0, 0.4)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(74,109,140,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(212,165,188,0.08), transparent 55%)'
      }
    },
    
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
        btnPrimary: 'linear-gradient(135deg, #d48cb0, #f8b0d0)',
        btnHover: 'linear-gradient(135deg, #c47ca0, #ffc0e0)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #b08a9e, #d0aabe)',
        btnSuccess: 'linear-gradient(135deg, #9e7d8a, #be9daa)',
        btnDanger: 'linear-gradient(135deg, #d46b8a, #f48baa)',
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
        btnPrimary: 'linear-gradient(135deg, #f8b0d0, #d48cb0)',
        btnHover: 'linear-gradient(135deg, #ffc0e0, #e49cba)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #b08a9e, #906a7e)',
        btnSuccess: 'linear-gradient(135deg, #9e7d8a, #7e5d6a)',
        btnDanger: 'linear-gradient(135deg, #d46b8a, #b44b6a)',
        gradient: 'linear-gradient(135deg, #f8b0d0, #d48cb0)',
        headerGradient: 'linear-gradient(135deg, #2e2226, #3a2a30)',
        shadowSoft: '0 12px 28px rgba(212,140,176,0.3)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(212,140,176,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(248,176,208,0.08), transparent 55%)'
      }
    },
    
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
        btnPrimary: 'linear-gradient(135deg, #9f8fdf, #c7b9ff)',
        btnHover: 'linear-gradient(135deg, #8f7fcf, #d7c9ff)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #8f7faf, #af9fcf)',
        btnSuccess: 'linear-gradient(135deg, #7f8f9f, #9fafbf)',
        btnDanger: 'linear-gradient(135deg, #cf8f8f, #efafaf)',
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
        btnPrimary: 'linear-gradient(135deg, #c7b9ff, #9f8fdf)',
        btnHover: 'linear-gradient(135deg, #d7c9ff, #af9fef)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #8f7faf, #6f5f8f)',
        btnSuccess: 'linear-gradient(135deg, #7f8f9f, #5f6f7f)',
        btnDanger: 'linear-gradient(135deg, #cf8f8f, #af6f6f)',
        gradient: 'linear-gradient(135deg, #c7b9ff, #9f8fdf)',
        headerGradient: 'linear-gradient(135deg, #2c273a, #363045)',
        shadowSoft: '0 12px 28px rgba(159,143,223,0.3)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(159,143,223,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(199,185,255,0.08), transparent 55%)'
      }
    },
    
    gray: {
      name: 'Gray',
      icon: '⚪',
      light: {
        bg1: '#f8f9fa',
        bg2: '#f1f3f5',
        card1: '#e9ecef',
        card2: '#dee2e6',
        text: '#212529',
        muted: '#6c757d',
        brand1: '#495057',
        brand2: '#adb5bd',
        accent: '#ced4da',
        headerBg: '#343a40',
        headerText: '#ffffff',
        headerHover: '#adb5bd',
        btnPrimary: 'linear-gradient(135deg, #495057, #adb5bd)',
        btnHover: 'linear-gradient(135deg, #5a6268, #ced4da)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #6c757d, #9aa4b0)',
        btnSuccess: 'linear-gradient(135deg, #2e7d5e, #3e9e7a)',
        btnDanger: 'linear-gradient(135deg, #b0003a, #d0305a)',
        gradient: 'linear-gradient(135deg, #495057, #adb5bd)',
        headerGradient: 'linear-gradient(135deg, #343a40, #495057)',
        shadow: '0 20px 50px rgba(73,80,87,0.15)',
        shadowSoft: '0 12px 28px rgba(73,80,87,0.10)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(73,80,87,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(173,181,189,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#1a1d21',
        bg2: '#23272b',
        card1: '#2c3136',
        card2: '#252a2f',
        text: '#f8f9fa',
        muted: '#9aa4b0',
        brand1: '#ced4da',
        brand2: '#6c757d',
        accent: '#adb5bd',
        headerBg: '#212529',
        headerText: '#f8f9fa',
        headerHover: '#ced4da',
        btnPrimary: 'linear-gradient(135deg, #6c757d, #ced4da)',
        btnHover: 'linear-gradient(135deg, #7d8892, #dee2e6)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #495057, #5a6268)',
        btnSuccess: 'linear-gradient(135deg, #2e7d5e, #3e9e7a)',
        btnDanger: 'linear-gradient(135deg, #b0003a, #d0305a)',
        gradient: 'linear-gradient(135deg, #ced4da, #6c757d)',
        headerGradient: 'linear-gradient(135deg, #212529, #343a40)',
        shadowSoft: '0 12px 28px rgba(108,117,125,0.4)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(108,117,125,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(206,212,218,0.08), transparent 55%)'
      }
    },
    
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
        btnPrimary: 'linear-gradient(135deg, #6ba6e3, #9ac7ff)',
        btnHover: 'linear-gradient(135deg, #5b96d3, #aad7ff)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #5f8bb0, #7fabe0)',
        btnSuccess: 'linear-gradient(135deg, #3e9e7a, #5ebe9a)',
        btnDanger: 'linear-gradient(135deg, #d45a5a, #f47a7a)',
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
        btnPrimary: 'linear-gradient(135deg, #9ac7ff, #6ba6e3)',
        btnHover: 'linear-gradient(135deg, #aad7ff, #7bb6f3)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #5f8bb0, #3f6b90)',
        btnSuccess: 'linear-gradient(135deg, #3e9e7a, #1e7e5a)',
        btnDanger: 'linear-gradient(135deg, #d45a5a, #b43a3a)',
        gradient: 'linear-gradient(135deg, #9ac7ff, #6ba6e3)',
        headerGradient: 'linear-gradient(135deg, #202f40, #2a3b50)',
        shadowSoft: '0 12px 28px rgba(107,166,227,0.3)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(107,166,227,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(154,199,255,0.08), transparent 55%)'
      }
    },
    
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
        btnPrimary: 'linear-gradient(135deg, #ffa07a, #ffc8b0)',
        btnHover: 'linear-gradient(135deg, #f0906a, #ffd8c0)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #e08a6a, #ffaa8a)',
        btnSuccess: 'linear-gradient(135deg, #9ecf7a, #beef9a)',
        btnDanger: 'linear-gradient(135deg, #d45a5a, #f47a7a)',
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
        btnPrimary: 'linear-gradient(135deg, #ffc8b0, #ffa07a)',
        btnHover: 'linear-gradient(135deg, #ffd8c0, #ffb08a)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #e08a6a, #c06a4a)',
        btnSuccess: 'linear-gradient(135deg, #9ecf7a, #7eaf5a)',
        btnDanger: 'linear-gradient(135deg, #d45a5a, #b43a3a)',
        gradient: 'linear-gradient(135deg, #ffc8b0, #ffa07a)',
        headerGradient: 'linear-gradient(135deg, #402e23, #4d382b)',
        shadowSoft: '0 12px 28px rgba(255,160,122,0.3)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(255,160,122,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(255,200,176,0.08), transparent 55%)'
      }
    },
    
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
        btnPrimary: 'linear-gradient(135deg, #8fc0b0, #b0e0d0)',
        btnHover: 'linear-gradient(135deg, #7fb0a0, #c0f0e0)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #7faf9f, #9fcfbf)',
        btnSuccess: 'linear-gradient(135deg, #5f9e8f, #7fbebf)',
        btnDanger: 'linear-gradient(135deg, #cf8f8f, #efafaf)',
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
        btnPrimary: 'linear-gradient(135deg, #b0e0d0, #8fc0b0)',
        btnHover: 'linear-gradient(135deg, #c0f0e0, #9fd0c0)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #7faf9f, #5f8f7f)',
        btnSuccess: 'linear-gradient(135deg, #5f9e8f, #3f7e6f)',
        btnDanger: 'linear-gradient(135deg, #cf8f8f, #af6f6f)',
        gradient: 'linear-gradient(135deg, #b0e0d0, #8fc0b0)',
        headerGradient: 'linear-gradient(135deg, #203933, #29463e)',
        shadowSoft: '0 12px 28px rgba(143,192,176,0.3)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(143,192,176,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(176,224,208,0.08), transparent 55%)'
      }
    },
    
    burgundy: {
      name: 'Burgundy',
      icon: '🍷',
      light: {
        bg1: '#fdf5f5',
        bg2: '#faeaea',
        card1: '#f5e0e0',
        card2: '#f0d6d6',
        text: '#4a2a2a',
        muted: '#a15c5c',
        brand1: '#8b3a3a',
        brand2: '#c97c7c',
        accent: '#b86666',
        headerBg: '#6b2e2e',
        headerText: '#ffffff',
        headerHover: '#c97c7c',
        btnPrimary: 'linear-gradient(135deg, #8b3a3a, #c97c7c)',
        btnHover: 'linear-gradient(135deg, #7b2a2a, #d98c8c)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #a15c5c, #c17c7c)',
        btnSuccess: 'linear-gradient(135deg, #2e7d5e, #3e9e7a)',
        btnDanger: 'linear-gradient(135deg, #b0003a, #d0305a)',
        gradient: 'linear-gradient(135deg, #8b3a3a, #c97c7c)',
        headerGradient: 'linear-gradient(135deg, #6b2e2e, #8b3a3a)',
        shadow: '0 20px 50px rgba(139,58,58,0.15)',
        shadowSoft: '0 12px 28px rgba(139,58,58,0.10)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(139,58,58,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(201,124,124,0.08), transparent 55%)'
      },
      dark: {
        bg1: '#2a1a1a',
        bg2: '#332020',
        card1: '#3d2626',
        card2: '#362121',
        text: '#fce8e8',
        muted: '#e0a8a8',
        brand1: '#d98c8c',
        brand2: '#a14a4a',
        accent: '#c46e6e',
        headerBg: '#3d2626',
        headerText: '#fce8e8',
        headerHover: '#d98c8c',
        btnPrimary: 'linear-gradient(135deg, #a14a4a, #d98c8c)',
        btnHover: 'linear-gradient(135deg, #b15a5a, #e99c9c)',
        btnText: '#ffffff',
        btnSecondary: 'linear-gradient(135deg, #8b3a3a, #6b2a2a)',
        btnSuccess: 'linear-gradient(135deg, #2e7d5e, #3e9e7a)',
        btnDanger: 'linear-gradient(135deg, #b0003a, #d0305a)',
        gradient: 'linear-gradient(135deg, #d98c8c, #a14a4a)',
        headerGradient: 'linear-gradient(135deg, #3d2626, #4d2e2e)',
        shadowSoft: '0 12px 28px rgba(139,58,58,0.4)',
        radial1: 'radial-gradient(1200px 700px at 15% 10%, rgba(139,58,58,0.15), transparent 60%)',
        radial2: 'radial-gradient(900px 600px at 85% 18%, rgba(201,124,124,0.08), transparent 55%)'
      }
    }
  },

  init() {
    this.initThemeToggle();
    this.createThemeCustomizer();
    this.loadSavedTheme();
    this.applyHeaderStyles();
    this.initKeyboardShortcuts();
  },

  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
      }
      
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        const customizerBtn = document.querySelector('.theme-customizer-btn');
        if (customizerBtn) customizerBtn.click();
      }
    });
  },

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
        
        .btn-custom, #submit-btn {
          background: var(--btnPrimary) !important;
          color: var(--btnText) !important;
          transition: all 0.3s ease;
          border: none;
          box-shadow: var(--shadow-soft);
        }
        
        .btn-custom:hover, #submit-btn:hover {
          background: var(--btnHover) !important;
          transform: translateY(-2px);
          box-shadow: var(--hover-shadow);
        }
        
        .btn-custom.secondary {
          background: var(--btnSecondary) !important;
        }
        
        .btn-custom.success {
          background: var(--btnSuccess) !important;
        }
        
        .btn-custom.danger {
          background: var(--btnDanger) !important;
        }
        
        .btn-custom:disabled, #submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        
        .btn-custom.loading {
          position: relative;
          pointer-events: none;
          opacity: 0.7;
        }
        
        .btn-custom.loading::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top-color: currentColor;
          border-right-color: currentColor;
          border-radius: 50%;
          animation: button-loading 0.6s linear infinite;
        }
        
        @keyframes button-loading {
          to {
            transform: rotate(360deg);
          }
        }
      `;
      document.head.appendChild(style);
    }
  },

  initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
      this.createThemeToggle();
    } else {
      this.setupThemeToggle(themeToggle);
    }
  },

  createThemeToggle() {
    const themeToggle = document.createElement('div');
    themeToggle.id = 'themeToggle';
    themeToggle.style.cssText = `
      position: fixed;
      top: 310px;
      right: 30px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: var(--btn-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999999;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-size: 1.4rem;
    `;
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute('title', 'Toggle Theme (Alt+T)');
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);
    
    this.setupThemeToggle(themeToggle);
  },

  setupThemeToggle(themeToggle) {
    const updateToggleUI = (isDark) => {
      themeToggle.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
      
      themeToggle.style.transform = 'scale(1.1) rotate(180deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1) rotate(0deg)';
      }, 400);
    };

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
      
      this.showNotification(
        `${isDarkNow ? '🌙 Dark' : '☀️ Light'} mode activated`, 
        'info'
      );
    });
  },

  createThemeCustomizer() {
    if (document.querySelector('.theme-customizer-btn')) return;

    const customizerBtn = document.createElement('div');
    customizerBtn.className = 'theme-customizer-btn';
    customizerBtn.style.cssText = `
      position: fixed;
      top: 150px;
      right: 30px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: var(--btn-primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999999;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-size: 1.4rem;
    `;
    customizerBtn.setAttribute('title', 'Customize Colors (Alt+C)');
    customizerBtn.setAttribute('aria-label', 'Customize theme colors');
    document.body.appendChild(customizerBtn);

    const palettePanel = document.createElement('div');
    palettePanel.className = 'theme-customizer-panel';
    palettePanel.style.cssText = `
      position: fixed;
      top: 150px;
      right: 100px;
      background: var(--card1);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-radius: 20px;
      padding: 15px;
      box-shadow: var(--shadow-soft);
      border: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 999998;
      display: none;
      flex-direction: column;
      gap: 12px;
      min-width: 220px;
      max-width: 250px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease;
    `;
    
    const colorOptions = Object.keys(this.colorSchemes).map(color => 
      `<div class="color-option" data-color="${color}" title="${this.colorSchemes[color].name}" style="background: ${this.colorSchemes[color].light.btnPrimary}"></div>`
    ).join('');

    palettePanel.innerHTML = `
      <div class="panel-header">
        <h3>🎨 Color Schemes</h3>
        <button class="close-panel" aria-label="Close"><i class="fa-solid fa-times"></i></button>
      </div>
      
      <div class="panel-section">
        <div class="color-grid">
          ${colorOptions}
        </div>
      </div>
      
      <div class="panel-section">
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
  },

  initCustomizerEvents(btn, panel) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
      panel.style.display = panel.classList.contains('open') ? 'flex' : 'none';
      btn.classList.add('notification');
      setTimeout(() => btn.classList.remove('notification'), 500);
    });

    const closeBtn = panel.querySelector('.close-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
        panel.style.display = 'none';
      });
    }

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
        panel.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
        panel.style.display = 'none';
      }
    });

    const colorOptions = panel.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        const colorName = option.dataset.color;
        this.applyColorScheme(colorName);
        
        this.showNotification(`✨ ${this.colorSchemes[colorName].name} theme applied`, 'success');
        
        setTimeout(() => {
          panel.classList.remove('open');
          panel.style.display = 'none';
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

    const resetBtn = panel.querySelector('.reset-theme');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetToDefault();
        
        colorOptions.forEach(opt => opt.classList.remove('active'));
        modeOptions.forEach(opt => opt.classList.remove('active'));
        
        const defaultColor = Array.from(colorOptions).find(opt => opt.dataset.color === 'darkblue');
        if (defaultColor) {
          defaultColor.classList.add('active');
          defaultColor.style.animation = 'pulse 0.5s ease';
        }
        
        const lightMode = Array.from(modeOptions).find(opt => opt.dataset.mode === 'light');
        if (lightMode) lightMode.classList.add('active');
        
        this.showNotification('✨ Theme reset to default', 'info');
      });
    }

    this.loadSavedSettings(colorOptions, modeOptions);
  },

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

  applyColorScheme(schemeName) {
    const scheme = this.colorSchemes[schemeName];
    if (!scheme) return;

    const isDark = document.body.classList.contains('dark');
    const colors = isDark ? scheme.dark : scheme.light;

    Object.keys(colors).forEach(key => {
      if (key !== 'radial1' && key !== 'radial2') {
        document.documentElement.style.setProperty(`--${key}`, colors[key]);
      }
    });

    document.body.style.background = `
      ${colors.radial1 || ''},
      ${colors.radial2 || ''},
      linear-gradient(180deg, ${colors.bg1} 0%, ${colors.bg2} 100%)
    `;

    const header = document.querySelector('header');
    if (header) {
      header.style.background = colors.headerBg;
      header.style.color = colors.headerText;
    }

    localStorage.setItem('userColorScheme', schemeName);
    
    const customizerBtn = document.querySelector('.theme-customizer-btn');
    if (customizerBtn) {
      customizerBtn.style.background = colors.btnPrimary;
    }

    const fontBtn = document.querySelector('.font-size-btn');
    if (fontBtn) {
      fontBtn.style.background = colors.btnPrimary;
    }

    document.querySelectorAll('.btn-custom, #submit-btn').forEach(btn => {
      btn.style.background = colors.btnPrimary;
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.style.background = colors.btnPrimary;
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

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `theme-notification ${type}`;
    notification.textContent = message;
    
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6',
      warning: '#f59e0b'
    };
    
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${colors[type] || colors.info};
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      z-index: 999999;
      animation: slideInRight 0.3s ease;
      font-family: sans-serif;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
};

// ============================================
// COLLAPSIBLE SECTIONS
// ============================================
const initCollapsibleSections = () => {
  const sections = document.querySelectorAll('section:not(.hero)');
  
  sections.forEach(section => {
    const header = section.querySelector('h2, .contact-header');
    const content = section.querySelector('.section-content, .contact-form');
    
    if (!header || !content) return;
    
    content.style.display = 'none';
    section.classList.remove('is-open');
    
    header.style.cursor = 'pointer';
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    
    header.addEventListener('click', () => {
      const isOpen = section.classList.toggle('is-open');
      content.style.display = isOpen ? 'flex' : 'none';
      header.setAttribute('aria-expanded', isOpen);
      
      if (isOpen) {
        content.style.animation = 'slideDown 0.3s ease';
      }
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
    overlay.classList.add('active');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    toggleBodyScroll(true);
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    overlay.classList.remove('active');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    toggleBodyScroll(false);
  };

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
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

  nav.addEventListener('click', (e) => {
    e.stopPropagation();
  });
};

// ============================================
// EMAILJS CONTACT FORM
// ============================================
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS not loaded');
    return;
  }

  emailjs.init('4TL6XDLiwaI_U6Cza');

  const btn = document.getElementById('submit-btn');
  const messageBox = document.getElementById('form-message');
  const btnText = btn?.querySelector('.btn-text') || btn;
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
    });
    
    input.addEventListener('blur', () => {
      validateInput(input);
    });
  });

  const validateInput = (input) => {
    const errorElement = input.nextElementSibling?.classList.contains('error-message') 
      ? input.nextElementSibling 
      : document.createElement('div');
    
    if (!errorElement.classList.contains('error-message')) {
      errorElement.className = 'error-message';
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    if (input.validity.valid) {
      errorElement.textContent = '';
      input.classList.remove('invalid');
    } else {
      if (input.validity.valueMissing) {
        errorElement.textContent = 'This field is required';
      } else if (input.validity.typeMismatch) {
        errorElement.textContent = 'Please enter a valid email';
      } else if (input.validity.tooShort) {
        errorElement.textContent = `Minimum ${input.minLength} characters required`;
      }
      input.classList.add('invalid');
    }
  };

  const setLoadingState = (isLoading) => {
    if (!btn) return;
    btn.classList.toggle('loading', isLoading);
    btn.disabled = isLoading;
    if (btnText) {
      btnText.textContent = isLoading ? 'Sending...' : 'Send Message';
    }
    if (messageBox) {
      messageBox.textContent = '';
      messageBox.className = 'form-message';
    }
  };

  const showMessage = (text, type) => {
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.className = `form-message ${type}`;
    ThemeManager.showNotification(text, type);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      validateInput(input);
      if (!input.validity.valid) isValid = false;
    });

    if (!isValid) {
      showMessage('Please fill all fields correctly', 'error');
      return;
    }

    setLoadingState(true);

    emailjs.sendForm('service_7xqpa4g', 'template_mcebsl8', form)
      .then(() => {
        setLoadingState(false);
        showMessage('✨ Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setLoadingState(false);
        showMessage('❌ Something went wrong. Please try again or email me directly.', 'error');
      });
  });
};

// ============================================
// PROJECTS ACCORDION
// ============================================
const initProjectsAccordion = () => {
  const projectTitles = document.querySelectorAll('.projects dt');
  
  projectTitles.forEach((title, index) => {
    const description = title.nextElementSibling;
    if (!description || description.tagName !== 'DD') return;
    
    description.style.display = 'none';
    
    title.setAttribute('role', 'button');
    title.setAttribute('aria-expanded', 'false');
    title.setAttribute('aria-controls', `project-${index}`);
    description.id = `project-${index}`;
    
    title.addEventListener('click', () => {
      const isActive = title.classList.toggle('active');
      title.setAttribute('aria-expanded', isActive);
      description.style.display = isActive ? 'block' : 'none';
      
      if (isActive) {
        description.style.animation = 'slideDown 0.3s ease';
      }
    });
  });
};

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
const performanceOptimizations = () => {
  const images = document.querySelectorAll('img[data-src]');
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
};

// ============================================
// BASE STYLES
// ============================================
const baseStyles = document.createElement('style');
baseStyles.textContent = `
  :root {
    --font-size-root: 16px;
    --font-size-h1: 2.5rem;
    --font-size-h2: 2rem;
    --font-size-h3: 1.75rem;
    --font-size-body: 1rem;
    --font-size-btn: 1rem;
  }
  
  body {
    font-size: var(--font-size-body);
    transition: font-size 0.3s ease;
  }
  
  h1 {
    font-size: var(--font-size-h1);
  }
  
  h2 {
    font-size: var(--font-size-h2);
  }
  
  h3 {
    font-size: var(--font-size-h3);
  }
  
  .btn-custom, #submit-btn {
    font-size: var(--font-size-btn);
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .theme-customizer-btn.notification,
  .font-size-btn.notification {
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
  
  input.invalid {
    border-color: #ef4444 !important;
  }
  
  .error-message {
    color: #ef4444;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 0;
    animation: slideDown 0.2s ease;
  }
  
  .form-message {
    padding: 12px;
    border-radius: 8px;
    margin-top: 10px;
    animation: slideDown 0.3s ease;
  }
  
  .form-message.success {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid #10b981;
  }
  
  .form-message.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid #ef4444;
  }
  
  .theme-customizer-panel,
  .font-size-panel {
    display: none;
  }
  
  .theme-customizer-panel.open,
  .font-size-panel.open {
    display: flex !important;
  }
`;

document.head.appendChild(baseStyles);

// ============================================
// INITIALIZE ALL MODULES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initCollapsibleSections();
  initMobileMenu();
  initContactForm();
  initProjectsAccordion();
  ThemeManager.init();
  FontSizeManager.init();
  ResponsiveManager.init();
});

window.addEventListener('load', performanceOptimizations);