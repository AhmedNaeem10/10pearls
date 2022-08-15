const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
// create database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	port: dbConfig.PORT,
	dialect: dbConfig.dialect,
	operationsAliases: false,
	pool: {
	max: dbConfig.pool.max,
	min: dbConfig.pool.min,
	acquire: dbConfig.pool.acquire,
	idle: dbConfig.pool.idle
	},
	// dialectOptions: {
    //     socketPath: "/var/run/mysqld/mysqld.sock"
    // },
    define: {
        paranoid: true
    },
	dialectOptions: {
		encrypt: true
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