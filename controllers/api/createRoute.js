const router = require('express').Router();
const { Collection } = require('../../models'); 
const { Flashcard } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const collections = await Collection.findAll({ 
        where: { user_id: req.user.id } });
      res.render('profile', { user_id: req.session.user_id, collections });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });