document.addEventListener("DOMContentLoaded", function() {
    const itemsZone2 = [
        { icon: 'store', text: 'D2C' },
        { icon: 'kit-medical', text: 'Health Tech' },
        { icon: 'city', text: 'B2B' },
        { icon: 'landmark', text: 'FinTech' },
        { icon: 'desktop', text: 'EdTech' },
        { icon: 'dumbbell', text: 'Personal care & Fitness' }
    ];

    const itemsZone3 = [
        { icon: 'desktop', text: 'SaaS' },
        { icon: 'store', text: 'B2C' },
        { icon: 'landmark', text: 'FinTech' },
        { icon: 'desktop', text: 'EdTech' },
        { icon: 'car', text: 'Sports' },
        { icon: 'bus', text: 'E-commerce' }
    ];

    const setupCarousel = (selector, items, direction) => {
        const carouselContent = document.querySelector(selector);

        // Function to reset carousel items
        const resetCarouselItems = () => {
            // Clear existing items
            carouselContent.innerHTML = '';

            // Generate carousel items again
            items.forEach(item => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                carouselItem.innerHTML = `<i class="fa-solid fa-${item.icon}"></i> &nbsp;${item.text}`;
                carouselContent.appendChild(carouselItem);
            });
        };

        // Setup initial carousel items
        resetCarouselItems();

        // Set initial position for smooth scrolling
        const totalHeight = carouselContent.offsetHeight;
        const initialOffset = direction === 'up' ? 0 : -totalHeight;
        carouselContent.style.transform = `translateY(${initialOffset}px)`;

        // Set the animation direction and duration
        const animationDuration = totalHeight / 50; // Adjust speed as needed
        carouselContent.style.transition = `transform ${animationDuration}s linear`;

        // Start scrolling animation after a short delay to ensure items are fully loaded
        setTimeout(() => {
            // Set the transform to start the animation
            carouselContent.style.transform = `translateY(${direction === 'up' ? -totalHeight : totalHeight}px)`;

            // Reset transform after animation completes to maintain infinite loop
            carouselContent.addEventListener('transitionend', () => {
                if (direction === 'up') {
                    carouselContent.style.transition = 'none'; // Remove transition temporarily
                    carouselContent.style.transform = `translateY(${totalHeight}px)`;
                    setTimeout(() => {
                        carouselContent.style.transition = `transform ${animationDuration}s linear`; // Restore transition
                        carouselContent.style.transform = `translateY(-${totalHeight}px)`;
                    }, 100); // Delay before resetting to start
                } else {
                    // Add new items and reset animation
                    resetCarouselItems();
                    carouselContent.style.transition = 'none'; // Remove transition temporarily
                    carouselContent.style.transform = `translateY(-${totalHeight}px)`;
                    setTimeout(() => {
                        carouselContent.style.transition = `transform ${animationDuration}s linear`; // Restore transition
                        carouselContent.style.transform = `translateY(-${totalHeight * 2}px)`;
                    }, 100); // Delay before resetting to start
                }
            });
        }, 100); // Delay to ensure items are fully loaded
    };

    // Setup carousel for zone2 (upward direction)
    setupCarousel('#upward', itemsZone2, 'up');

    // Setup carousel for zone3 (downward direction)
    setupCarousel('#downward', itemsZone3, 'down');
});
