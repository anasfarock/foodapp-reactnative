const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diseases: {
    type: DataTypes.TEXT, // Stored as JSON string
    get() {
      const val = this.getDataValue('diseases');
      return val ? JSON.parse(val) : [];
    },
    set(value) {
      this.setDataValue('diseases', JSON.stringify(value));
    },
  },
  allergies: {
    type: DataTypes.TEXT,
    get() {
      const val = this.getDataValue('allergies');
      return val ? JSON.parse(val) : [];
    },
    set(value) {
      this.setDataValue('allergies', JSON.stringify(value));
    },
  },
});

module.exports = User;
