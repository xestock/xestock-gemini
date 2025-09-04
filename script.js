document.addEventListener('DOMContentLoaded', function() {

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ LOGIN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message) });
                }
                return response.json();
            })
            .then(data => {
                alert('Επιτυχής σύνδεση! Μεταφέρεστε στον Πίνακα Ελέγχου...');
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                console.error('Σφάλμα σύνδεσης:', error);
                errorMessage.textContent = error.message;
            });
        });
    }

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ ΕΓΓΡΑΦΗΣ (ΕΝΗΜΕΡΩΜΕΝΗ) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
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

            // --- Η ΔΙΟΡΘΩΣΗ ΕΙΝΑΙ ΕΔΩ ---
            fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => {
                // Ελέγχουμε αν η απάντηση του server είναι ΟΚ (status 2xx)
                if (!response.ok) {
                    // Αν δεν είναι ΟΚ, διαβάζουμε το μήνυμα λάθους του server και το "πετάμε" στο .catch
                    return response.json().then(err => { throw new Error(err.message) });
                }
                // Αν είναι ΟΚ, συνεχίζουμε κανονικά
                return response.json();
            })
            .then(data => {
                // Αυτό το κομμάτι θα εκτελεστεί ΜΟΝΟ σε επιτυχή εγγραφή
                console.log('Απάντηση από τον server:', data);
                alert('Η εγγραφή ήταν επιτυχής!');
                registerForm.reset();
            })
            .catch(error => {
                // Αυτό το κομμάτι θα "πιάνει" πλέον τα σφάλματα του server
                console.error('Σφάλμα κατά την εγγραφή:', error);
                alert(`Σφάλμα: ${error.message}`);
            });
        });
    }

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ ΕΠΙΚΟΙΝΩΝΙΑΣ ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
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
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
});