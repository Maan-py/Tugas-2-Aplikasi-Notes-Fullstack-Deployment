const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Note = sequelize.define("Note", {
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = Note;
