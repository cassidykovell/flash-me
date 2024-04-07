const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Collection = require('./Collection');

class Flashcard extends Model {}

Flashcard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collection_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Collection,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Flashcard',
  }
);

module.exports = Flashcard;
