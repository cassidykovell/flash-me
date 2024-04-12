const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require('./collectionRoutes'); // Update ProjectRoutes to flashcardRoutes
const createRoutes = require('./createRoute');

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes);
router.use('/create', createRoutes); // Update ProjectRoutes to flashcardRoutes

module.exports = router;
