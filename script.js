document.addEventListener('DOMContentLoaded', () => {

    // Κώδικας για το responsive navigation menu (Hamburger)
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // Κώδικας για τις φόρμες του Dashboard
    const anazitoButton = document.getElementById('anazito-button');
    const diathetoButton = document.getElementById('diatheto-button');
    const anazitoFormContainer = document.getElementById('anazito-form-container');
    const diathetoFormContainer = document.getElementById('diatheto-form-container');

    if (anazitoButton && diathetoButton && anazitoFormContainer && diathetoFormContainer) {
        anazitoButton.addEventListener('click', () => {
            anazitoButton.classList.add('active');
            diathetoButton.classList.remove('active');
            anazitoFormContainer.style.display = 'block';
            diathetoFormContainer.style.display = 'none';
        });

        diathetoButton.addEventListener('click', () => {
            diathetoButton.classList.add('active');
            anazitoButton.classList.remove('active');
            diathetoFormContainer.style.display = 'block';
            anazitoFormContainer.style.display = 'none';
        });
    }

    // Κώδικας για τις καρτέλες των Αναρτήσεων (Listings)
    const listingTabs = document.querySelectorAll('.listing-tab-button');
    if (listingTabs.length > 0) {
        listingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                listingTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    // Κώδικας για το pop-up της επιτυχούς αποστολής (αν υπάρχει)
    const modal = document.getElementById("successModal");
    const span = document.getElementsByClassName("close-button")[0];
    const messageText = document.getElementById("messageText");

    // Εμφάνιση του modal
    function showModal(message) {
        if (modal && messageText) {
            messageText.textContent = message;
            modal.style.display = "block";
        }
    }

    // Κλείσιμο του modal όταν πατάς το X
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Κλείσιμο του modal όταν πατάς οπουδήποτε έξω από το pop-up
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Κώδικας για την υποβολή φόρμας επικοινωνίας (παράδειγμα)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Εδώ θα πήγαινε ο κώδικας για την αποστολή των δεδομένων
            showModal("Το μήνυμά σας στάλθηκε επιτυχώς!");
            contactForm.reset();
        });
    }
});