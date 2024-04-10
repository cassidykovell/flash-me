const router = require("express").Router();
const { Flashcard, User, Collection } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("homepage", { logged_in: req.session.logged_in });
});

router.get("/about", async (req, res) => {
  res.render("about");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/feed", async (req, res) => {
  try {
    const collectionData = await Collection.findAll({
      include: [
        {
          model: User,
          attributes: ["username"], // Changed from 'name' to 'username'
        },
      ],
    });

    const collections = collectionData.map((collection) =>
      collection.get({ plain: true })
    );
    console.log(collections);

    res.render("feedpage", {
      collections,
      logged_in: req.session.logged_in,
      username: req.session.username,
      layout: "feed",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  console.log('in profile', req.session)
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Collection }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render("profile", {
      collections: user.Collections, 
      username: req.session.username,
      logged_in: req.session.logged_in,
      layout: "feed",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/profile', async (req, res) => {
//   try {
// //     const userData = await User.findByPk(req.session.user_id, {
// //       attributes: { exclude: ['password'] },
// //       include: [{ model: Collection }],
// //     });

// //     const user = userData.get({ plain: true });
// // console.log(user)
//     res.render('test', {
//       // ...user,
//       // logged_in: true,
//       layout: 'feed'
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
