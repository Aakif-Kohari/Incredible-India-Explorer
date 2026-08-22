const Utils = {

    createElement: (tag, className, text) => {

        const el = document.createElement(tag);

        if (className) el.className = className;

        if (text) el.textContent = text;

        return el;
    }

};
