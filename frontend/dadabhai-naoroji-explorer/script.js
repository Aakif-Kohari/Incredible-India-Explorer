(() => {
    const btn = document.getElementById('theme');
    const saved = localStorage.getItem('naoroji-theme');
    const setTheme = t => {
        document.documentElement.dataset.theme = t;
        localStorage.setItem('naoroji-theme', t);
        btn.textContent = t === 'light' ? '☾' : '☼';
    };
    setTheme(saved || (matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark'));
    btn.addEventListener('click', () =>
        setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light')
    );
})();
