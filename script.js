document.addEventListener('DOMContentLoaded', function() {
    // Κώδικας για τη φόρμα Εγγραφής
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('Οι κωδικοί πρόσβασης δεν ταιριάζουν. Παρακαλώ δοκιμάστε ξανά.');
                confirmPasswordInput.focus();
                return;
            }

            const formData = {
                afm: document.getElementById('afm').value,
                businessName: document.getElementById('businessName').value,
                category: document.getElementById('category').value,
                address: document.getElementById('address').value,
                addressNumber: document.getElementById('address-number').value,
                zipCode: document.getElementById('zipCode').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                password: passwordInput.value
            };

            const apiUrl = 'https://your-backend-api.com/register'; 

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Εγγραφή επιτυχής! Καλωσόρισες στο Xestock.');
                    console.log('Server response:', result);
                } else {
                    const errorData = await response.json();
                    alert(`Σφάλμα στην εγγραφή: ${errorData.message}`);
                    console.error('Server error:', errorData);
                }
            } catch (error) {
                console.error('Network error:', error);
                alert('Προέκυψε σφάλμα επικοινωνίας με τον server. Παρακαλώ δοκιμάστε αργότερα.');
            }
        });
    }

    // Κώδικας για τη φόρμα Επικοινωνίας
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Αποτροπή της προεπιλεγμένης αποστολής της φόρμας

            // Συλλογή των δεδομένων της φόρμας επικοινωνίας
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Εδώ θα έπρεπε να υπάρχει το πραγματικό URL του server σου για αποστολή email
            const contactApiUrl = 'https://your-backend-api.com/contact'; 

            try {
                // Χρήση της Fetch API για την αποστολή των δεδομένων
                const response = await fetch(contactApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Το μήνυμά σας στάλθηκε με επιτυχία!');
                    contactForm.reset(); // Καθαρίζει τη φόρμα
                } else {
                    const errorData = await response.json();
                    alert(`Αποτυχία αποστολής: ${errorData.message}`);
                    console.error('Server error:', errorData);
                }
            } catch (error) {
                console.error('Network error:', error);
                alert('Προέκυψε σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά αργότερα.');
            }
        });
    }
});