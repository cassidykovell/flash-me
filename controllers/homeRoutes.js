const router = require('express').Router();
const { Flashcard, User, Collection } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage')

})

router.get('/about', async (req, res) => {
  res.render('about')
  
})

router.get('/login', async (req, res) => {
  res.render('login')
  
})

router.get('/profile', async (req, res) => {
  res.render('profile')
  
})

router.get('/feed', async (req, res) => {
  try {
    const collectionData = await Collection.findAll({
      include: [
        {
          model: User,
          attributes: ['username'], // Changed from 'name' to 'username'
        },
      ],
    });

    const collections = collectionData.map((collection) => collection.get({ plain: true }));
    console.log(collections)

    res.render('feedpage', { 
      collections, 
      logged_in: req.session.logged_in,
      layout: 'feed'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/flashcard/:id', async (req, res) => {
  try {
    const flashcardData = await Flashcard.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'], // Changed from 'name' to 'username'
        },
      ],
    });

    const flashcard = flashcardData.get({ plain: true });

    res.render('flashcard', {
      ...flashcard,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Flashcard }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
