const router = require('express').Router();
const userRoutes = require('./userRoutes');
const collectionRoutes = require('./collectionRoutes'); 
const createRoute = require('./createRoute');

router.use('/users', userRoutes);
router.use('/collection', collectionRoutes); 
router.use('/create', createRoute);

module.exports = router;
