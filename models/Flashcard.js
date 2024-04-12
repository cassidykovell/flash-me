const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    collection_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Collection',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'Flashcard',
  }
);

module.exports = Flashcard;

