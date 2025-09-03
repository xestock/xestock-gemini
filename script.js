document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    const suggestButton = document.querySelector('.suggest-button');
    const modal = document.getElementById('suggest-modal');
    const closeButton = document.querySelector('.close-button');
    const suggestForm = document.getElementById('suggest-form');
    const suggestMessage = document.getElementById('suggest-message');

    // Εμφάνιση του pop-up όταν πατηθεί το κουμπί
    if (suggestButton) {
        suggestButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        // Κλείσιμο του pop-up
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            suggestMessage.textContent = ''; // Καθαρίζει το μήνυμα
        });

        // Κλείσιμο όταν πατηθεί έξω από το pop-up
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                suggestMessage.textContent = ''; // Καθαρίζει το μήνυμα
            }
        });

        // Χειρισμός υποβολής φόρμας
        suggestForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const form = event.target;
            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    suggestMessage.textContent = 'Ευχαριστούμε θερμά για την πρότασή σας! Η πρότασή σας έχει καταχωρηθεί και θα εξεταστεί από την ομάδα μας. Θα επικοινωνήσουμε μαζί σας σύντομα για την τελική απάντηση.';
                    form.reset();
                } else {
                    suggestMessage.textContent = 'Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε ξανά αργότερα.';
                }
            } catch (error) {
                suggestMessage.textContent = 'Υπήρξε κάποιο πρόβλημα. Παρακαλώ δοκιμάστε ξανά αργότερα.';
            }
        });
    }

    // Κώδικας για τη φόρμα σύνδεσης
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            const testEmail = 'test@xestock.gr';
            const testPassword = '123456';

            if (email === testEmail && password === testPassword) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Λάθος email ή κωδικός πρόσβασης. Παρακαλώ δοκιμάστε ξανά.';
            }
        });
    }

    // Λειτουργία εμφάνισης/απόκρυψης φορμών στο dashboard
    const anazitoButton = document.getElementById('anazito-button');
    const diathetoButton = document.getElementById('diatheto-button');
    const anazitoFormContainer = document.getElementById('anazito-form-container');
    const diathetoFormContainer = document.getElementById('diatheto-form-container');

    if (anazitoButton && diathetoButton) {
        anazitoButton.addEventListener('click', () => {
            anazitoFormContainer.style.display = 'block';
            diathetoFormContainer.style.display = 'none';
            anazitoButton.classList.add('active');
            diathetoButton.classList.remove('active');
        });

        diathetoButton.addEventListener('click', () => {
            diathetoFormContainer.style.display = 'block';
            anazitoFormContainer.style.display = 'none';
            diathetoButton.classList.add('active');
            anazitoButton.classList.remove('active');
        });
    }
    
    // Λειτουργία εμφάνισης/απόκρυψης αναρτήσεων
    const listingTabButtons = document.querySelectorAll('.listing-tab-button');
    const seekListingsContainer = document.getElementById('seek-listings');
    const offerListingsContainer = document.getElementById('offer-listings');

    if (listingTabButtons.length > 0) {
        listingTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                listingTabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const type = button.dataset.type;
                if (type === 'seek') {
                    seekListingsContainer.style.display = 'grid';
                    offerListingsContainer.style.display = 'none';
                } else if (type === 'offer') {
                    seekListingsContainer.style.display = 'none';
                    offerListingsContainer.style.display = 'grid';
                }
            });
        });
    }

    // Δημιουργία των καρτών αναρτήσεων (Dummy Data)
    const createListingCard = (listing) => {
        const card = document.createElement('div');
        card.classList.add('listing-card');
        card.innerHTML = `
            <div class="listing-image-placeholder">
                Δεν υπάρχει εικόνα
            </div>
            <div class="listing-content">
                <h4>${listing.product}</h4>
                <p><strong>Κατηγορία:</strong> ${listing.category}</p>
                <p><strong>Κατάσταση:</strong> ${listing.condition}</p>
                <p><strong>Ποσότητα:</strong> ${listing.quantity}</p>
            </div>
            <div class="listing-actions">
                <button class="view-details-button">Δείτε λεπτομέρειες</button>
            </div>
        `;
        return card;
    };
    
    // Εμφάνιση dummy αναρτήσεων στην αρχή
    const dummySeekListings = [
        { product: 'Μοτέρ Ηλεκτρικό', category: 'Ηλεκτρολογικό Υλικό', condition: 'μεταχειρισμένο', quantity: 1 },
        { product: 'Βιβλίο Οικονομικών', category: 'Βιβλιοπωλείο', condition: 'καινούργιο', quantity: 10 }
    ];

    const dummyOfferListings = [
        { product: 'Laptop i7', category: 'Ηλεκτρονικά', condition: 'μεταχειρισμένο', quantity: 2 },
        { product: 'Σετ κλειδιών', category: 'Είδη DIY', condition: 'καινούργιο', quantity: 1 }
    ];

    if (window.location.pathname.endsWith('listings.html')) {
        dummySeekListings.forEach(listing => {
            seekListingsContainer.appendChild(createListingCard(listing));
        });
        dummyOfferListings.forEach(listing => {
            offerListingsContainer.appendChild(createListingCard(listing));
        });
    }
    
    // Έλεγχος κατάστασης σύνδεσης σε κάθε σελίδα
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const navLinks = document.querySelector('.main-nav ul');
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.parentNode.remove();
        }
        
        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = '<a href="#" id="logout-button">Αποσύνδεση</a>';
        navLinks.appendChild(logoutItem);

        const dashboardItem = document.createElement('li');
        dashboardItem.innerHTML = '<a href="dashboard.html">Dashboard</a>';
        navLinks.appendChild(dashboardItem);
        
        const listingsItem = document.createElement('li');
        listingsItem.innerHTML = '<a href="listings.html">Αναρτήσεις</a>';
        navLinks.appendChild(listingsItem);

        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            });
        }
    }
});