const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // <-- Το νέο μας εργαλείο

const app = express();
const PORT = 3001;

// --- Σύνδεση με τη Βάση Δεδομένων MongoDB ---
// Αυτή είναι η διεύθυνση της τοπικής μας βάσης δεδομένων.
// 'xestock-db' είναι το όνομα που δίνουμε στη βάση μας.
const dbURI = 'mongodb://localhost:27017/xestock-db';
mongoose.connect(dbURI)
    .then(() => console.log('Η σύνδεση με το MongoDB ήταν επιτυχής!'))
    .catch(err => console.error('Σφάλμα σύνδεσης με MongoDB:', err));

// --- Δημιουργία "Μοντέλου" Χρήστη ---
// Εδώ ορίζουμε τους κανόνες για το πώς θα μοιάζει ένας χρήστης στη βάση μας.
const userSchema = new mongoose.Schema({
    vat: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    category: { type: String, required: true },
    address: String,
    addressNumber: String,
    zipCode: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true }
});

// Δημιουργούμε το "εργαλείο" (Model) που θα χρησιμοποιούμε για να διαχειριζόμαστε τους χρήστες.
const User = mongoose.model('User', userSchema);


// --- Middlewares ---
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());


// --- API Endpoint για την εγγραφή (Αναβαθμισμένο) ---
app.post('/api/register', async (req, res) => {
    console.log('Έφτασαν νέα δεδομένα εγγραφής:', req.body);
    
    try {
        // Παίρνουμε τα δεδομένα από τη φόρμα
        const userData = req.body;

        // Δημιουργούμε έναν νέο χρήστη χρησιμοποιώντας το Model
        const newUser = new User(userData);

        // Τον αποθηκεύουμε στη βάση δεδομένων
        await newUser.save();

        console.log('Ο χρήστης αποθηκεύτηκε επιτυχώς στη βάση δεδομένων!');
        res.json({ message: 'Η εγγραφή ολοκληρώθηκε και ο χρήστης αποθηκεύτηκε!' });

    } catch (error) {
        console.error('Σφάλμα κατά την αποθήκευση του χρήστη:', error);
        // Στέλνουμε πίσω ένα μήνυμα λάθους
        res.status(500).json({ message: 'Σφάλμα κατά την εγγραφή του χρήστη.' });
    }
});


// --- Εκκίνηση του Server ---
app.listen(PORT, () => {
    console.log(`Ο server τρέχει. Άνοιξε την εφαρμογή σου εδώ: http://localhost:${PORT}/register.html`);
});