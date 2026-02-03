document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (To be implemented fully if we add a hamburger icon)
    // For now, smooth scrolling with offset for fixed header

    const headerHeight = document.querySelector('header').offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Clean React-style Card Animations
    const cardObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.add('animate-hidden');
        // Stagger delay based on column index (roughly) to create a wave effect
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;
        cardObserver.observe(card);
    });

    // EmailJS Configuration
    const serviceID = "service_8lmaqwq";
    // NOTE: You need to create an Email Template in your EmailJS dashboard 
    // and replace 'template_contact' with your actual Template ID.
    const templateID = "template_iyx55uc";

    // Handle Contact Form (Index Page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('Message Sent Successfully!');
                    btn.innerHTML = originalText;
                    contactForm.reset();
                }, (err) => {
                    btn.innerHTML = originalText;
                    console.error('EmailJS Error:', err);
                    alert('Failed to send message. Error: ' + JSON.stringify(err));
                });
        });
    }

    // Handle Enroll Form (Enroll Page)
    const enrollForm = document.getElementById('enroll-form');
    if (enrollForm) {
        enrollForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Capture data for welcome page
                    const formData = new FormData(this);
                    const enrollmentData = {
                        name: formData.get('name'),
                        type: formData.get('tuition_type'),
                        subject: formData.get('subject_interest')
                    };
                    sessionStorage.setItem('enrollmentData', JSON.stringify(enrollmentData));

                    // Redirect to welcome page
                    window.location.href = 'welcome.html';
                }, (err) => {
                    btn.innerHTML = originalText;
                    console.error('EmailJS Error:', err);
                    alert('Failed to submit registration. Error: ' + JSON.stringify(err));
                });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('ion-icon');
            if (nav.classList.contains('active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.querySelector('ion-icon').setAttribute('name', 'menu-outline');
            });
        });
    }

    // Dynamic Select Updates (Enroll Page)
    window.updateSubjects = function () {
        // ... (Keep existing if any, or placeholder if this was intended)
    };
});
