const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = 3001;

// --- Σύνδεση με DB ---
const dbURI = 'mongodb://localhost:27017/xestock-db';
mongoose.connect(dbURI)
    .then(() => console.log('Η σύνδεση με το MongoDB ήταν επιτυχής!'))
    .catch(err => console.error('Σφάλμα σύνδεσης με MongoDB:', err));

// --- Μοντέλο Χρήστη ---
const userSchema = new mongoose.Schema({ /* ... παραμένει το ίδιο ... */ });
const User = mongoose.model('User', userSchema);

// --- Middlewares ---
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());
app.use(session({
    secret: 'a-very-secret-key-that-you-should-change',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

// --- API Endpoints ---
app.post('/api/register', async (req, res) => { /* ... παραμένει το ίδιο ... */ });
app.post('/api/login', async (req, res) => { /* ... παραμένει το ίδιο ... */ });
app.post('/api/logout', (req, res) => { /* ... παραμένει το ίδιο ... */ });


// --- ΝΕΟ API ENDPOINT ΓΙΑ ΕΛΕΓΧΟ ΣΥΝΔΕΣΗΣ ---
app.get('/api/session', async (req, res) => {
    // Ελέγχουμε αν υπάρχει αποθηκευμένο userId στο session
    if (req.session.userId) {
        // Αν υπάρχει, βρίσκουμε τον χρήστη στη βάση
        const user = await User.findById(req.session.userId).select('-password'); // .select('-password') για να μην στείλουμε ποτέ τον κωδικό
        if (user) {
            // Αν τον βρούμε, στέλνουμε τα στοιχεία του
            res.json({ loggedIn: true, user: user });
        } else {
            // Αν δεν τον βρούμε (π.χ. έχει διαγραφεί), στέλνουμε ότι δεν είναι συνδεδεμένος
            res.json({ loggedIn: false });
        }
    } else {
        // Αν δεν υπάρχει session, στέλνουμε ότι δεν είναι συνδεδεμένος
        res.json({ loggedIn: false });
    }
});


// --- Εκκίνηση του Server ---
app.listen(PORT, () => {
    console.log(`Ο server τρέχει. Άνοιξε την εφαρμογή σου εδώ: http://localhost:${PORT}/login.html`);
});