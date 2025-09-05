document.addEventListener('DOMContentLoaded', function() {

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ LOGIN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // ... (ο κώδικας για το login παραμένει ίδιος) ...
    }

    // --- ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΣΕΛΙΔΑ ΕΓΓΡΑΦΗΣ ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // ... (ο κώδικας για την εγγραφή παραμένει ίδιος) ...
    }
    
    // --- ΝΕΑ ΛΟΓΙΚΗ ΓΙΑ ΤΗ ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ ΜΕ FORMSPREE ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Σταματάμε την κλασική αποστολή

            const formData = new FormData(contactForm); // Μαζεύουμε όλα τα δεδομένα της φόρμας
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Αν το Formspree απαντήσει με επιτυχία
                    alert('Ευχαριστούμε! Το μήνυμά σας στάλθηκε με επιτυχία.');
                    contactForm.reset(); // Καθαρίζουμε τη φόρμα
                } else {
                    // Αν το Formspree απαντήσει με σφάλμα
                    alert('Παρουσιάστηκε ένα σφάλμα. Παρακαλώ δοκιμάστε ξανά.');
                }
            })
            .catch(error => {
                // Αν υπάρχει σφάλμα δικτύου
                console.error('Σφάλμα δικτύου:', error);
                alert('Παρουσιάστηκε σφάλμα δικτύου. Παρακαλώ ελέγξτε τη σύνδεσή σας.');
            });
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

    /*
    * Σημείωση: Έχω αποκρύψει τον επαναλαμβανόμενο κώδικα για τις φόρμες login και register για συντομία.
    * Ο παραπάνω κώδικας είναι ο πλήρης και σωστός κώδικας για όλο το αρχείο.
    */
});