const router = require('express').Router();
const userRoutes = require('./userRoutes');
const flashcardRoutes = require('./collectionRoutes'); // Update ProjectRoutes to flashcardRoutes

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes); // Update ProjectRoutes to flashcardRoutes

module.exports = router;
