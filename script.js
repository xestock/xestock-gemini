// Περίμενε να φορτώσει το HTML πριν εκτελέσεις τον κώδικα
document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIC FOR LOGIN PAGE (login.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Αποτροπή default αποστολής

            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            // Έλεγχος των "ψεύτικων" στοιχείων
            if (emailInput === 'test@xestock.gr' && passwordInput === '123456') {
                // Επιτυχής σύνδεση
                alert('Επιτυχής σύνδεση! Μεταφέρεστε στον Πίνακα Ελέγχου...');
                window.location.href = 'dashboard.html'; // Ανακατεύθυνση
            } else {
                // Λανθασμένα στοιχεία
                errorMessage.textContent = 'Λάθος email ή κωδικός. Παρακαλώ δοκιμάστε ξανά.';
            }
        });
    }

    // --- LOGIC FOR DASHBOARD PAGE (dashboard.html) ---
    const newPostForm = document.getElementById('newPostForm');
    if (newPostForm) {
        const postDateInput = document.getElementById('postDate');
        const expiryDateInput = document.getElementById('expiryDate');
        const productDescriptionInput = document.getElementById('productDescription');

        // Λογική για τις Ημερομηνίες
        const today = new Date();
        const maxExpiryDate = new Date();
        maxExpiryDate.setDate(today.getDate() + 30);
        const todayFormatted = today.toISOString().split('T')[0];
        const maxExpiryFormatted = maxExpiryDate.toISOString().split('T')[0];

        postDateInput.value = todayFormatted;
        expiryDateInput.min = todayFormatted;
        expiryDateInput.max = maxExpiryFormatted;

        // Λογική για την υποβολή της φόρμας
        newPostForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const postData = {
                description: productDescriptionInput.value,
                creationDate: postDateInput.value,
                expirationDate: expiryDateInput.value,
            };
            
            console.log("Δεδομένα ανάρτησης προς αποστολή στον server:", postData);
            alert("Η ανάρτηση είναι έτοιμη για αποστολή! (Δες την κονσόλα για λεπτομέρειες)");

            newPostForm.reset();
            postDateInput.value = todayFormatted;
        });
    }
});