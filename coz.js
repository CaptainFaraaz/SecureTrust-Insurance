// SecureTrust Insurance - Main JavaScript File
// Comprehensive functionality for the insurance website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    NavigationModule.init();
    FormModule.init();
    AnimationModule.init();
    QuoteCalculatorModule.init();
    TestimonialModule.init();
    StatisticsModule.init();
    FAQModule.init();
    ContactModule.init();
    ModalModule.init();
    ThemeModule.init();
});

// ============================================
// NAVIGATION MODULE
// ============================================
const NavigationModule = {
    init() {
        this.setupMobileMenu();
        this.setupActiveLinks();
        this.setupSmoothScrolling();
        this.setupStickyHeader();
    },

    setupMobileMenu() {
        // Create mobile menu toggle if it doesn't exist
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Create hamburger menu
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #2c3e50;
        `;

        // Add mobile styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                }
                .nav-menu {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    padding: 1rem;
                }
                .nav-menu.active {
                    display: flex;
                }
                .navbar {
                    flex-wrap: wrap;
                    position: relative;
                }
            }
        `;
        document.head.appendChild(style);

        navbar.appendChild(mobileToggle);

        mobileToggle.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
            mobileToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    },

    setupActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    },

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    setupStickyHeader() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });

        // Add scrolled styles
        const style = document.createElement('style');
        style.textContent = `
            header.scrolled {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
        `;
        document.head.appendChild(style);
    }
};

// ============================================
// FORM MODULE
// ============================================
const FormModule = {
    init() {
        this.setupFormValidation();
        this.setupQuoteForm();
        this.setupContactForm();
        this.setupNewsletterForm();
    },

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    },

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.removeFieldError(field);

        // Required field check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Show error if invalid
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    },

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 0.25rem; display: block;';
        field.parentNode.appendChild(errorElement);
    },

    removeFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    },

    setupQuoteForm() {
        const quoteForm = document.getElementById('quote-form');
        if (!quoteForm) return;

        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleQuoteSubmission(quoteForm);
        });
    },

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(contactForm);
        });
    },

    setupNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmission(form);
            });
        });
    },

    handleQuoteSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            ModalModule.showModal({
                title: 'Quote Request Submitted!',
                content: `
                    <p>Thank you for your interest in our insurance services!</p>
                    <p>We've received your quote request and one of our agents will contact you within 24 hours.</p>
                    <p><strong>Reference Number:</strong> ST${Date.now()}</p>
                `,
                type: 'success'
            });
            
            form.reset();
        }, 2000);
    },

    handleContactSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            ModalModule.showModal({
                title: 'Message Sent!',
                content: '<p>Thank you for contacting us. We\'ll get back to you within 24 hours.</p>',
                type: 'success'
            });
            
            form.reset();
        }, 1500);
    },

    handleNewsletterSubmission(form) {
        const email = form.querySelector('input[type="email"]').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Subscribe';
            submitBtn.disabled = false;
            
            ModalModule.showModal({
                title: 'Successfully Subscribed!',
                content: '<p>You\'ve been added to our newsletter. Thank you for subscribing!</p>',
                type: 'success'
            });
            
            form.reset();
        }, 1000);
    }
};

// ============================================
// ANIMATION MODULE
// ============================================
const AnimationModule = {
    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupTypewriterEffect();
    },

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .testimonial, .value-card, .team-member, .service-card, .step, .faq-item'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));
    },

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat h3');
        const observerOptions = { threshold: 0.5 };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    },

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Preserve original formatting
            const originalText = element.textContent;
            const suffix = originalText.replace(/[\d,]/g, '');
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 16);
    },

    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #3498db';
            
            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text[i];
                i++;
                
                if (i >= text.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }
};

// ============================================
// QUOTE CALCULATOR MODULE
// ============================================
const QuoteCalculatorModule = {
    init() {
        this.setupCalculator();
        this.rates = {
            auto: { base: 800, factors: { age: 0.1, location: 0.05, coverage: 0.3 } },
            home: { base: 1200, factors: { value: 0.002, location: 0.08, coverage: 0.25 } },
            life: { base: 600, factors: { age: 0.15, health: 0.1, coverage: 0.4 } },
            business: { base: 2000, factors: { size: 0.3, industry: 0.2, coverage: 0.35 } }
        };
    },

    setupCalculator() {
        const calculatorForm = document.getElementById('quote-calculator');
        if (!calculatorForm) return;

        const insuranceType = calculatorForm.querySelector('select[name="insurance-type"]');
        if (insuranceType) {
            insuranceType.addEventListener('change', () => {
                this.updateCalculatorFields(insuranceType.value);
            });
        }

        calculatorForm.addEventListener('input', () => {
            this.calculateQuote(calculatorForm);
        });
    },

    updateCalculatorFields(type) {
        const dynamicFields = document.getElementById('dynamic-fields');
        if (!dynamicFields) return;

        let fieldsHTML = '';

        switch(type) {
            case 'auto':
                fieldsHTML = `
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" min="18" max="100" required>
                    </div>
                    <div class="form-group">
                        <label for="vehicle-year">Vehicle Year</label>
                        <input type="number" id="vehicle-year" name="vehicle-year" min="1990" max="2024" required>
                    </div>
                    <div class="form-group">
                        <label for="coverage-level">Coverage Level</label>
                        <select id="coverage-level" name="coverage-level" required>
                            <option value="basic">Basic</option>
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div>
                `;
                break;
            case 'home':
                fieldsHTML = `
                    <div class="form-group">
                        <label for="home-value">Home Value ($)</label>
                        <input type="number" id="home-value" name="home-value" min="50000" required>
                    </div>
                    <div class="form-group">
                        <label for="location-risk">Location Risk</label>
                        <select id="location-risk" name="location-risk" required>
                            <option value="low">Low Risk</option>
                            <option value="medium">Medium Risk</option>
                            <option value="high">High Risk</option>
                        </select>
                    </div>
                `;
                break;
            case 'life':
                fieldsHTML = `
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" min="18" max="80" required>
                    </div>
                    <div class="form-group">
                        <label for="health-status">Health Status</label>
                        <select id="health-status" name="health-status" required>
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="average">Average</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="coverage-amount">Coverage Amount ($)</label>
                        <select id="coverage-amount" name="coverage-amount" required>
                            <option value="100000">$100,000</option>
                            <option value="250000">$250,000</option>
                            <option value="500000">$500,000</option>
                            <option value="1000000">$1,000,000</option>
                        </select>
                    </div>
                `;
                break;
        }

        dynamicFields.innerHTML = fieldsHTML;
    },

    calculateQuote(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const type = data['insurance-type'];
        
        if (!type || !this.rates[type]) return;

        let quote = this.rates[type].base;
        const factors = this.rates[type].factors;

        // Apply type-specific calculations
        switch(type) {
            case 'auto':
                if (data.age) {
                    const ageFactor = data.age < 25 ? 1.5 : data.age > 65 ? 1.2 : 1;
                    quote *= ageFactor;
                }
                if (data['coverage-level']) {
                    const coverageMultiplier = {
                        'basic': 0.8,
                        'standard': 1,
                        'premium': 1.4
                    };
                    quote *= coverageMultiplier[data['coverage-level']];
                }
                break;
                
            case 'home':
                if (data['home-value']) {
                    quote += parseInt(data['home-value']) * factors.value;
                }
                if (data['location-risk']) {
                    const riskMultiplier = {
                        'low': 0.9,
                        'medium': 1,
                        'high': 1.3
                    };
                    quote *= riskMultiplier[data['location-risk']];
                }
                break;
                
            case 'life':
                if (data.age) {
                    quote *= (1 + (parseInt(data.age) - 30) * factors.age / 100);
                }
                if (data['health-status']) {
                    const healthMultiplier = {
                        'excellent': 0.8,
                        'good': 1,
                        'average': 1.2,
                        'poor': 1.6
                    };
                    quote *= healthMultiplier[data['health-status']];
                }
                if (data['coverage-amount']) {
                    quote += parseInt(data['coverage-amount']) * factors.coverage / 1000;
                }
                break;
        }

        this.displayQuote(Math.round(quote));
    },

    displayQuote(amount) {
        let quoteDisplay = document.getElementById('quote-display');
        if (!quoteDisplay) {
            quoteDisplay = document.createElement('div');
            quoteDisplay.id = 'quote-display';
            quoteDisplay.style.cssText = `
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                margin-top: 2rem;
                animation: fadeInUp 0.5s ease-out;
            `;
            document.getElementById('quote-calculator').appendChild(quoteDisplay);
        }

        quoteDisplay.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: white;">Estimated Annual Premium</h3>
            <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">$${amount.toLocaleString()}</div>
            <p style="opacity: 0.9; margin-bottom: 1.5rem;">This is an estimate. Final rates may vary based on additional factors.</p>
            <button type="button" class="btn btn-secondary" onclick="ModalModule.showQuoteModal(${amount})">Get Official Quote</button>
        `;
    }
};

// ============================================
// TESTIMONIAL MODULE
// ============================================
const TestimonialModule = {
    init() {
        this.setupTestimonialSlider();
        this.testimonials = [
            {
                text: "SecureTrust saved me thousands on my auto insurance while providing better coverage. Their customer service is exceptional!",
                author: "Sarah Johnson",
                location: "Dallas, TX",
                rating: 5
            },
            {
                text: "The claims process was smooth and hassle-free. I had my settlement within days of filing my claim.",
                author: "Michael Chen",
                location: "San Francisco, CA",
                rating: 5
            },
            {
                text: "Professional, reliable, and trustworthy. I've recommended SecureTrust to all my friends and family.",
                author: "Emma Rodriguez",
                location: "Miami, FL",
                rating: 5
            },
            {
                text: "Their online platform makes managing my policies so easy. Great rates and excellent service!",
                author: "David Thompson",
                location: "Chicago, IL",
                rating: 5
            }
        ];
    },

    setupTestimonialSlider() {
        const container = document.querySelector('.testimonials-grid');
        if (!container || container.children.length > 0) return;

        this.currentIndex = 0;
        this.renderTestimonials();
        this.startAutoSlide();
    },

    renderTestimonials() {
        const container = document.querySelector('.testimonials-grid');
        if (!container) return;

        container.innerHTML = '';
        
        // Show 3 testimonials at a time on desktop, 1 on mobile
        const testimonialsToShow = window.innerWidth > 768 ? 3 : 1;
        
        for (let i = 0; i < testimonialsToShow; i++) {
            const index = (this.currentIndex + i) % this.testimonials.length;
            const testimonial = this.testimonials[index];
            
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial fade-in-up';
            testimonialElement.innerHTML = `
                <p>"${testimonial.text}"</p>
                <div>
                    <span>${testimonial.author}</span><br>
                    <small style="color: #6c757d;">${testimonial.location}</small>
                </div>
                <div class="rating">
                    ${'★'.repeat(testimonial.rating)}
                </div>
            `;
            
            container.appendChild(testimonialElement);
        }
    },

    startAutoSlide() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
            this.renderTestimonials();
        }, 5000);
    }
};

// ============================================
// STATISTICS MODULE
// ============================================
const StatisticsModule = {
    init() {
        this.updateStatistics();
    },

    updateStatistics() {
        const stats = document.querySelectorAll('.stat h3');
        const statisticsData = [
            { selector: 'customers', value: '50000', suffix: '+' },
            { selector: 'claims', value: '99.8', suffix: '%' },
            { selector: 'experience', value: '25', suffix: ' Years' },
            { selector: 'satisfaction', value: '4.9', suffix: '/5' }
        ];

        // If stats exist but don't have proper values, update them
        if (stats.length === 0) {
            this.createStatisticsSection();
        }
    },

    createStatisticsSection() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const statsGrid = statsSection.querySelector('.stats-grid');
        if (statsGrid && statsGrid.children.length === 0) {
            statsGrid.innerHTML = `
                <div class="stat">
                    <h3>50,000+</h3>
                    <p>Happy Customers</p>
                </div>
                <div class="stat">
                    <h3>99.8%</h3>
                    <p>Claims Approved</p>
                </div>
                <div class="stat">
                    <h3>25</h3>
                    <p>Years Experience</p>
                </div>
                <div class="stat">
                    <h3>4.9/5</h3>
                    <p>Customer Rating</p>
                </div>
            `;
        }
    }
};

// ============================================
// FAQ MODULE
// ============================================
const FAQModule = {
    init() {
        this.setupFAQAccordion();
        this.addFAQData();
    },

    setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            if (question) {
                question.style.cursor = 'pointer';
                question.addEventListener('click', () => {
                    this.toggleFAQ(item);
                });
            }
        });
    },

    toggleFAQ(item) {
        const answer = item.querySelector('p');
        const question = item.querySelector('h3');
        
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
            question.innerHTML += ' <span style="float: right;">−</span>';
        } else {
            answer.style.display = 'none';
            question.innerHTML = question.innerHTML.replace(' <span style="float: right;">−</span>', '');
            question.innerHTML += ' <span style="float: right;">+</span>';
        }
    },

    addFAQData() {
        const faqGrid = document.querySelector('.faq-grid');
        if (!faqGrid || faqGrid.children.length > 0) return;

        const faqs = [
            {
                question: "How do I file a claim?",
                answer: "You can file a claim 24/7 through our online portal, mobile app, or by calling our claims hotline. Simply provide your policy number and details about the incident."
            },
            {
                question: "What factors affect my insurance premium?",
                answer: "Factors include your age, location, driving record (for auto), property value (for home), health status (for life), and chosen coverage levels."
            },
            {
                question: "Can I change my coverage anytime?",
                answer: "Yes, you can modify your coverage at any time. Changes typically take effect at your next billing cycle or immediately for certain updates."
            },
            {
                question: "Do you offer discounts?",
                answer: "We offer various discounts including multi-policy, safe driver, good student, security system, and loyalty discounts. Contact us to see which discounts you qualify for."
            },
            {
                question: "How quickly are claims processed?",
                answer: "Most claims are processed within 24-48 hours. Complex claims may take longer, but we keep you informed throughout the process."
            },
            {
                question: "Is there a mobile app?",
                answer: "Yes! Our mobile app allows you to manage policies, file claims, make payments, and access your insurance cards anytime, anywhere."
            }
        ];

        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <h3>${faq.question} <span style="float: right;">+</span></h3>
                <p style="display: none;">${faq.answer}</p>
            `;
            faqGrid.appendChild(faqItem);
        });

        this.setupFAQAccordion();
    }
};

// ============================================
// CONTACT MODULE
// ============================================
const ContactModule = {
    init() {
        this.setupContactMethods();
        this.setupLiveChat();
        this.updateOfficeHours();
    },

    setupContactMethods() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackContactMethod('phone');
            });
        });

        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackContactMethod('email');
            });
        });
    },

    setupLiveChat() {
        // Create live chat widget
        const chatWidget = document.createElement('div');
        chatWidget.id = 'live-chat-widget';
        chatWidget.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 15px 20px;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            font-weight: 600;
        `;
        chatWidget.innerHTML = '💬 Chat with us';
        
        chatWidget.addEventListener('mouseenter', () => {
            chatWidget.style.transform = 'scale(1.05)';
        });
        
        chatWidget.addEventListener('mouseleave', () => {
            chatWidget.style.transform = 'scale(1)';
        });

        chatWidget.addEventListener('click', () => {
            this.openLiveChat();
        });

        document.body.appendChild(chatWidget);
    },

    openLiveChat() {
        // For demo purposes, we show a modal with live chat info
        ModalModule.showModal({
            title: 'Live Chat Support',
            content: '<p>Welcome to SecureTrust live chat! An agent will be with you shortly.</p>',
            type: 'info'
        });
    },

    trackContactMethod(method) {
        // Here you can integrate analytics or logging
        console.log(`Contact method used: ${method}`);
        // e.g. send to analytics backend
    },

    updateOfficeHours() {
        const officeHoursElement = document.getElementById('office-hours');
        if (!officeHoursElement) return;

        const now = new Date();
        const day = now.getDay(); // 0 (Sun) to 6 (Sat)
        const hour = now.getHours();

        // Assume office hours Mon-Fri 9am - 5pm
        const openDays = [1, 2, 3, 4, 5];
        const isOpen = openDays.includes(day) && hour >= 9 && hour < 17;

        officeHoursElement.textContent = isOpen ? 'We are currently open. How can we help you?' : 'Our office is currently closed. Please leave a message.';
        officeHoursElement.style.color = isOpen ? '#27ae60' : '#e74c3c';
    }
};

// ============================================
// MODAL MODULE
// ============================================
const ModalModule = {
    init() {
        // Create modal container if not exist
        if (!document.getElementById('modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.id = 'modal-container';
            modalContainer.style.cssText = `
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 1050;
                padding: 1rem;
            `;
            document.body.appendChild(modalContainer);

            modalContainer.addEventListener('click', (e) => {
                if (e.target === modalContainer) {
                    this.closeModal();
                }
            });
        }
    },

    showModal({ title, content, type = 'info' }) {
        const modalContainer = document.getElementById('modal-container');
        if (!modalContainer) return;

        modalContainer.innerHTML = `
            <div style="
                background: white; 
                border-radius: 10px; 
                max-width: 500px; 
                width: 100%; 
                padding: 2rem; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                position: relative;
                animation: fadeInScale 0.3s ease forwards;
                border-top: 8px solid ${this.getTypeColor(type)};
            ">
                <button id="modal-close-btn" style="
                    position: absolute;
                    top: 10px; right: 10px;
                    background: transparent;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #888;
                " aria-label="Close modal">&times;</button>
                <h2 style="margin-top: 0; margin-bottom: 1rem;">${title}</h2>
                <div>${content}</div>
            </div>
        `;

        modalContainer.style.display = 'flex';

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
    },

    showQuoteModal(amount) {
        this.showModal({
            title: 'Official Quote',
            content: `
                <p>Your official insurance quote is:</p>
                <h3 style="color:#2980b9;">$${amount.toLocaleString()}</h3>
                <p>Please contact us to finalize your policy and coverage options.</p>
            `,
            type: 'success'
        });
    },

    closeModal() {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
            modalContainer.style.display = 'none';
            modalContainer.innerHTML = '';
        }
    },

    getTypeColor(type) {
        switch(type) {
            case 'success': return '#27ae60';
            case 'error': return '#e74c3c';
            case 'info': return '#2980b9';
            default: return '#2980b9';
        }
    }
};

// ============================================
// THEME MODULE
// ============================================
const ThemeModule = {
    init() {
        this.setupThemeToggle();
        this.applySavedTheme();
    },

    setupThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    },

    applySavedTheme() {
        const savedTheme = localStorage.getItem('site-theme') || 'light';
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('site-theme', theme);

        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
    }
};

// Keyframe animation for modal
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInScale {
    0% {opacity: 0; transform: scale(0.8);}
    100% {opacity: 1; transform: scale(1);}
}

.fade-in-up {
    opacity: 0;
    transform: translateY(20px);
    animation-fill-mode: forwards;
    animation-name: fadeInUp;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Error form field styling */
input.error, select.error, textarea.error {
    border: 2px solid #e74c3c;
}

/* Button secondary style */
.btn.btn-secondary {
    background-color: #2980b9;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn.btn-secondary:hover {
    background-color: #3498db;
}

/* Theme styles */
:root[data-theme='light'] {
    --background-color: #f9f9f9;
    --text-color: #2c3e50;
}

:root[data-theme='dark'] {
    --background-color: #2c3e50;
    --text-color: #ecf0f1;
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
`;
document.head.appendChild(style);

