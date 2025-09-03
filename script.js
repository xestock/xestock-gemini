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
});