const sequelize = require("../config/connection");
const { User, Flashcard, Collection } = require("../models"); // Update Project to Flashcard

const userData = require("./userData.json");
const collectionData = require("./collectionData.json");
const flashcardData = require("./flashcardData.json"); // Update ProjectData to flashcardData

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Collection.bulkCreate(collectionData);
  await Flashcard.bulkCreate(flashcardData);
  process.exit(0);
};

seedDatabase();
