const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());
app.use(bookRoutes);

// Sync database
sequelize.sync();

module.exports = app;
