const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;

// --- Σύνδεση με τη Βάση Δεδομένων MongoDB ---
const dbURI = 'mongodb://localhost:27017/xestock-db';
mongoose.connect(dbURI)
    .then(() => console.log('Η σύνδεση με το MongoDB ήταν επιτυχής!'))
    .catch(err => console.error('Σφάλμα σύνδεσης με MongoDB:', err));

// --- Μοντέλο Χρήστη ---
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
const User = mongoose.model('User', userSchema);

// --- Middlewares ---
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());


// --- API Endpoint για την εγγραφή (Αναβαθμισμένο με Έλεγχο Διπλοτύπων) ---
app.post('/api/register', async (req, res) => {
    try {
        const { vat, email, password } = req.body;

        // --- ΝΕΟΣ ΕΛΕΓΧΟΣ: Ψάξε αν υπάρχει ήδη χρήστης με αυτό το ΑΦΜ ή Email ---
        const existingUser = await User.findOne({ $or: [{ vat: vat }, { email: email }] });
        if (existingUser) {
            console.log('Αποτυχημένη προσπάθεια εγγραφής: Ο χρήστης υπάρχει ήδη.');
            // Στέλνουμε πίσω ένα σφάλμα 409 (Conflict) που σημαίνει ότι η εγγραφή συγκρούεται με μια υπάρχουσα.
            return res.status(409).json({ message: 'Το ΑΦΜ ή το Email χρησιμοποιείται ήδη.' });
        }
        
        // Αν δεν υπάρχει, συνεχίζουμε κανονικά...
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        console.log('Ο χρήστης αποθηκεύτηκε επιτυχώς με κρυπτογραφημένο κωδικό!');
        res.json({ message: 'Η εγγραφή ολοκληρώθηκε και ο χρήστης αποθηκεύτηκε με ασφάλεια!' });

    } catch (error) {
        // Αυτό το catch πιάνει πλέον άλλα, απρόβλεπτα σφάλματα.
        console.error('Σφάλμα κατά την αποθήκευση του χρήστη:', error);
        res.status(500).json({ message: 'Σφάλμα κατά την εγγραφή του χρήστη.' });
    }
});


// --- Εκκίνηση του Server ---
app.listen(PORT, () => {
    console.log(`Ο server τρέχει. Άνοιξε την εφαρμογή σου εδώ: http://localhost:${PORT}/register.html`);
});