const router = require('express').Router();
const { Collection } = require('../../models'); 
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('POST /collection - Request Body:', req.body); // Log the request body
  try {
    const newCollection = await Collection.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New collection created:', newCollection); // Log the newly created collection
    res.status(200).json(newCollection);
  } catch (err) {
    console.error('Error creating new collection:', err); // Log the error
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  console.log('DELETE /collection/:id - Collection ID:', req.params.id); // Log the collection ID
  try {
    const collectionData = await Collection.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!collectionData) {
      console.log('No collection found with ID:', req.params.id); // Log if no collection found
      res.status(404).json({ message: 'No collection found with this id!' });
      return;
    }

    console.log('Collection deleted:', collectionData); // Log the deleted collection data
    res.status(200).json(collectionData);
  } catch (err) {
    console.error('Error deleting collection:', err); // Log the error
    res.status(500).json(err);
  }
});

module.exports = router;


