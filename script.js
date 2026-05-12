document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // --- Profile Sharing Logic ---
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Utkarsh Gupta | Portfolio',
                text: 'Check out Utkarsh Gupta\'s professional portfolio!',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback to clipboard
                    await navigator.clipboard.writeText(window.location.href);
                    const originalText = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
                    setTimeout(() => {
                        shareBtn.innerHTML = originalText;
                    }, 2000);
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        });
    }

    // --- EmailJS Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check if user has updated placeholders
            const serviceID = 'service_xh1r9lh';
            const templateID = 'template_4glzyob';

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            emailjs.sendForm(serviceID, templateID, contactForm)
                .then(() => {
                    formStatus.textContent = 'Message sent successfully! ✨';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                }, (err) => {
                    formStatus.textContent = 'Error: ' + (err.text || 'Failed to send');
                    formStatus.className = 'form-status error';
                    console.error('EmailJS Error Detail:', err);
                    alert('EmailJS Error: ' + JSON.stringify(err)); // Extra visibility for debugging
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').textContent = 'Send Message';
                });
        });
    }

    // --- Scroll Reveal Animation Logic ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Smooth Sticky Header ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = 'var(--shadow)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });

});
