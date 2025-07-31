// NEXORO Hosting Theme Switcher
(function () {
  const THEME_KEY = 'nexoro-theme';

  const darkTheme = {
    '--bg-gradient': 'linear-gradient(120deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    '--header-bg': 'linear-gradient(90deg, #04f5e9 0%, #0f0c29 100%)',
    '--text-color': '#00f7ff',
    '--accent': '#f50b0b',
    '--container-bg': 'rgba(15,12,41,0.95)',
    '--footer-bg': 'linear-gradient(90deg, #0f0c29 0%, #302b63 100%)',
    '--nav-link': '#fff',
    '--nav-link-hover': '#f50b0b',
    '--footer-color': '#fff'
  };

  const lightTheme = {
    '--bg-gradient': 'linear-gradient(120deg, #f7fafc 0%, #e3e8ee 50%, #cbd5e1 100%)',
    '--header-bg': 'linear-gradient(90deg, #00f7ff 0%, #e3e8ee 100%)',
    '--text-color': '#222',
    '--accent': '#0077ff',
    '--container-bg': 'rgba(255,255,255,0.95)',
    '--footer-bg': 'linear-gradient(90deg, #e3e8ee 0%, #cbd5e1 100%)',
    '--nav-link': '#222',
    '--nav-link-hover': '#0077ff',
    '--footer-color': '#222'
  };

  function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    // Removed: direct background and color setting on body
  }

  function setTheme(mode) {
    if (mode === 'light') {
      applyTheme(lightTheme);
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      applyTheme(darkTheme);
      localStorage.setItem(THEME_KEY, 'dark');
    }
  }

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function addSwitcher() {
    const btn = document.createElement('button');
    btn.id = 'theme-switcher';
    btn.style.position = 'fixed';
    btn.style.top = '24px';
    btn.style.right = '24px';
    btn.style.zIndex = '1000';
    btn.style.background = '#222';
    btn.style.color = '#00f7ff';
    btn.style.border = 'none';
    btn.style.borderRadius = '50%';
    btn.style.width = '48px';
    btn.style.height = '48px';
    btn.style.boxShadow = '0 0 12px #00f7ff88';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1.5rem';
    btn.title = 'Toggle theme';
    btn.innerHTML = getTheme() === 'light' ? '☀️' : '🌙';

    btn.onclick = function () {
      const current = getTheme();
      if (current === 'dark') {
        setTheme('light');
        btn.innerHTML = '☀️';
      } else {
        setTheme('dark');
        btn.innerHTML = '🌙';
      }
    };

    document.body.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTheme(getTheme());
    addSwitcher();
  });
})();
