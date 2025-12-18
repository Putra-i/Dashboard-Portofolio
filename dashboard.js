// Task Statistics Chart
let statisticsChart = null;

function createStatisticsChart() {
    const ctx = document.getElementById('statisticChart');

    if (!ctx) return;

    // Get CSS variables
    const styles = getComputedStyle(document.documentElement);
    const textPrimary = styles.getPropertyValue('--text-primary').trim();
    const borderColor = styles.getPropertyValue('--border-color').trim();

    // Use solid colors for tooltip based on theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    const tooltipBg = isDarkMode ? '#232323' : '#ffffff';
    const tooltipText = isDarkMode ? '#ffffff' : '#252525';

    // Destroy existing chart if it exists
    if (statisticsChart) {
        statisticsChart.destroy();
    }

    statisticsChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['01 Des', '02 Des', '03 Des', '04 Des', '05 Des', '06 Des', '07 Des'],
            datasets: [
                {
                    label: 'Task Completed',
                    data: [2, 4, 3, 6, 5, 7, 4],
                    backgroundColor: '#4ade80',
                    borderColor: '#22c55e',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Remaining Tasks',
                    data: [18, 16, 13, 12, 10, 8, 6],
                    backgroundColor: '#3b82f6',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: tooltipText,
                        font: {
                            size: 12,
                            family: 'PublicSans'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: tooltipBg,
                    titleColor: tooltipText,
                    bodyColor: tooltipText,
                    borderColor: borderColor,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' task';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#2a2a2a',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8F8F8F',
                        font: {
                            size: 12,
                            family: 'PublicSans'
                        }
                    }
                },
                y: {
                    grid: {
                        color: '#2a2a2a',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#8F8F8F',
                        font: {
                            size: 12,
                            family: 'PublicSans'
                        },
                        stepSize: 5
                    },
                    beginAtZero: true,
                    max: 20
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Create chart on load
document.addEventListener('DOMContentLoaded', () => {
    createStatisticsChart();

    // Listen for dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            setTimeout(createStatisticsChart, 100);
        });
    }
});

// Also listen for body class changes as fallback
const observer = new MutationObserver(() => {
    setTimeout(createStatisticsChart, 100);
});

observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});