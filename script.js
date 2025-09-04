document.addEventListener('DOMContentLoaded', function() {

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ LOGIN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // ... (ο κώδικας για το login παραμένει ίδιος) ...
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            if (emailInput === 'test@xestock.gr' && passwordInput === '123456') {
                alert('Επιτυχής σύνδεση! Μεταφέρεστε στον Πίνακα Ελέγχου...');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Λάθος email ή κωδικός. Παρακαλώ δοκιμάστε ξανά.';
            }
        });
    }

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ ΕΓΓΡΑΦΗΣ (ΕΝΗΜΕΡΩΜΕΝΗ) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Παίρνουμε τις τιμές από όλα τα πεδία
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password.length < 8) {
                alert('Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες.');
                return; 
            }
            if (password !== confirmPassword) {
                alert('Οι κωδικοί πρόσβασης δεν ταιριάζουν. Παρακαλώ διορθώστε το.');
                return;
            }

            // Δημιουργούμε ένα αντικείμενο με όλα τα δεδομένα της φόρμας
            const formData = {
                vat: document.getElementById('vat-number').value,
                companyName: document.getElementById('company-name').value,
                category: document.getElementById('category').value,
                address: document.getElementById('address').value,
                addressNumber: document.getElementById('address-number').value,
                zipCode: document.getElementById('zip-code').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: password
            };

            // --- ΝΕΑ ΠΡΟΣΘΗΚΗ: Αποστολή των δεδομένων στον server ---
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Απάντηση από τον server:', data);
                alert('Η εγγραφή ήταν επιτυχής και τα δεδομένα στάλθηκαν στον server!');
                registerForm.reset();
            })
            .catch(error => {
                console.error('Σφάλμα κατά την αποστολή:', error);
                alert('Παρουσιάστηκε ένα σφάλμα κατά την αποστολή της εγγραφής.');
            });
        });
    }


    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ ΕΠΙΚΟΙΝΩΝΙΑΣ ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        // ... (ο κώδικας για την επικοινωνία παραμένει ίδιος) ...
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if(name && email && subject && message) {
                alert('Ευχαριστούμε για το μήνυμά σας! Θα επικοινωνήσουμε μαζί σας σύντομα.');
                contactForm.reset();
            } else {
                alert('Παρακαλώ συμπληρώστε όλα τα πεδία.');
            }
        });
    }
    
    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΟ MOBILE MENU (HAMBURGER) ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if(navToggle && mainNav){
        // ... (ο κώδικας για το hamburger menu παραμένει ίδιος) ...
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
});