/* Match anchor offsets to the navigation after wrapping, zooming, or font loading. */
(() => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const updateOffset = () => {
    document.documentElement.style.setProperty('--nav-height', `${nav.getBoundingClientRect().height}px`);
  };
  updateOffset();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateOffset).observe(nav);
  } else {
    window.addEventListener('resize', updateOffset, { passive: true });
  }
})();
