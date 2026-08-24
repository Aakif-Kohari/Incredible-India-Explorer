const Utils = {
    createElement: (tag, className, text) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    },

    safeSetText: (el, text) => { if (el) el.textContent = text; },

    debounce: (func, wait) => {
        let timeout;
        return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); };
    }

};
