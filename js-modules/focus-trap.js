window.setupFocusTrap = function(modalElement) {
    if (!modalElement) return null;
    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusableElements = Array.from(modalElement.querySelectorAll(focusableSelector));
    const previousActiveElement = document.activeElement;
    
    if (focusableElements.length > 0) {
        setTimeout(() => focusableElements[0].focus(), 50);
    } else {
        modalElement.setAttribute('tabindex', '-1');
        setTimeout(() => modalElement.focus(), 50);
    }
    
    const keydownHandler = function(e) {
        if (e.key === 'Tab') {
            const elements = Array.from(modalElement.querySelectorAll(focusableSelector));
            if (elements.length === 0) return;
            const first = elements[0];
            const last = elements[elements.length - 1];
            
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === first || document.activeElement === modalElement) {
                    last.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        }
    };
    
    modalElement.addEventListener('keydown', keydownHandler);
    
    return {
        deactivate: function() {
            modalElement.removeEventListener('keydown', keydownHandler);
            if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
                setTimeout(() => previousActiveElement.focus(), 50);
            }
        }
    };
};
