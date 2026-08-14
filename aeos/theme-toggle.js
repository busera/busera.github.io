(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const themeColor = document.getElementById('theme-color');
  const themeImages = document.querySelectorAll('[data-theme-light][data-theme-dark]');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'aeos-theme';

  const readSavedTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (error) {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // The selected theme still applies for this page when storage is unavailable.
    }
  };

  const updateThemeImages = (theme) => {
    themeImages.forEach((image) => {
      const source = theme === 'dark' ? image.dataset.themeDark : image.dataset.themeLight;
      if (!source) return;
      image.setAttribute('src', source);
      const fullSizeLink = typeof image.closest === 'function' ? image.closest('a[data-dialog]') : null;
      if (fullSizeLink) fullSizeLink.setAttribute('href', source);
    });
  };

  const updateToggle = (theme) => {
    if (!toggle) return;
    const isDark = theme === 'dark';
    const label = toggle.querySelector('[data-theme-label]');
    const icon = toggle.querySelector('[data-theme-icon]');
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    if (label) label.textContent = isDark ? 'Dark' : 'Light';
    if (icon) icon.textContent = isDark ? '☾' : '☀';
  };

  const applyTheme = (theme, { persist = false } = {}) => {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = normalized;
    if (root.style) root.style.colorScheme = normalized;
    if (themeColor) themeColor.setAttribute('content', normalized === 'dark' ? '#07111f' : '#f8fbfe');
    updateToggle(normalized);
    updateThemeImages(normalized);
    if (persist) saveTheme(normalized);
  };

  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  toggle?.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', { persist: true });
  });

  const followSystemTheme = (event) => {
    if (readSavedTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light');
  };

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', followSystemTheme);
  } else if (typeof media.addListener === 'function') {
    media.addListener(followSystemTheme);
  }

  if (typeof window.addEventListener === 'function') {
    window.addEventListener('storage', (event) => {
      if (event.key !== storageKey) return;
      const saved = readSavedTheme();
      applyTheme(saved || (media.matches ? 'dark' : 'light'));
    });
  }
})();
