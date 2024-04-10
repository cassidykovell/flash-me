const router = require('express').Router();
const { Collection } = require('../../models'); 
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newCollection = await Collection.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCollection);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/collection/:id", async (req, res) => {
  try {
    const collectionData = await Collection.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"], // Changed from 'name' to 'username'
        },
      ],
    });

    const collection = collectionData.get({ plain: true });

    res.render("collection", {
      ...collection,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const collectionData = await Collection.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!collectionData) {
      res.status(404).json({ message: 'No colection found with this id!' });
      return;
    }

    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
