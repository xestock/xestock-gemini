// Περίμενε να φορτώσει το HTML πριν εκτελέσεις τον κώδικα
document.addEventListener('DOMContentLoaded', function() {

    // --- Επιλογή Στοιχείων από το HTML ---
    const postDateInput = document.getElementById('postDate');
    const expiryDateInput = document.getElementById('expiryDate');
    const newPostForm = document.getElementById('newPostForm');
    const productDescriptionInput = document.getElementById('productDescription');

    // --- Λογική για τις Ημερομηνίες ---

    // 1. Παίρνουμε τη σημερινή ημερομηνία
    const today = new Date();
    
    // 2. Υπολογίζουμε την ημερομηνία σε 30 ημέρες από σήμερα
    const maxExpiryDate = new Date();
    maxExpiryDate.setDate(today.getDate() + 30);

    // 3. Μετατρέπουμε τις ημερομηνίες σε format YYYY-MM-DD που καταλαβαίνει το input[type="date"]
    const todayFormatted = today.toISOString().split('T')[0];
    const maxExpiryFormatted = maxExpiryDate.toISOString().split('T')[0];

    // 4. Ορίζουμε τις τιμές και τους περιορισμούς στα πεδία του HTML
    if (postDateInput && expiryDateInput) {
        // Ορίζουμε τη σημερινή ημερομηνία στο πεδίο "Ημερομηνία Ανάρτησης"
        postDateInput.value = todayFormatted;
        
        // Θέτουμε τη minimum επιλέξιμη ημερομηνία λήξης (τη σημερινή)
        expiryDateInput.min = todayFormatted;
        
        // Θέτουμε τη maximum επιλέξιμη ημερομηνία λήξης (30 ημέρες από σήμερα)
        expiryDateInput.max = maxExpiryFormatted;
    }

    // --- Λογική για την υποβολή της φόρμας ---
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Σταματάμε την default αποστολή της φόρμας

            // Εδώ θα μαζέψεις όλες τις πληροφορίες για να τις στείλεις στον server
            const postData = {
                description: productDescriptionInput.value,
                creationDate: postDateInput.value,
                expirationDate: expiryDateInput.value,
                // Αργότερα θα προσθέσουμε και το ID του χρήστη που κάνει την ανάρτηση
                // userId: "some_user_id" 
            };
            
            console.log("Δεδομένα ανάρτησης προς αποστολή στον server:", postData);
            alert("Η ανάρτηση είναι έτοιμη για αποστολή! (Δες την κονσόλα για λεπτομέρειες)");

            // Εδώ αργότερα θα βάλουμε τον κώδικα που στέλνει τα δεδομένα στον backend server
            // π.χ. fetch('/api/posts', { method: 'POST', body: JSON.stringify(postData), ... });

            // Καθαρίζουμε τη φόρμα μετά την "υποβολή"
            newPostForm.reset();
            // Ξαναβάζουμε τη σημερινή ημερομηνία στο πεδίο, αφού το reset το καθαρίζει
            postDateInput.value = todayFormatted;
        });
    }
});