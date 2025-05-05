// Test if jQuery is loaded
if (typeof jQuery != 'undefined') {
    console.log('jQuery is loaded');
} else {
    console.log('jQuery is not loaded');
}

// Menu filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-list tbody tr');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');
    const EMAIL_STORAGE_KEY = 'subscribedEmail';

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        emailInput.className = type;
    }

    function saveEmailToLocalStorage(email) {
        localStorage.setItem(EMAIL_STORAGE_KEY, email);
    }

    function getEmailFromLocalStorage() {
        return localStorage.getItem(EMAIL_STORAGE_KEY);
    }

    function removeEmailFromLocalStorage() {
        localStorage.removeItem(EMAIL_STORAGE_KEY);
    }

    function showSubscribedState(email) {
        emailInput.value = email;
        emailInput.disabled = true;
        emailInput.className = 'success';
        subscribeForm.querySelector('.subscribe-btn').style.display = 'none';
        
        // Create unsubscribe button if it doesn't exist
        if (!document.querySelector('.unsubscribe-btn')) {
            const unsubscribeBtn = document.createElement('button');
            unsubscribeBtn.className = 'unsubscribe-btn';
            unsubscribeBtn.textContent = 'Unsubscribe';
            subscribeForm.appendChild(unsubscribeBtn);

            unsubscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                removeEmailFromLocalStorage();
                emailInput.value = '';
                emailInput.disabled = false;
                emailInput.className = '';
                subscribeForm.querySelector('.subscribe-btn').style.display = 'block';
                unsubscribeBtn.remove();
                showMessage('success', 'Successfully unsubscribed!');
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 3000);
            });
        }
    }

    // Check for existing subscription on page load
    const savedEmail = getEmailFromLocalStorage();
    if (savedEmail) {
        showSubscribedState(savedEmail);
        showMessage('success', 'You are already subscribed to our newsletter!');
    }

    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            showMessage('error', 'Please enter your email address.');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('error', 'Please enter a valid email address.');
            return;
        }

        // Save email and update UI
        saveEmailToLocalStorage(email);
        showSubscribedState(email);
        showMessage('success', 'Thank you for subscribing! Welcome to Bean Scene.');
    });

    // Real-time validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email && !validateEmail(email)) {
            this.className = 'error';
        } else if (email && validateEmail(email)) {
            this.className = 'success';
        } else {
            this.className = '';
        }
    });
});

// Testimonials Slider Initialization
$(document).ready(function() {
    $('.testimonials-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>'
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('is-active')) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-active');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-active');
    });
});
