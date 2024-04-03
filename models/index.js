const User = require('./User');
const Flashcard = require('./Flashcard'); // Rename Project to Flashcard
const Collection = require('/Collection');

User.hasMany(Collection, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Collection.belongsTo(User, {
  foreignKey: 'user_id',
})

Collection.hasMany(Flashcard, {
  foreignKey: "collection_id"
})

Flashcard.belongsTo(Collection, {
  foreignKey: 'collection_id'
});

module.exports = { User, Flashcard }; // Update Project to Flashcard
