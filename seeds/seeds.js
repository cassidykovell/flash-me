const sequelize = require('../config/connection');
const { User, Flashcard } = require('../models'); // Update Project to Flashcard

const userData = require('./userData.json');
const flashcardData = require('./flashcardData.json'); // Update ProjectData to flashcardData

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const flashcard of flashcardData) { // Update Project to Flashcard
    await Flashcard.create({ // Update Project to Flashcard
      ...flashcard,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
