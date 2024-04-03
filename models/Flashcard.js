const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Update connection path
const User = require('./User');

class Flashcard extends Model {} // Change class name to Flashcard

Flashcard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question: { // Add question attribute
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: { // Add answer attribute
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: { // Add createdAt attribute
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: { // Add updatedAt attribute
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enable timestamps
    underscored: true,
    modelName: 'Flashcard', // Change modelName to flashcard
  }
);

module.exports = Flashcard;
