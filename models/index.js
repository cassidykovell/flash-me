const User = require('./User');
const Collection = require('./Collection');
const Flashcard = require('./flashcard');

User.hasMany(Collection, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Collection.belongsTo(User, {
  foreignKey: 'user_id',
});

Collection.hasMany(Flashcard, {
  foreignKey: 'collection_id'
});

Flashcard.belongsTo(Collection, {
  foreignKey: 'collection_id',
});

module.exports = { User, Collection, Flashcard };
