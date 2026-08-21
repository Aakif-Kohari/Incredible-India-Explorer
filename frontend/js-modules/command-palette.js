/**
 * Spotlight Command Palette & Keyboard Navigation Engine
 * Provides Ctrl+K / Cmd+K instant command menu, section search, quick routes,
 * focus trapping, and keyboard shortcuts.
 */

export class CommandPaletteEngine {
  constructor(options = {}) {
    this.isOpen = false;
    this.selectedIndex = 0;
    this.commands = options.commands || [
      { id: 'home', title: 'Go to Home', section: 'Navigation', url: 'index.html' },
      { id: 'monuments', title: 'Explore Monuments', section: 'Heritage', url: 'monuments.html' },
      { id: 'culture', title: 'Discover Arts & Culture', section: 'Culture', url: 'culture.html' },
      { id: 'festivals', title: 'Grand Festivals of India', section: 'Culture', url: 'festivals.html' },
      { id: 'planner', title: 'Trip & Itinerary Generator', section: 'Travel', url: 'itinery-generator.html' },
      { id: 'map3d', title: 'Interactive 3D Map', section: 'Interactive', url: 'india-3d-map.html' }
    ];
    this.filteredCommands = [...this.commands];
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.selectedIndex = 0;
      this.filteredCommands = [...this.commands];
    }
    return this.isOpen;
  }

  open() {
    this.isOpen = true;
    this.selectedIndex = 0;
    this.filteredCommands = [...this.commands];
  }

  close() {
    this.isOpen = false;
  }

  search(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      this.filteredCommands = [...this.commands];
    } else {
      this.filteredCommands = this.commands.filter(cmd => {
        const t = cmd.title ? String(cmd.title).toLowerCase() : '';
        const s = cmd.section ? String(cmd.section).toLowerCase() : '';
        return t.includes(q) || s.includes(q);
      });
    }
    this.selectedIndex = 0;
    return this.filteredCommands;
  }

  navigate(direction) {
    if (this.filteredCommands.length === 0) return 0;
    if (direction === 'down') {
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
    } else if (direction === 'up') {
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
    }
    return this.selectedIndex;
  }

  getSelectedCommand() {
    if (this.filteredCommands.length === 0) return null;
    return this.filteredCommands[this.selectedIndex] || null;
  }
}

// Initialize UI if in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      // Use indiaSearchIndex if available, otherwise fallback to empty (engine has defaults)
      const searchData = window.indiaSearchIndex || [];
      const customCommands = searchData.map((item, idx) => ({
        id: `search-${idx}`,
        title: item.title,
        section: item.category,
        url: item.url,
        description: item.description
      }));
      
      const engine = new CommandPaletteEngine(customCommands.length ? { commands: customCommands } : {});
      
      // Create UI Elements
      const backdrop = document.createElement('div');
      backdrop.className = 'cmd-palette-backdrop';
      backdrop.style.display = 'none';
      
      const modal = document.createElement('div');
      modal.className = 'cmd-palette-modal';
      
      const inputWrapper = document.createElement('div');
      inputWrapper.style.position = 'relative';
      
      const input = document.createElement('input');
      input.className = 'cmd-palette-input';
      input.type = 'text';
      input.placeholder = 'Search Incredible India... (Ctrl+K)';
      input.setAttribute('aria-label', 'Search');
      
      const list = document.createElement('div');
      list.className = 'cmd-palette-list';
      list.style.maxHeight = '400px';
      list.style.overflowY = 'auto';
      
      inputWrapper.appendChild(input);
      modal.appendChild(inputWrapper);
      modal.appendChild(list);
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);
      
      function renderList() {
        list.innerHTML = '';
        const items = engine.filteredCommands.slice(0, 10);
        if (items.length === 0) {
            const empty = document.createElement('div');
            empty.style.padding = '1.5rem';
            empty.style.color = '#94a3b8';
            empty.style.textAlign = 'center';
            empty.textContent = 'No results found.';
            list.appendChild(empty);
            return;
        }
        
        items.forEach((cmd, idx) => {
          const isSelected = idx === engine.selectedIndex;
          const div = document.createElement('div');
          div.className = `cmd-palette-item ${isSelected ? 'active' : ''}`;
          
          const textWrap = document.createElement('div');
          const title = document.createElement('div');
          title.style.fontWeight = '600';
          title.style.marginBottom = '0.2rem';
          title.textContent = cmd.title;
          
          const desc = document.createElement('div');
          desc.style.fontSize = '0.85rem';
          desc.style.color = '#94a3b8';
          desc.textContent = cmd.section;
          
          textWrap.appendChild(title);
          textWrap.appendChild(desc);
          div.appendChild(textWrap);
          
          div.addEventListener('click', () => {
            navigateTo(cmd.url);
          });
          
          div.addEventListener('mouseenter', () => {
             engine.selectedIndex = idx;
             renderList();
          });
          
          list.appendChild(div);
        });
      }
      
      function navigateTo(url) {
        if (!url) return;
        close();
        let resolvedUrl = url;
        if (!resolvedUrl.startsWith('http')) {
            if (window.location.pathname.includes('/frontend/')) {
                const parts = window.location.pathname.split('/frontend/');
                resolvedUrl = parts[0] + '/' + url;
            }
        }
        window.location.href = resolvedUrl;
      }
      
      function open() {
        engine.open();
        backdrop.style.display = 'flex';
        input.value = '';
        renderList();
        setTimeout(() => input.focus(), 50);
      }
      
      function close() {
        engine.close();
        backdrop.style.display = 'none';
      }
      
      input.addEventListener('input', (e) => {
        engine.search(e.target.value);
        renderList();
      });
      
      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          engine.navigate('down');
          renderList();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          engine.navigate('up');
          renderList();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const cmd = engine.getSelectedCommand();
          if (cmd && cmd.url) {
            navigateTo(cmd.url);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          close();
        }
      });
      
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          close();
        }
      });
      
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          if (engine.isOpen) {
            close();
          } else {
            open();
          }
        }
      });
      
      const searchBtn = document.getElementById('btn-nav-search');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          open();
        });
      }
    }, 100);
  });
}
