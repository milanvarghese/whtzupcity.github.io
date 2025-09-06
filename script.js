// Dynamic Text Animation
document.addEventListener('DOMContentLoaded', function() {
    const dynamicTexts = document.querySelectorAll('.headline-dynamic-text');
    let currentIndex = 0;
    
    function rotateText() {
        // Remove active class from current text
        dynamicTexts[currentIndex].classList.remove('active');
        
        // Move to next text
        currentIndex = (currentIndex + 1) % dynamicTexts.length;
        
        // Add active class to new text
        dynamicTexts[currentIndex].classList.add('active');
    }
    
    // Start rotation
    if (dynamicTexts.length > 0) {
        setInterval(rotateText, 3000); // Change every 3 seconds
    }
});

// Web Stories Functionality - Open in lightbox modal
function openWebStory(storyUrl) {
    // Create or get the lightbox
    let lightbox = document.querySelector('.web-stories-lightbox');
    
    if (!lightbox) {
        // Create lightbox HTML
        lightbox = document.createElement('div');
        lightbox.className = 'web-stories-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <div class="lightbox-header">
                        <h3>Web Story</h3>
                        <button class="close-btn" onclick="closeWebStory()">&times;</button>
                    </div>
                    <div class="lightbox-body">
                        <iframe src="${storyUrl}" frameborder="0" width="100%" height="100%" allowfullscreen style="border: none; background: #000; display: block;" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(lightbox);
    } else {
        // Update iframe source
        const iframe = lightbox.querySelector('iframe');
        if (iframe) {
            iframe.src = storyUrl;
        }
    }
    
    // Show lightbox
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Force iframe to full screen
    const iframe = lightbox.querySelector('iframe');
    if (iframe) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            iframe.style.width = '100vw';
            iframe.style.height = 'calc(100vh - 60px)';
            iframe.style.minWidth = '100vw';
            iframe.style.minHeight = 'calc(100vh - 60px)';
        } else {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.minWidth = '100%';
            iframe.style.minHeight = '100%';
        }
        
        iframe.style.objectFit = 'cover';
        iframe.style.border = 'none';
        iframe.style.background = '#000';
    }
    
    // Close on overlay click
    const overlay = lightbox.querySelector('.lightbox-overlay');
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeWebStory();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWebStory();
        }
    });
}

function closeWebStory() {
    const lightbox = document.querySelector('.web-stories-lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Initialize Featured Categories
function initFeaturedCategories() {
    const categoryHighlights = document.querySelectorAll('.category-highlight');

    categoryHighlights.forEach(category => {
        category.addEventListener('click', function() {
            const onclickAttr = this.getAttribute('onclick');
            const urlMatch = onclickAttr.match(/openWebStory\('([^']+)'\)/);

            if (urlMatch) {
                const storyUrl = urlMatch[1];
                openWebStory(storyUrl);
            }
        });

        // Add hover effects
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFeaturedCategories();
});

// Lottie Animation (if available)
if (typeof lottie !== 'undefined') {
    lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'whtzup.city_files/lottie-animation.json' // You can replace this with your animation file
    });
}