
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('profileModal');
    const closeBtn = document.querySelector('.close-btn');
    const memberCards = document.querySelectorAll('.member-card');

    // DOM Elements to populate
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalBio = document.getElementById('modalBio');
    const modalEmail = document.getElementById('modalEmail');
    const modalPhone = document.getElementById('modalPhone');
    const modalSocial = document.getElementById('modalSocial');

    // Function to open modal
    function openModal(card) {
        const name = card.querySelector('.member-name').textContent;
        const role = card.querySelector('.member-role').textContent;
        const img = card.querySelector('.member-avatar img').src;

        // Extract data specific to card, ideally from data attributes if available, 
        // or parse from existing DOM if simpler for now.
        // Since we are adding data attributes, let's use them.

        const bio = card.dataset.bio || "No biography available.";
        // For email/phone/social, we can grab from DOM or data attributes. 
        // Let's rely on data-attributes for clean data passing.
        const email = card.dataset.email;
        const phone = card.dataset.phone;
        const socials = card.dataset.socials; // comma separated or JSON? 
        // Simpler: assume string like "Github, Instagram"

        modalImg.src = img;
        modalName.textContent = name;
        modalRole.textContent = role;

        // Populate Bio
        modalBio.innerHTML = '';
        const bioParagraphs = bio.split('\n');
        bioParagraphs.forEach(p => {
            if (p.trim()) {
                const pTag = document.createElement('p');
                pTag.className = 'modal-item-value';
                pTag.style.marginBottom = '10px';
                pTag.textContent = p;
                modalBio.appendChild(pTag);
            }
        });

        modalEmail.textContent = email;
        modalPhone.textContent = phone;

        // Parse socials
        // Format expected: "Github, Instagram, Linkedin"
        modalSocial.innerHTML = '';
        if (socials) {
            const socialList = socials.split(',');
            socialList.forEach((s, index) => {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'social-link';
                link.textContent = s.trim();
                modalSocial.appendChild(link);

                // Add comma if not last
                if (index < socialList.length - 1) {
                    modalSocial.appendChild(document.createTextNode(', '));
                }
            });
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    memberCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openModal(card));
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
