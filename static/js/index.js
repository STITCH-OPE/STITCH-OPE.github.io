window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
    }

    // Initialize all div with carousel class
    if (typeof bulmaCarousel !== 'undefined') {
        var carousels = bulmaCarousel.attach('.carousel', options);
    }
    
    if (typeof bulmaSlider !== 'undefined') {
        bulmaSlider.attach();
    }

    // Simple carousel fallback if bulmaCarousel is not available
    if (typeof bulmaCarousel === 'undefined') {
        // Simple carousel implementation
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel .item');
        const totalSlides = slides.length;

        if (totalSlides > 0) {
            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.style.display = i === index ? 'block' : 'none';
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }

            // Show first slide
            showSlide(0);

            // Auto-advance slides
            setInterval(nextSlide, 5000);
        }
    }

    // Video synchronization (if needed)
    function syncAndPlayVideos(rowNumber) {
        const videos = document.querySelectorAll(`#row-video${rowNumber}`);
        videos.forEach(video => {
            video.currentTime = 0;
            video.play().catch(e => console.log('Auto-play blocked:', e));
        });
    }

    // Initialize video controls if they exist
    document.querySelectorAll('.play-pause-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnId = this.id;
            const rowNumber = btnId.replace('play-pause-btn', '');
            const videos = document.querySelectorAll(`#row-video${rowNumber}`);
            
            videos.forEach(video => {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i><span class="ml-2">Pause</span>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i><span class="ml-2">Play</span>';
                }
            });
        });
    });

    document.querySelectorAll('.restart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnId = this.id;
            const rowNumber = btnId.replace('restart-btn', '');
            const videos = document.querySelectorAll(`#row-video${rowNumber}`);
            
            videos.forEach(video => {
                video.currentTime = 0;
                video.play();
            });
            
            const playBtn = document.querySelector(`#play-pause-btn${rowNumber}`);
            if (playBtn) {
                playBtn.innerHTML = '<i class="fas fa-pause"></i><span class="ml-2">Pause</span>';
            }
        });
    });
});