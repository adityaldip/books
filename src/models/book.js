const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('books', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  published_date: { type: DataTypes.DATE, allowNull: false },
  isbn: { type: DataTypes.STRING, allowNull: false, unique: true },
  pages: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
});

module.exports = Book;
