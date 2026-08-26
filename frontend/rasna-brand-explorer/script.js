document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const timelineItems = document.querySelectorAll(".timeline-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            timelineItems.forEach(item => {

                const category = item.dataset.category;

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }

            });

        });

    });


    /*
     * Subtle reveal animation for timeline cards.
     * Uses IntersectionObserver when available and gracefully
     * falls back to the normal page if it is not supported.
     */

    const revealItems = document.querySelectorAll(
        ".fact-card, .product-card, .timeline-card, .process-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(item => {
            item.classList.add("reveal");
            observer.observe(item);
        });

    }


    /*
     * Keyboard support for timeline filtering.
     */

    filterButtons.forEach(button => {

        button.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                button.click();

            }

        });

    });

});