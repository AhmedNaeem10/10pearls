const path = require('path');
const db = require("./model");
db.sequelize.sync();
const ADMIN = require(path.join(__dirname, 'model/admin'))(db.sequelize, db.Sequelize)
ADMIN.findAll()