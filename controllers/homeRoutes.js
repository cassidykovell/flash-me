const router = require('express').Router();
const { Flashcard, User } = require('../models'); // Update Project to Flashcard
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all flashcards and JOIN with user data
    const flashcardData = await Flashcard.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['username'], // Update name to username
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const flashcards = flashcardData.map((flashcard) => flashcard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      flashcards, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/flashcard/:id', async (req, res) => { // Change project to flashcard
  try {
    const flashcardData = await Flashcard.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'], // Update name to username
        },
      ],
    });

    const flashcard = flashcardData.get({ plain: true });

    res.render('flashcard', { // Change project to flashcard
      ...flashcard,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Flashcard }], // Update Project to Flashcard
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
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
