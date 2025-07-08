// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.btn-secondary[onclick*="toggleTheme"]');
    const icon = themeToggle.querySelector('i');
    const textNode = themeToggle.childNodes[themeToggle.childNodes.length - 1];
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        if (textNode.nodeType === Node.TEXT_NODE) textNode.textContent = ' Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        if (textNode.nodeType === Node.TEXT_NODE) textNode.textContent = ' Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggle = document.querySelector('.btn-secondary[onclick*="toggleTheme"]');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    const textNode = themeToggle.childNodes[themeToggle.childNodes.length - 1];
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        if (textNode.nodeType === Node.TEXT_NODE) textNode.textContent = ' Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        if (textNode.nodeType === Node.TEXT_NODE) textNode.textContent = ' Dark Mode';
    }
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Contact form functionality (if needed)
function handleContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Print functionality
function handlePrint() {
    const printBtn = document.querySelector('.btn-primary');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

// Copy email functionality
function copyEmail() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('href').replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary notification
                showNotification('Email copied to clipboard!');
            });
        });
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    handleContactForm();
    handlePrint();
    copyEmail();
    
    // Add scroll to top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(scrollToTop);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    });
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-large);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-medium);
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-to-top.show {
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-3px);
    }
    
    .skill-tag, .tech-tag {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .skill-tag:hover, .tech-tag:hover {
        background: var(--primary-color);
        color: white;
    }
    
    @media print {
        .header-actions,
        .scroll-to-top {
            display: none !important;
        }
        
        .container {
            max-width: none;
            margin: 0;
            padding: 0;
        }
        
        .section {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    }
`;

document.head.appendChild(style); 