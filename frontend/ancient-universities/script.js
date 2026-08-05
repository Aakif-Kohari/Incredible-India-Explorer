(function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.university-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's #top
            if (targetId === '#top') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for sticky header
                const headerOffset = 130; // approx height of navbar + sticky subnav
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Set focus to the section for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus({preventScroll: true});
            }
        });
    });

    // Back to top behavior
    document.querySelectorAll('.back-to-top').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
})();
