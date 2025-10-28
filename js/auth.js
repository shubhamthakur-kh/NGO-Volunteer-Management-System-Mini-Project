// Auth Management
let currentUser = null;

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
    updateNavigation();
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateNavigation();
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

// ================== SIGN UP VALIDATION ==================
function validateSignUp(name, email, password) {
    const errors = {};

    // Name Validation
    if (!name.trim()) {
        errors.name = "Full name is required.";
    } else if (!/^[A-Za-z\s]{3,}$/.test(name.trim())) {
        errors.name = "Name must be at least 3 letters and contain only alphabets.";
    }

    // Email Validation
    if (!email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
        errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one number.";
    }

    return errors;
}

function displayFieldErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

    for (const [key, message] of Object.entries(errors)) {
        const errorEl = document.getElementById(`${key}-error`);
        if (errorEl) errorEl.textContent = message;
    }
}

// ================== SIGN UP ==================
function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');

    const errors = validateSignUp(name, email, password);
    if (Object.keys(errors).length > 0) {
        displayFieldErrors(errors);
        messageDiv.textContent = 'Please fix the errors and try again.';
        messageDiv.className = 'message error';
        return;
    }

    const usersJSON = localStorage.getItem('users');
    let users = usersJSON ? JSON.parse(usersJSON) : [];

    if (users.find(user => user.email === email)) {
        messageDiv.textContent = 'This email is already registered.';
        messageDiv.className = 'message error';
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    messageDiv.textContent = 'Sign Up Successful! Redirecting to Sign In...';
    messageDiv.className = 'message success';
    document.getElementById('signup-form').reset();

    setTimeout(() => {
        window.location.href = 'signin.html';
    }, 1500);
}

// ================== SIGN IN ==================
function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');

    const usersJSON = localStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        setCurrentUser({ name: user.name, email: user.email });
        messageDiv.textContent = 'Login Successful! Redirecting to Dashboard...';
        messageDiv.className = 'message success';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        messageDiv.textContent = 'Invalid Email or Password.';
        messageDiv.className = 'message error';
    }
}

// ================== LOGOUT ==================
function handleLogout() {
    clearCurrentUser();
    window.location.href = 'index.html';
}

// ================== INIT ==================
document.addEventListener('DOMContentLoaded', () => {
    currentUser = getCurrentUser();
    updateNavigation();

    if (document.getElementById('signup-form')) {
        document.getElementById('signup-form').addEventListener('submit', handleSignUp);
    }
    if (document.getElementById('signin-form')) {
        document.getElementById('signin-form').addEventListener('submit', handleSignIn);
    }
});
