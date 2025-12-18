// ===== SETTINGS PAGE FUNCTIONALITY =====

// 1. Tab Switching
const tabBtns = document.querySelectorAll('.tab_btn');
const tabContents = document.querySelectorAll('.tab_content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(tabId);
        if (targetContent) targetContent.classList.add('active');
    });
});

// 2. Profile Picture
const uploadPlaceholder = document.querySelector('.upload_placeholder');
const profileUploadInput = document.getElementById('profile_upload');

if (uploadPlaceholder && profileUploadInput) {
    uploadPlaceholder.addEventListener('click', () => profileUploadInput.click());
    profileUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadPlaceholder.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// 3. Save & Reset Interface Logic (Dark Mode)
const saveInterfaceBtn = document.querySelector('#interface .btn_primary');
const resetInterfaceBtn = document.querySelector('#interface .btn_secondary');

if (saveInterfaceBtn) {
    saveInterfaceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDarkMode = document.getElementById('darkModeToggle').checked;
        showNotification(isDarkMode ? 'Saved (Dark Mode)' : 'Saved (Light Mode)', 'success');
    });
}

if (resetInterfaceBtn) {
    resetInterfaceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) toggle.checked = true; // Reset to ON (Dark)
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        document.getElementById('language').value = 'en';
        document.getElementById('timezone').value = 'utc';
        showNotification('Reset to Default (Dark Mode)', 'info');
    });
}

// Notification Toast
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification_toast');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification_toast ${type}`;
    notification.innerHTML = `<span class="notification_message">${message}</span>`;

    notification.style.cssText = `
        position: fixed; top: 24px; right: 24px;
        background: ${type === 'success' ? '#22c55e' : '#0ea5e9'};
        color: white; padding: 16px 24px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 10000;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// 4. Logout Button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Clear any stored user data (if any)
        localStorage.removeItem('userSession');
        sessionStorage.clear();

        // Redirect to login page
        window.location.href = 'login.html';
    });
}
