(() => {
    const pageId = 'pipili-ancient-port';
    const save = document.getElementById('save-btn');
    const theme = document.getElementById('theme-toggle');
    const storageKey = 'pipili-ancient-port.saved';

    const setTheme = value => {
        document.documentElement.dataset.theme = value;
        localStorage.setItem('pipili-ancient-port.theme', value);
        theme.textContent = value === 'light' ? '☾' : '☼';
    };
    setTheme(
        localStorage.getItem('pipili-ancient-port.theme') ||
            (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    );
    theme.addEventListener('click', () =>
        setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light')
    );

    const getSaved = () => localStorage.getItem(storageKey) === '1';
    const renderSave = saved => {
        save.setAttribute('aria-pressed', String(saved));
        save.textContent = saved ? '★ Saved to My Journey' : '☆ Save to My Journey';
    };
    renderSave(getSaved());
    save.addEventListener('click', () => {
        const next = !getSaved();
        localStorage.setItem(storageKey, next ? '1' : '0');
        renderSave(next);
        if (window.Journey && typeof window.Journey.toggle === 'function') {
            window.Journey.toggle({
                id: pageId,
                explorerPage: 'frontend/pipili-ancient-port-explorer/index.html',
                title: 'Pipili Ancient Port Explorer',
                thumbnail: 'frontend/pipili-ancient-port-explorer/assets/pipili-port.svg',
                category: 'Ancient Ports'
            });
        }
    });
})();
