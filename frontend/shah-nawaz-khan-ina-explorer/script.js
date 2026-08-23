(() => {
    const b = document.getElementById('theme');
    const saved = localStorage.getItem('shah-nawaz-theme');
    const setTheme = t => {
        document.documentElement.dataset.theme = t;
        localStorage.setItem('shah-nawaz-theme', t);
        b.textContent = t === 'light' ? '☾' : '☼';
    };
    setTheme(saved || (matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark'));
    b.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
})();
