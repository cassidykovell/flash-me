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
  router.post('/create', async (req, res) => {
    const { collectionId, flashcards } = req.body;

    try {
        const collection = await Collection.findByPk(collectionId);

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        const createdFlashcards = await Promise.all(
            flashcards.map(async flashcardData => {
                const { flashcardTitle, question, answer } = flashcardData;
                const newFlashcard = await Flashcard.create({ flashcardTitle, question, answer });
                await newFlashcard.setCollection(collection);
                return newFlashcard;
            })
        );

        res.status(201).json(createdFlashcards);
    } catch (error) {
        console.error('Error creating flashcards:', error);
        res.status(500).json({ error: 'Failed to create flashcards' });
    }
});

module.exports = router;