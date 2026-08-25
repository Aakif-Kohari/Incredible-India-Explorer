const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const frontendDir = path.join(__dirname, 'frontend');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walk(dirPath, callback);
        } else if (f.endsWith('.html')) {
            callback(dirPath);
        }
    });
}

const decorativeClasses = ['pattern', 'bg', 'decoration', 'overlay', 'background', 'shape', 'icon', 'logo'];

walk(frontendDir, (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(content);
    const document = dom.window.document;
    let modified = false;

    // 1. Icon-Only Buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        const hasAriaLabel = button.hasAttribute('aria-label');
        if (text.length <= 3 && !hasAriaLabel && !button.hasAttribute('title')) {
            let label = "Button";
            const classes = button.className.toLowerCase();
            if (classes.includes('menu')) label = "Open navigation menu";
            else if (classes.includes('close')) label = "Close";
            else if (classes.includes('search')) label = "Search";
            else if (classes.includes('theme')) label = "Toggle theme";
            else if (classes.includes('next')) label = "Next";
            else if (classes.includes('prev')) label = "Previous";
            else if (classes.includes('filter')) label = "Filter";
            else if (text.includes('×')) label = "Close";
            else if (text.includes('☰')) label = "Open navigation menu";
            
            button.setAttribute('aria-label', label);
            modified = true;
        }
    });

    // 2. Image Alt Text
    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt').toLowerCase() === 'image' || img.getAttribute('alt').toLowerCase() === 'icon') {
            let isDecorative = decorativeClasses.some(c => img.className.toLowerCase().includes(c));
            if (isDecorative) {
                img.setAttribute('alt', '');
            } else {
                let srcName = path.basename(img.src || '').split('.')[0].replace(/-/g, ' ');
                img.setAttribute('alt', srcName || 'Image');
            }
            modified = true;
        }
    });

    // 3. Navigation Accessibility
    const navbars = document.querySelectorAll('.navbar, .navigation, .sidebar');
    navbars.forEach(nav => {
        if (nav.tagName.toLowerCase() !== 'nav') {
            const newNav = document.createElement('nav');
            newNav.innerHTML = nav.innerHTML;
            Array.from(nav.attributes).forEach(attr => newNav.setAttribute(attr.name, attr.value));
            
            if (!newNav.hasAttribute('aria-label')) {
                newNav.setAttribute('aria-label', nav.className.includes('main') ? 'Main navigation' : 'Navigation');
            }
            nav.replaceWith(newNav);
            modified = true;
        }
    });

    // Add aria-label to existing navs if missing
    document.querySelectorAll('nav').forEach(nav => {
        if (!nav.hasAttribute('aria-label')) {
            nav.setAttribute('aria-label', 'Navigation');
            modified = true;
        }
    });

    // 4. Modals
    const modals = document.querySelectorAll('.modal, .dialog');
    modals.forEach(modal => {
        if (!modal.hasAttribute('role')) {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modified = true;
        }
    });

    // 5. Semantic Main
    if (!document.querySelector('main')) {
        const bodyChildren = document.body.children;
        const main = document.createElement('main');
        
        let foundContent = false;
        // Don't move script tags or fixed headers into main if possible
        const elementsToMove = [];
        for (let i = 0; i < bodyChildren.length; i++) {
            const child = bodyChildren[i];
            const tag = child.tagName.toLowerCase();
            if (tag !== 'script' && tag !== 'nav' && tag !== 'header' && tag !== 'footer' && tag !== 'style') {
                elementsToMove.push(child);
            }
        }
        
        if (elementsToMove.length > 0) {
            elementsToMove.forEach(el => main.appendChild(el));
            
            // Find a good place to insert main
            const nav = document.querySelector('nav') || document.querySelector('header');
            if (nav) {
                nav.insertAdjacentElement('afterend', main);
            } else {
                document.body.prepend(main);
            }
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, dom.serialize());
        console.log(`Updated: ${filePath}`);
    }
});

console.log("Accessibility audit auto-fix complete.");
