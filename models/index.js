const User = require('./User');
const Flashcard = require('./Flashcard'); // Update import to include Flashcard model

User.hasMany(Flashcard, { // Update association to connect User with Flashcard
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Flashcard.belongsTo(User, { // Update association to connect Flashcard with User
  foreignKey: 'user_id',
});

module.exports = { User, Flashcard };
