(() => {
    const b = document.getElementById('theme'),
        k = 'alagankulam-theme';
    const set = t => {
        document.documentElement.dataset.theme = t;
        localStorage.setItem(k, t);
        b.textContent = t === 'light' ? '☾' : '☼';
    };
    set(localStorage.getItem(k) || 'dark');
    b.onclick = () => set(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
})();
