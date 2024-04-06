const router = require('express').Router();
const { Flashcard, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const flashcardData = await Flashcard.findAll({
      include: [
        {
          model: User,
          attributes: ['username'], // Changed from 'name' to 'username'
        },
      ],
    });

    const flashcards = flashcardData.map((flashcard) => flashcard.get({ plain: true }));

    res.render('homepage', { 
      flashcards, 
      logged_in: req.session.logged_in 
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
