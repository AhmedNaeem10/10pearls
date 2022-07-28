const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// create database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operationsAliases: false,
	pool: {
	max: dbConfig.pool.max,
	min: dbConfig.pool.min,
	acquire: dbConfig.pool.acquire,
	idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//  connect to database and test credentials
sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
 }).catch((error) => {
	console.error('Unable to connect to the database: ', error);
 });

module.exports = db;