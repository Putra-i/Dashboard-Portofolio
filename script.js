// ===== NAV FUNCTIONALITY =====

// Disable animation on page load
document.body.classList.add("no-animation");

// Remove no-animation AFTER render
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.remove("no-animation");
    }, 50); // 50ms to be safe
});


// Get toggle button
const btn = document.getElementById("sidebar_toggle");

// Get main sidebar element
const sidebar = document.getElementById("sidebar");

// Get all tooltip elements inside sidebar
const allTooltips = document.querySelectorAll(".sidebar .tooltip");

// === APPLY PREVIOUS SIDEBAR STATE ON PAGE LOAD ===
const savedState = localStorage.getItem("sidebarState");

if (savedState === "minisize") {
    // Apply minisize state without animation glitches
    sidebar.classList.add("minisize");
    btn.classList.add("rotated");

    const logo = sidebar.querySelector(".logo");
    const navText = sidebar.querySelectorAll(".nav_button > span");
    const footer = sidebar.querySelector("footer");

    const elements = [logo, ...navText, footer];

    // Hide elements instantly (no fade animation)
    elements.forEach(el => {
        if (!el) return;
        el.classList.add("fade-out");
        el.classList.add("hidden");
    });

    // Apply minisize tooltip position
    allTooltips.forEach(tp => tp.classList.add("minisize"));

    // Remove preload class
    document.body.classList.remove("preload-minisize");
}


// ===== BUTTON CLICK FUNCTION =====
btn.addEventListener("click", () => {

    // --- Toggle sidebar size ---
    sidebar.classList.toggle("minisize");

    // --- Rotate the toggle icon ---
    btn.classList.toggle("rotated");

    // Get sidebar elements
    const logo = sidebar.querySelector(".logo");
    const navText = sidebar.querySelectorAll(".nav_button > span");
    const footer = sidebar.querySelector("footer");
    const tooltips = document.querySelectorAll(".sidebar .tooltip");

    const elements = [logo, ...navText, footer];

    // Check if currently hidden
    const isHidden = logo.classList.contains("hidden");

    // === HIDE ELEMENTS ===
    if (!isHidden) {

        // Fade-out animation
        elements.forEach(el => {
            if (!el) return;
            el.classList.add("fade-out");
        });

        // After fade-out, hide completely
        setTimeout(() => {
            elements.forEach(el => {
                if (!el) return;
                el.classList.add("hidden");
            });
        }, 300);

        // Move tooltips for minisize
        tooltips.forEach(tp => tp.classList.add("minisize"));
    }

    // === SHOW ELEMENTS ===
    else {

        // Make visible again
        elements.forEach(el => {
            if (!el) return;
            el.classList.remove("hidden");
        });

        setTimeout(() => {
            elements.forEach(el => {
                if (!el) return;
                el.classList.remove("fade-out");
            });
        }, 10);

        // Restore tooltip position
        tooltips.forEach(tp => tp.classList.remove("minisize"));
    }

    // === SAVE SIDEBAR STATE TO LOCALSTORAGE ===
    localStorage.setItem(
        "sidebarState",
        sidebar.classList.contains("minisize") ? "minisize" : "expanded"
    );
});

// ===== MAIN RESIZE CONTROL =====
const mainElem = document.querySelector("main");

if (savedState === "minisize") {
    mainElem.classList.add("resize");
}
btn.addEventListener("click", () => {

    // === APPLY RESIZE ON MAIN ===
    if (sidebar.classList.contains("minisize")) {
        mainElem.classList.add("resize");
    } else {
        mainElem.classList.remove("resize");
    }
});

// ===== SEARCH FUNCTIONALITY =====
// Search Data Configuration
const searchData = [
    { name: "Projects", url: "projects.html" },
    { name: "Dashboard", url: "dashboard.html" },
    { name: "Statistics", url: "statistics.html" },
    { name: "Settings", url: "settings.html" },
    { name: "Profiles", url: "profiles.html" },
];

const searchInput = document.getElementById('searchInput');
const searchContainer = document.querySelector('.search');
const searchDropdown = document.getElementById('searchDropdown');
let selectedIndex = -1;
let filteredResults = [];

// Focus event - expand search
searchInput.addEventListener('focus', () => {
    searchContainer.classList.add('active');
});

// Blur event - collapse if empty
searchInput.addEventListener('blur', (e) => {
    setTimeout(() => {
        if (!searchInput.value) {
            searchContainer.classList.remove('active');
        }
        searchDropdown.classList.remove('show');
    }, 200);
});

// Input event - filter results
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    selectedIndex = -1;

    if (query === '') {
        searchDropdown.classList.remove('show');
        return;
    }

    filteredResults = searchData.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    displayResults(filteredResults);
});

// Keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    const items = searchDropdown.querySelectorAll('.search-item');

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedIndex < filteredResults.length - 1) {
            selectedIndex++;
            updateSelection(items);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedIndex > 0) {
            selectedIndex--;
            updateSelection(items);
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
            selectItem(filteredResults[selectedIndex]);
        }
    } else if (e.key === 'Escape') {
        searchDropdown.classList.remove('show');
        searchInput.blur();
    }
});

function displayResults(results) {
    if (results.length === 0) {
        searchDropdown.innerHTML = '<div class="no-results">No results found</div>';
        searchDropdown.classList.add('show');
        return;
    }

    searchDropdown.innerHTML = results.map((item, index) =>
        `<div class="search-item" data-index="${index}" data-url="${item.url}">${item.name}</div>`
    ).join('');

    searchDropdown.classList.add('show');

    // Add click handlers
    searchDropdown.querySelectorAll('.search-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            selectItem(results[index]);
        });
    });
}

function updateSelection(items) {
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            item.classList.remove('selected');
        }
    });
}

function selectItem(item) {
    searchInput.value = item.name;
    searchDropdown.classList.remove('show');
    selectedIndex = -1;

    // Redirect to page
    console.log('Redirecting to:', item.url);
    window.location.href = item.url;
}

// Click outside to close
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchDropdown.classList.remove('show');
    }
});