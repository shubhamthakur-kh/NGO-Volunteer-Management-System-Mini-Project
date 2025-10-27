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

function handleSignUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');

    if (!name || !email || !password) {
        messageDiv.textContent = 'All fields are required.';
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

function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
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

function handleLogout() {
    clearCurrentUser();
    window.location.href = 'index.html';
}

// Initialize on page load
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
