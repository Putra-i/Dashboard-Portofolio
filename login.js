// ===== SETTINGS PAGE FUNCTIONALITY =====

// ===== GROD ANIMATION =====
// Background Animation
const bgContainer = document.getElementById('bgContainer');
const numRows = 3;
const itemsPerRow = 12;

for (let row = 0; row < numRows; row++) {
    const gridRow = document.createElement('div');
    gridRow.className = `grid-row ${row % 2 === 0 ? 'row-odd' : 'row-even'}`;

    const gridRowContent = document.createElement('div');
    gridRowContent.className = 'grid-row-content';

    for (let i = 0; i < itemsPerRow; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        gridRowContent.appendChild(item);
    }

    gridRow.appendChild(gridRowContent);
    bgContainer.appendChild(gridRow);
}

// Login Form Validation
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');


// Validasi Username
function validateUsername(username) {
    return username.length >= 3;
}

// Validasi Password
function validatePassword(password) {
    return password.length >= 6;
}

// Clear error saat user mengetik
usernameInput.addEventListener('input', function () {
    usernameInput.classList.remove('error');
    usernameError.classList.remove('show');
    usernameError.textContent = '';

    // Clear general error
    const generalError = document.getElementById('generalError');
    if (generalError) {
        generalError.classList.remove('show');
        generalError.textContent = '';
    }
});

passwordInput.addEventListener('input', function () {
    passwordInput.classList.remove('error');
    passwordError.classList.remove('show');
    passwordError.textContent = '';

    // Clear general error
    const generalError = document.getElementById('generalError');
    if (generalError) {
        generalError.classList.remove('show');
        generalError.textContent = '';
    }
});

// Button logic handled by form submit event

// Handle form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Reset errors
    usernameInput.classList.remove('error');
    passwordInput.classList.remove('error');
    usernameError.classList.remove('show');
    passwordError.classList.remove('show');


    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validasi Username
    if (!username) {
        usernameInput.classList.add('error');
        usernameError.textContent = 'Username harus diisi';
        usernameError.classList.add('show');
        isValid = false;
    } else if (!validateUsername(username)) {
        usernameInput.classList.add('error');
        usernameError.textContent = 'Username minimal 3 karakter';
        usernameError.classList.add('show');
        isValid = false;
    }

    // Validasi Password
    if (!password) {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Password harus diisi';
        passwordError.classList.add('show');
        isValid = false;
    } else if (!validatePassword(password)) {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Password minimal 6 karakter';
        passwordError.classList.add('show');
        isValid = false;
    }

    // Check valid status and redirect
    if (isValid) {
        const lowerUsername = username.toLowerCase();

        if (lowerUsername === 'admin' || lowerUsername.includes('rei ayanami')) {
            location.href = 'dashboard.html';
        } else if (lowerUsername === 'user' || lowerUsername.includes('lain iwakura')) {
            location.href = 'user_dashboard.html';
        } else {
            // Unknown user credential failure
            const generalError = document.getElementById('generalError');
            generalError.textContent = 'Incorrect username or password';
            generalError.classList.add('show');

            // Also add error class to inputs to indicate failure
            usernameInput.classList.add('error');
            passwordInput.classList.add('error');
        }
    }

});
