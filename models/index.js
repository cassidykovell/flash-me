const User = require('./User');
const Flashcard = require('./Flashcard'); // Rename Project to Flashcard

User.hasMany(Flashcard, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Flashcard.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Flashcard }; // Update Project to Flashcard
