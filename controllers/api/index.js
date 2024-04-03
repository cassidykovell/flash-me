const router = require('express').Router();
const userRoutes = require('./userRoutes');
const flashcardRoutes = require('./flashcardRoutes'); // Update ProjectRoutes to flashcardRoutes

router.use('/users', userRoutes);
router.use('/flashcards', flashcardRoutes); // Update ProjectRoutes to flashcardRoutes

module.exports = router;
