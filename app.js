// Global variables
let currentSlide = 0;
let autoSlideInterval;
let assistantOpen = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Saffola Nutripower website initializing...');
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    setupNavigation();
    initializeCarousel();
    setupScrollEffects();
    initializeBenefits();
    initializeRecipeFilters();
    setupAssistant();
    initializeFloatingActions();
    initializeProductButtons();
    
    console.log('Saffola Nutripower website ready!');
}

// Navigation Functions
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Update nav on scroll
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
}

function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = 80;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        console.log('Scrolled to:', sectionId);
    } else {
        console.warn('Section not found:', sectionId);
    }
}

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 120;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Hero Carousel Functions
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!carouselTrack || !dots.length) return;
    
    // Set up dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Start auto-rotation
    startAutoSlide();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

function goToSlide(slideIndex) {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!carouselTrack || !slides.length) return;
    
    currentSlide = slideIndex;
    
    // Move carousel
    const slideWidth = 100;
    carouselTrack.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % 3;
        goToSlide(nextSlide);
    }, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Global scroll functions for buttons
function scrollToProducts() {
    console.log('Scrolling to products section');
    scrollToSection('products');
}

function scrollToBuy() {
    console.log('Scrolling to buy section');
    scrollToSection('buy');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize Product Buttons
function initializeProductButtons() {
    // Setup Learn More buttons for product cards
    const productBtns = document.querySelectorAll('.btn-product');
    productBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard?.getAttribute('data-product');
            if (productId) {
                showProductDetails(productId);
            }
        });
    });
    
    console.log('Product buttons initialized');
}

// Product Details Function
function showProductDetails(productId) {
    console.log('Showing product details for:', productId);
    const productInfo = {
        paste: {
            title: 'Saffola Nutripower Paste',
            description: 'Perfect spreadable consistency for breads, rotis, and morning meals. Rich in healthy fats and natural nutrition.',
            features: [
                'Smooth texture perfect for spreading',
                'Rich source of healthy fats from nuts',
                'Great for breakfast and snacks',
                'No artificial preservatives',
                'Family-friendly portion size'
            ],
            usage: [
                'Spread on bread, roti, or crackers',
                'Mix with warm water for instant drink',
                'Add to smoothies for extra nutrition',
                'Use in baking recipes'
            ]
        },
        powder: {
            title: 'Saffola Nutripower Mixture',
            description: 'Premium powder blend that mixes instantly with milk, water, or smoothies. High protein content for active lifestyles.',
            features: [
                'Instant mixing formula',
                '12g protein per serving',
                'Easy to digest',
                'Versatile usage options',
                'Concentrated nutrition'
            ],
            usage: [
                'Mix with milk for protein drink',
                'Add to smoothies and shakes',
                'Sprinkle on cereals and yogurt',
                'Use in healthy baking'
            ]
        },
        mix: {
            title: 'Saffola Nutripower Dry Fruit Mix',
            description: 'Ready-to-eat crunchy blend perfect for snacking. Natural energy boost with premium quality dry fruits.',
            features: [
                'Ready to eat convenience',
                'Crunchy satisfying texture',
                'Portable snacking option',
                'Natural energy source',
                'Best value per gram'
            ],
            usage: [
                'Direct snacking anytime',
                'Add to trail mixes',
                'Top for yogurt and cereals',
                'Office and travel snacking'
            ]
        }
    };
    
    const product = productInfo[productId];
    if (product) {
        // Create and show detailed modal or expand card
        showProductModal(product);
    }
}

function showProductModal(product) {
    // Create modal HTML
    const modalHTML = `
        <div class="product-modal" onclick="closeProductModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>${product.title}</h3>
                    <button class="modal-close" onclick="closeProductModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-section">
                        <h4>Key Features:</h4>
                        <ul class="product-list">
                            ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-section">
                        <h4>Best Used For:</h4>
                        <ul class="product-list">
                            ${product.usage.map(u => `<li>• ${u}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="scrollToBuy(); closeProductModal();">Buy Now</button>
                        <button class="btn-secondary" onclick="scrollToSection('recipes'); closeProductModal();">View Recipes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement.firstElementChild);
}

function closeProductModal(event) {
    if (event) event.preventDefault();
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
    }
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.product-card, .benefit-card, .recipe-card, .platform-card, .testimonial-card, .feature-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Interactive Benefits
function initializeBenefits() {
    console.log('Initializing interactive benefits...');
    const benefitCards = document.querySelectorAll('.benefit-card.interactive');
    
    benefitCards.forEach((card, index) => {
        const toggle = card.querySelector('.benefit-toggle');
        const detail = card.querySelector('.benefit-detail');
        
        if (toggle && detail) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isHidden = detail.classList.contains('hidden');
                console.log(`Toggling benefit card ${index + 1}, currently hidden: ${isHidden}`);
                
                if (isHidden) {
                    detail.classList.remove('hidden');
                    this.textContent = 'Show Less';
                    card.style.transform = 'scale(1.02)';
                    card.style.borderColor = 'var(--saffola-red)';
                } else {
                    detail.classList.add('hidden');
                    this.textContent = 'Learn More';
                    card.style.transform = 'scale(1)';
                    card.style.borderColor = 'var(--saffola-cream)';
                }
            });
            console.log(`Added click handler to benefit card ${index + 1}`);
        } else {
            console.warn(`Missing toggle or detail element in benefit card ${index + 1}`);
        }
    });
    
    console.log(`Initialized ${benefitCards.length} interactive benefit cards`);
}

// Nutrition Calculator
function calculateNutrition() {
    console.log('Calculating nutrition needs...');
    const age = document.getElementById('age')?.value;
    const activity = document.getElementById('activity')?.value;
    const resultDiv = document.getElementById('calculatorResult');
    const recommendationsDiv = document.querySelector('.nutrition-recommendations');
    
    if (!age || !activity) {
        alert('Please fill in all fields to calculate your nutrition needs.');
        return;
    }
    
    const ageNum = parseInt(age);
    let proteinNeed, calorieNeed, servingRecommendation;
    
    // Basic calculation logic
    if (activity === 'low') {
        proteinNeed = Math.round(ageNum < 30 ? 50 : ageNum < 50 ? 55 : 60);
        calorieNeed = Math.round(ageNum < 30 ? 2000 : ageNum < 50 ? 1900 : 1800);
    } else if (activity === 'moderate') {
        proteinNeed = Math.round(ageNum < 30 ? 65 : ageNum < 50 ? 70 : 65);
        calorieNeed = Math.round(ageNum < 30 ? 2300 : ageNum < 50 ? 2200 : 2000);
    } else {
        proteinNeed = Math.round(ageNum < 30 ? 80 : ageNum < 50 ? 85 : 80);
        calorieNeed = Math.round(ageNum < 30 ? 2600 : ageNum < 50 ? 2500 : 2300);
    }
    
    servingRecommendation = Math.ceil(proteinNeed / 12); // 12g protein per serving
    
    if (recommendationsDiv) {
        recommendationsDiv.innerHTML = `
            <div class="recommendation-item">
                <h5>Daily Protein Need</h5>
                <span class="recommendation-value">${proteinNeed}g</span>
            </div>
            <div class="recommendation-item">
                <h5>Daily Calories</h5>
                <span class="recommendation-value">${calorieNeed}</span>
            </div>
            <div class="recommendation-item">
                <h5>Recommended Servings</h5>
                <span class="recommendation-value">${servingRecommendation} servings</span>
            </div>
            <div class="recommendation-item">
                <h5>Nutripower Contribution</h5>
                <span class="recommendation-value">${Math.round((12 * servingRecommendation / proteinNeed) * 100)}% of protein needs</span>
            </div>
        `;
    }
    
    resultDiv?.classList.remove('hidden');
    console.log('Nutrition calculation completed');
}

// Recipe Filters
function initializeRecipeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter recipes
            recipeCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const difficulty = card.getAttribute('data-difficulty');
                
                let shouldShow = false;
                
                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'easy') {
                    shouldShow = difficulty === 'easy';
                } else {
                    shouldShow = category === filter;
                }
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// Platform Redirect Functions with App Fallbacks
function fallbackToBlinkit(event) {
    event.preventDefault();
    console.log('Opening Blinkit...');
    window.open('https://blinkit.com/search?q=saffola+nutripower', '_blank');
}

function fallbackToZepto(event) {
    event.preventDefault();
    console.log('Opening Zepto...');
    window.open('https://www.zeptonow.com/search?query=saffola+nutripower', '_blank');
}

function fallbackToInstamart(event) {
    event.preventDefault();
    console.log('Opening Instamart...');
    window.open('https://www.swiggy.com/instamart/search?custom_back=true&query=saffola+nutripower', '_blank');
}

function fallbackToBigBasket(event) {
    event.preventDefault();
    console.log('Opening BigBasket...');
    window.open('https://www.bigbasket.com/ps/?q=saffola+nutripower', '_blank');
}

// Availability Checker
function checkAvailability() {
    const pincode = document.getElementById('pincode')?.value;
    const resultDiv = document.getElementById('availabilityResult');
    const contentDiv = resultDiv?.querySelector('.result-content');
    
    if (!pincode) {
        alert('Please enter your pincode to check availability.');
        return;
    }
    
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        alert('Please enter a valid 6-digit pincode.');
        return;
    }
    
    // Simulate API call
    if (contentDiv) {
        contentDiv.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 2rem; margin-bottom: 16px;">📍</div>
                <h4>Great news!</h4>
                <p>Saffola Nutripower is available in your area (${pincode}).</p>
                <div style="margin-top: 20px;">
                    <h5>Available on these platforms:</h5>
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
                        <span style="background: #28A745; color: white; padding: 6px 12px; border-radius: 12px; font-size: 0.8rem;">✓ Blinkit</span>
                        <span style="background: #28A745; color: white; padding: 6px 12px; border-radius: 12px; font-size: 0.8rem;">✓ Zepto</span>
                        <span style="background: #28A745; color: white; padding: 6px 12px; border-radius: 12px; font-size: 0.8rem;">✓ BigBasket</span>
                        <span style="background: #28A745; color: white; padding: 6px 12px; border-radius: 12px; font-size: 0.8rem;">✓ Amazon</span>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <small style="color: #666;">Estimated delivery: 10-30 minutes (quick commerce) or 1-2 days (e-commerce)</small>
                </div>
            </div>
        `;
    }
    
    resultDiv?.classList.remove('hidden');
}

// Nutrition Assistant
function setupAssistant() {
    console.log('Setting up nutrition assistant...');
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    console.log('Nutrition assistant setup complete');
}

function toggleAssistant() {
    console.log('Toggling nutrition assistant...');
    const assistantChat = document.getElementById('assistantChat');
    const chatInput = document.getElementById('chatInput');
    
    if (assistantChat) {
        assistantOpen = !assistantOpen;
        
        if (assistantOpen) {
            console.log('Opening assistant chat');
            assistantChat.classList.remove('hidden');
            setTimeout(() => {
                chatInput?.focus();
            }, 300);
        } else {
            console.log('Closing assistant chat');
            assistantChat.classList.add('hidden');
        }
    } else {
        console.warn('Assistant chat element not found');
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    console.log('Sending chat message:', message);
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 800);
}

function addChatMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! I'm your Saffola Nutripower nutrition expert. I can help you with product information, recipes, and nutrition advice. What would you like to know?";
    }
    
    // Product questions
    if (message.includes('paste')) {
        return "Nutripower Paste is perfect for spreading on bread and rotis! It's smooth, rich in healthy fats, and great for family breakfasts. Would you like to know about its nutritional benefits?";
    }
    
    if (message.includes('powder') || message.includes('mixture')) {
        return "Nutripower Powder is our most popular variant! Mix it with milk for a protein-rich drink (12g per serving). It's perfect for smoothies, shakes, and active lifestyles.";
    }
    
    if (message.includes('mix') || message.includes('snack')) {
        return "Nutripower Mix is ready-to-eat and perfect for snacking! Crunchy, portable, and gives you natural energy. Great for office, travel, or anytime snacking.";
    }
    
    // Nutrition questions
    if (message.includes('protein')) {
        return "All Nutripower variants provide 12g of high-quality protein per serving! This covers about 20-25% of your daily protein needs and helps with muscle health and satiety.";
    }
    
    if (message.includes('benefits') || message.includes('nutrition')) {
        return "Nutripower is rich in Omega-3 fatty acids, high protein (12g), natural fiber, essential minerals, and antioxidants. Plus, it has zero preservatives - just pure natural nutrition!";
    }
    
    if (message.includes('omega')) {
        return "Yes! Nutripower is rich in Omega-3 from walnuts and almonds. These support brain health, improve cognitive function, and are great for heart health too.";
    }
    
    // Recipe questions
    if (message.includes('recipe') || message.includes('cook')) {
        return "I have lots of recipe ideas! Try energy ladoos, smoothie bowls, protein pancakes, or healthy cookies. Check our recipes section for step-by-step YouTube videos!";
    }
    
    if (message.includes('breakfast')) {
        return "For breakfast, try: Nutripower smoothie bowl, protein pancakes, overnight oats with paste, or simply mix powder with milk. All are quick, nutritious, and delicious!";
    }
    
    // Usage questions
    if (message.includes('how to use') || message.includes('serving')) {
        return "Use 20-30g (2-3 tbsp) per serving. Paste: spread on bread/roti. Powder: mix with 200ml milk. Mix: eat directly or add to yogurt/cereals. Start with smaller amounts for children.";
    }
    
    if (message.includes('children') || message.includes('kids')) {
        return "Nutripower is perfect for growing children! Start with 1-2 tbsp servings. The paste is great for picky eaters, and powder makes milk more appealing. All variants support healthy growth.";
    }
    
    // Buying questions
    if (message.includes('buy') || message.includes('where') || message.includes('price')) {
        return "You can buy Nutripower on Blinkit, Zepto, Swiggy Instamart, BigBasket for quick delivery. Also available on Amazon, Flipkart, and top pharmacies. All variants are competitively priced for premium nutrition.";
    }
    
    // Health questions
    if (message.includes('weight loss') || message.includes('diet')) {
        return "Nutripower supports weight management with high protein (increases satiety) and healthy fats. Use powder in smoothies, paste instead of regular spreads, or mix as a healthy snack.";
    }
    
    if (message.includes('diabetes') || message.includes('sugar')) {
        return "Nutripower has no added sugars - sweetness comes naturally from dates. However, for diabetes management, please consult your doctor about portion sizes and how it fits your meal plan.";
    }
    
    // Age-specific questions
    if (message.includes('elderly') || message.includes('senior')) {
        return "Great for seniors! Easy to digest, provides essential nutrients for bone health (calcium, magnesium), and the paste form is gentle on teeth. Perfect for maintaining strength and energy.";
    }
    
    // Storage and safety
    if (message.includes('storage') || message.includes('expire')) {
        return "Store in a cool, dry place. After opening, refrigerate and use within 2-3 months. Always use a clean, dry spoon. Check the packaging for exact expiry dates.";
    }
    
    // Comparison questions
    if (message.includes('difference') || message.includes('which one')) {
        return "Choose based on convenience: Paste for spreading, Powder for drinks, Mix for snacking. All have the same nutritional benefits - 12g protein, Omega-3, and zero preservatives!";
    }
    
    // Default helpful response
    return "That's a great question! Nutripower provides complete nutrition with premium dry fruits. For specific health advice, consult a nutritionist. Would you like to know about our products, recipes, or nutritional benefits?";
}

// Floating Actions
function initializeFloatingActions() {
    // Show/hide floating actions based on scroll
    window.addEventListener('scroll', debounce(() => {
        const floatingActions = document.querySelector('.floating-actions');
        if (floatingActions) {
            if (window.pageYOffset > 300) {
                floatingActions.style.opacity = '1';
                floatingActions.style.transform = 'translateY(0)';
            } else {
                floatingActions.style.opacity = '0';
                floatingActions.style.transform = 'translateY(20px)';
            }
        }
    }, 100));
}

function openLiveChat() {
    console.log('Opening live chat...');
    // Open nutrition assistant
    if (!assistantOpen) {
        toggleAssistant();
    }
    
    // Add a welcome message for live chat
    setTimeout(() => {
        addChatMessage("Hi! I'm here to help you with any questions about Saffola Nutripower. Ask me about products, nutrition, recipes, or anything else!", 'bot');
    }, 500);
}

// Utility Functions
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

// Additional interactive features
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-product');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});

// Performance optimization
function optimizeImages() {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        if (assistantOpen) {
            toggleAssistant();
        }
        
        const productModal = document.querySelector('.product-modal');
        if (productModal) {
            closeProductModal();
        }
    }
    
    // Navigation with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const isCarouselFocused = document.querySelector('.carousel-container:hover');
        if (isCarouselFocused) {
            e.preventDefault();
            const direction = e.key === 'ArrowLeft' ? -1 : 1;
            const newSlide = (currentSlide + direction + 3) % 3;
            goToSlide(newSlide);
        }
    }
});

// Add touch/swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container')?.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container')?.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        const nextSlide = (currentSlide + 1) % 3;
        goToSlide(nextSlide);
    }
    
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        const prevSlide = (currentSlide - 1 + 3) % 3;
        goToSlide(prevSlide);
    }
}

// Social sharing functionality
function shareProduct(platform, productName) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${productName} - Complete morning nutrition in every form! #SaffolaNutripower #HealthyLiving`);
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Enhanced product image loading with fallbacks
function handleImageError(img) {
    console.warn('Image failed to load:', img.src);
    // You could add fallback placeholder images here if needed
    img.style.display = 'none';
}

// Add error handlers to all product images
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.actual-product-image, .actual-product-card-image, .platform-logo');
    productImages.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
        
        img.addEventListener('load', function() {
            console.log('Successfully loaded image:', this.src);
        });
    });
});

// Enhanced platform detection and app redirection
function detectPlatform() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = {
        ios: /iphone|ipad|ipod/.test(userAgent),
        android: /android/.test(userAgent),
        mobile: /mobile/.test(userAgent),
        desktop: !(/mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/.test(userAgent))
    };
    return platform;
}

// Enhanced platform redirects with better app detection
function tryAppRedirect(appScheme, fallbackUrl) {
    const platform = detectPlatform();
    
    if (platform.mobile) {
        // Try app scheme first
        const appLink = document.createElement('a');
        appLink.href = appScheme;
        appLink.click();
        
        // Fallback to web version after short delay
        setTimeout(() => {
            window.open(fallbackUrl, '_blank');
        }, 1000);
    } else {
        // Desktop - go directly to web version
        window.open(fallbackUrl, '_blank');
    }
}

console.log('🥜 Saffola Nutripower - The most interactive nutrition website is ready!');
console.log('✅ All features loaded: Carousel, Navigation, Calculator, Recipes, Assistant, and more!');
console.log('🖼️ Real brand logos and actual product images integrated throughout!');
console.log('🚀 Ready for the best user experience with authentic branding!');

// Make functions globally available
window.scrollToProducts = scrollToProducts;
window.scrollToBuy = scrollToBuy;
window.scrollToTop = scrollToTop;
window.showProductDetails = showProductDetails;
window.closeProductModal = closeProductModal;
window.calculateNutrition = calculateNutrition;
window.checkAvailability = checkAvailability;
window.toggleAssistant = toggleAssistant;
window.sendChatMessage = sendChatMessage;
window.openLiveChat = openLiveChat;
window.fallbackToBlinkit = fallbackToBlinkit;
window.fallbackToZepto = fallbackToZepto;
window.fallbackToInstamart = fallbackToInstamart;
window.fallbackToBigBasket = fallbackToBigBasket;