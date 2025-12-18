/* File: theme.js */

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const body = document.body;

    // 1. CEK LOCALSTORAGE SAAT LOAD
    // Kita cek apakah user pernah simpan preferensi 'dark' atau 'light'
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode'); // Tambah class gelap
        if (toggleSwitch) toggleSwitch.checked = true; // Nyalakan switch jika ada di halaman ini
    } else {
        // Default Light Mode
        body.classList.remove('dark-mode');
        if (toggleSwitch) toggleSwitch.checked = false;
    }

    // 2. EVENT LISTENER SAAT KLIK TOGGLE
    // Hanya jalankan jika tombol toggle ditemukan (agar tidak error di halaman dashboard)
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                // User mengaktifkan Dark Mode
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                // User mematikan Dark Mode
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});