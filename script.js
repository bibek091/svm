

  // Global variables
let currentSlide = 0;
let slideInterval;
let currentGalleryFilter = 'All';
let galleryImages = [];
let currentModalImage = 0;

// Hero slider data
const slides = [
    {
        title: 'Welcome to Sharada Vidhya Mandir',
        subtitle: 'Preparing Students for SEE Success & Beyond'
    },
    {
        title: 'Excellence in Secondary Education',
        subtitle: 'Your Gateway to Higher Education Success'
    },
    {
        title: 'SEE Preparation Excellence',
        subtitle: 'Comprehensive Learning for Secondary Education Examination'
    }
];



// Gallery data
const galleryData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
        title: 'SEE Preparation Session',
        category: 'SEE Prep',
        date: '2024-02-20',
        description: 'Grade 10 students attending intensive SEE preparation classes with our expert teachers.'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
        title: 'Science Laboratory Work',
        category: 'Academic',
        date: '2024-02-15',
        description: 'Students conducting practical experiments in our well-equipped science laboratory.'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
        title: 'Inter-House Basketball',
        category: 'Sports',
        date: '2024-02-10',
        description: 'Grade 9 and 10 students participating in inter-house basketball tournament.'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
        title: 'SEE Toppers Award Ceremony',
        category: 'Awards',
        date: '2024-02-05',
        description: 'Celebrating our SEE 2023 toppers and their outstanding achievements.'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        title: 'Cultural Dance Performance',
        category: 'Cultural',
        date: '2024-01-28',
        description: 'Students showcasing traditional Nepali dances during our cultural program.'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        title: 'Mathematics Olympiad',
        category: 'Academic',
        date: '2024-01-25',
        description: 'Grade 10 students competing in the inter-school mathematics olympiad competition.'
    },
    {
        id: 7,
        src: 'images/Farewell/1.jpg',
        title: 'Grade 10 Farewell',
        category: 'Cultural',
        date: '2024-01-20',
        description: 'Emotional farewell ceremony for our Grade 10 students before SEE examinations.'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
        title: 'SEE Mock Examination',
        category: 'SEE Prep',
        date: '2024-01-15',
        description: 'Grade 10 students taking their final mock examination before the actual SEE.'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop',
        title: 'Grade 9 Project Presentation',
        category: 'Academic',
        date: '2024-01-10',
        description: 'Grade 9 students presenting their term projects to teachers and fellow students.'
    }
    
];
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(filter = 'All') {
    galleryGrid.innerHTML = '';

    const filtered = galleryData.filter(item => {
        return filter === 'All' || item.category === filter;
    });

    filtered.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'gallery-item';
        itemElement.dataset.category = item.category;

        let imagesHTML = '';

        if (Array.isArray(item.src)) {
            imagesHTML = item.src.map(src => `
                <img src="${src}" alt="${item.title}" class="w-full rounded-lg shadow-md mb-2" />
            `).join('');
        } else {
            imagesHTML = `<img src="${item.src}" alt="${item.title}" class="w-full rounded-lg shadow-md mb-2" />`;
        }

        itemElement.innerHTML = `
            ${imagesHTML}
            <h3 class="font-semibold text-foreground">${item.title}</h3>
            <p class="text-sm text-muted-foreground">${item.description}</p>
        `;

        galleryGrid.appendChild(itemElement);
    });
}

// Initial gallery load
renderGallery();

// Filter button function
function filterGallery(category) {
    currentGalleryFilter = category;
    renderGallery(category);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeDarkMode();
    initializeMobileMenu();
    initializeGallery();
    initializeContactForm();
    initializeScrollToTop();
    setCurrentYear();
    
    // Start slider auto-play
    startSlideShow();
});

// Initialize Hero Slider
function initializeSlider() {
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlideShow();
            previousSlide();
            startSlideShow();
        });
        
        nextBtn.addEventListener('click', () => {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }
}

// Start slideshow
function startSlideShow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Stop slideshow
function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

// Previous slide
function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide();
}

// Set specific slide
function setSlide(index) {
    stopSlideShow();
    currentSlide = index;
    updateSlide();
    startSlideShow();
}

// Update slide display
function updateSlide() {
    // Update slide visibility
    for (let i = 0; i < slides.length; i++) {
        const slideElement = document.getElementById(`slide-${i}`);
        const indicatorElement = document.getElementById(`indicator-${i}`);
        
        if (slideElement) {
            slideElement.style.opacity = i === currentSlide ? '1' : '0';
        }
        
        if (indicatorElement) {
            indicatorElement.className = i === currentSlide 
                ? 'w-3 h-3 rounded-full bg-white transition-colors duration-200'
                : 'w-3 h-3 rounded-full bg-white/50 transition-colors duration-200';
        }
    }
    
    // Update text content
    const titleElement = document.getElementById('heroTitle');
    const subtitleElement = document.getElementById('heroSubtitle');
    
    if (titleElement && subtitleElement) {
        titleElement.textContent = slides[currentSlide].title;
        subtitleElement.textContent = slides[currentSlide].subtitle;
    }
}

// Initialize Dark Mode
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIndicator = document.getElementById('darkModeIndicator');
    
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    let isDarkMode = false;
    
    if (savedDarkMode) {
        isDarkMode = JSON.parse(savedDarkMode);
    } else {
        // Check system preference
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply dark mode
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        darkModeToggle.classList.add('dark');
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                darkModeToggle.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
                darkModeToggle.classList.remove('dark');
            }
            
            localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        });
    }
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn && mobileMenu && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
}

// Close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Scroll to section
function scrollToSection(href) {
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize Gallery
function initializeGallery() {
    galleryImages = [...galleryData];
    renderGallery();
    initializeGalleryModal();
}

// Filter gallery
function filterGallery(category) {
    currentGalleryFilter = category;
    
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.gallery-filter');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    
    renderGallery();
}

// Render gallery
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const filteredImages = currentGalleryFilter === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentGalleryFilter);
    
    galleryGrid.innerHTML = '';
    
    filteredImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });
}

// Create gallery item
function createGalleryItem(image, index) {
    const div = document.createElement('div');
    div.className = 'bg-card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group rounded-lg gallery-item';
    div.onclick = () => openGalleryModal(index);
    
    div.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${image.src}" alt="${image.title}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="text-white text-center">
                    <p class="text-sm mb-1">Click to view</p>
                    <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                    </svg>
                </div>
            </div>
            <span class="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                ${image.category}
            </span>
        </div>
        <div class="p-4">
            <h3 class="font-semibold mb-2 text-foreground">${image.title}</h3>
            <div class="flex items-center text-sm text-muted-foreground">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                ${formatDate(image.date)}
            </div>
        </div>
    `;
    
    return div;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NP', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Initialize Gallery Modal
function initializeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeGalleryModal);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateModalImage('prev'));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateModalImage('next'));
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('galleryModal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                navigateModalImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateModalImage('next');
            }
        }
    });
}

// Open gallery modal
function openGalleryModal(imageIndex) {
    const filteredImages = currentGalleryFilter === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentGalleryFilter);
    
    currentModalImage = imageIndex;
    const modal = document.getElementById('galleryModal');
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        updateModalContent(filteredImages[imageIndex]);
    }
}

// Close gallery modal
function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// Navigate modal image
function navigateModalImage(direction) {
    const filteredImages = currentGalleryFilter === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentGalleryFilter);
    
    if (direction === 'prev') {
        currentModalImage = currentModalImage > 0 ? currentModalImage - 1 : filteredImages.length - 1;
    } else {
        currentModalImage = currentModalImage < filteredImages.length - 1 ? currentModalImage + 1 : 0;
    }
    
    updateModalContent(filteredImages[currentModalImage]);
}

// Update modal content
function updateModalContent(image) {
    const modalContent = document.getElementById('modalContent');
    
    if (modalContent) {
        modalContent.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="w-full h-auto max-h-[60vh] object-contain">
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-semibold text-foreground">${image.title}</h3>
                    <span class="px-2 py-1 bg-primary text-primary-foreground rounded text-sm">${image.category}</span>
                </div>
                <div class="flex items-center text-sm text-muted-foreground mb-3">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    ${new Date(image.date).toLocaleDateString('en-NP', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>
                <p class="text-muted-foreground">${image.description}</p>
            </div>
        `;
    }
}

// Initialize Contact Form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
        });
    }
}

// Initialize Scroll to Top
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Initially hide the button
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear().toString();
    }
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for all anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        scrollToSection(targetId);
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
}, 250));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add intersection observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
} else {
    // Fallback for browsers without IntersectionObserver support
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-fade-in');
    });
}
