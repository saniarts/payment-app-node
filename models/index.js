const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Import Sequelize configuration

const sequelize = new Sequelize(config[process.env.NODE_ENV || 'development']);

const models = {};

fs.readdirSync(__dirname)
  .filter(file => (file !== 'index.js') && (file.endsWith('.js')))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;