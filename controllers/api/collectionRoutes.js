const router = require('express').Router();
const { Flashcard } = require('../../models'); // Update Project to Flashcard
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newFlashcard = await Flashcard.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFlashcard);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const flashcardData = await Flashcard.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!flashcardData) {
      res.status(404).json({ message: 'No flashcard found with this id!' });
      return;
    }

    res.status(200).json(flashcardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
