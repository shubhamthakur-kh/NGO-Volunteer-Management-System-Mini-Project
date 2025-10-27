// Navigation Management
function updateNavigation() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    const isLogged = isLoggedIn();
    const user = getCurrentUser();
    
    // Determine which links to show
    if (isLogged) {
        // Logged in: Show all management pages + username + logout
        nav.innerHTML = `
            <a href="index.html">Dashboard</a>
            <a href="volunteers.html">Volunteers</a>
            <a href="assignments.html">Assignments</a>
            <a href="donations.html">Donations</a>
            <a href="events.html">Events</a>
            <a href="donors.html">Donors</a>
            <a href="#" class="logout-link">${user.name}</a>
        `;
        
        // Add logout event listener
        const logoutLink = nav.querySelector('.logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout();
            });
        }
    } else {
        // Not logged in: Show only public pages
        nav.innerHTML = `
            <a href="index.html">Dashboard</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="signin.html">Sign In</a>
            <a href="signup.html">Sign Up</a>
        `;
    }
    
    // Update active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add mobile menu toggle script if needed
    addMobileMenuToggle();
}

function addMobileMenuToggle() {
    // Check if mobile menu toggle already exists
    if (document.getElementById('mobile-menu-toggle')) return;
    
    const header = document.querySelector('.header');
    if (!header) return;
    
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    if (existingToggle) return;
    
    // Add mobile menu toggle button
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.id = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    
    header.appendChild(toggle);
    
    // Add click event
    toggle.addEventListener('click', () => {
        const nav = document.getElementById('main-nav');
        if (nav) {
            nav.classList.toggle('active');
        }
    });
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
});
