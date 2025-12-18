// ===== PROJECT PAGE FUNCTIONALITY =====

// Get all project sections
const projectSections = document.querySelectorAll('.project_section');

// Add collapse functionality to each project section
projectSections.forEach(section => {
    const headerCollapseBtn = section.querySelector('.project_header .collapse_btn');
    const projectBody = section.querySelector('.project_body');
    
    if (headerCollapseBtn && projectBody) {
        headerCollapseBtn.addEventListener('click', () => {
            headerCollapseBtn.classList.toggle('rotated');
            projectBody.classList.toggle('collapsed');
        });
    }
});

// Get all status sections
const statusSections = document.querySelectorAll('.status_section');

// Add collapse functionality to status sections
statusSections.forEach(section => {
    const statusCollapseBtn = section.querySelector('.collapse_btn.small');
    const taskTable = section.nextElementSibling;
    
    if (statusCollapseBtn && taskTable) {
        statusCollapseBtn.addEventListener('click', () => {
            statusCollapseBtn.classList.toggle('rotated');
            
            if (taskTable.style.display === 'none') {
                taskTable.style.display = 'table';
            } else {
                taskTable.style.display = 'none';
            }
        });
    }
});

// Task checkbox functionality
const taskCheckboxes = document.querySelectorAll('.task_checkbox');

taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const taskRow = e.target.closest('.task_row');
        const taskText = taskRow.querySelector('span');
        
        if (e.target.checked) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#666';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = '#fff';
        }
    });
});

// Add Task button functionality
const addTaskBtns = document.querySelectorAll('.add_task_btn');

addTaskBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tbody = btn.closest('tbody');
        const taskCount = tbody.querySelectorAll('.task_row').length;
        
        // Create new task row
        const newRow = document.createElement('tr');
        newRow.className = 'task_row';
        newRow.innerHTML = `
            <td>
                <input type="checkbox" class="task_checkbox">
                <span>Task ${taskCount + 1}</span>
            </td>
            <td>
                <button class="icon_btn assignee_btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </button>
            </td>
            <td>
                <button class="icon_btn date_btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </button>
            </td>
            <td>
                <button class="icon_btn flag_btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                        <line x1="4" y1="22" x2="4" y2="15"/>
                    </svg>
                </button>
            </td>
        `;
        
        // Insert before add task row
        const addTaskRow = btn.closest('.add_task_row');
        tbody.insertBefore(newRow, addTaskRow);
        
        // Add checkbox functionality to new task
        const newCheckbox = newRow.querySelector('.task_checkbox');
        newCheckbox.addEventListener('change', (e) => {
            const taskText = newRow.querySelector('span');
            
            if (e.target.checked) {
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = '#666';
            } else {
                taskText.style.textDecoration = 'none';
                taskText.style.color = '#fff';
            }
        });
        
        // Update task count in status badge
        updateTaskCount(tbody);
        
        // Add animation
        newRow.style.opacity = '0';
        newRow.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            newRow.style.transition = 'all 0.3s ease';
            newRow.style.opacity = '1';
            newRow.style.transform = 'translateY(0)';
        }, 10);
    });
});

// Update task count function
function updateTaskCount(tbody) {
    const taskTable = tbody.closest('.task_table');
    const projectBody = taskTable.closest('.project_body');
    const statusBadge = projectBody.querySelector('.status_badge');
    const taskCountSpan = statusBadge.querySelector('.task_count');
    const taskCount = tbody.querySelectorAll('.task_row').length;
    
    if (taskCountSpan) {
        taskCountSpan.textContent = taskCount;
    }
}

// Icon button hover effects
const iconBtns = document.querySelectorAll('.icon_btn');

iconBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// View button functionality
const viewBtn = document.querySelector('.view_btn');

if (viewBtn) {
    viewBtn.addEventListener('click', () => {
        viewBtn.classList.toggle('active');
        
        // Add your view change logic here
        console.log('View button clicked');
    });
}

// Make task names editable on double click
const taskRows = document.querySelectorAll('.task_row');

taskRows.forEach(row => {
    const taskNameSpan = row.querySelector('td:first-child span');
    
    if (taskNameSpan) {
        taskNameSpan.addEventListener('dblclick', () => {
            const currentText = taskNameSpan.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.style.background = 'transparent';
            input.style.border = '1px solid #0ea5e9';
            input.style.color = '#fff';
            input.style.padding = '4px 8px';
            input.style.borderRadius = '4px';
            input.style.fontSize = '14px';
            input.style.outline = 'none';
            
            taskNameSpan.replaceWith(input);
            input.focus();
            input.select();
            
            const saveEdit = () => {
                const newSpan = document.createElement('span');
                newSpan.textContent = input.value || currentText;
                newSpan.style.color = '#fff';
                input.replaceWith(newSpan);
                
                // Re-attach double click listener
                newSpan.addEventListener('dblclick', () => {
                    taskNameSpan.dispatchEvent(new Event('dblclick'));
                });
            };
            
            input.addEventListener('blur', saveEdit);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });
        });
    }
});

console.log('Project page loaded successfully!');