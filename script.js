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

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        emailInput.className = type;

        if (type === 'success') {
            setTimeout(() => {
                formMessage.className = 'form-message';
                emailInput.className = '';
                emailInput.value = '';
            }, 3000);
        }
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

        // Simulate API call
        setTimeout(() => {
            showMessage('success', 'Thank you for subscribing! Welcome to Bean Scene.');
        }, 1000);
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
