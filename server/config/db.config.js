require("dotenv").config({ path: "./config.env" });

// environment variables present in config.env, set up your own!
module.exports = {
    HOST: process.env.host,
    USER: process.env.user,
    PASSWORD: process.env.password,
    PORT: process.env.db_port,
    DB: process.env.database,
    dialect: "mssql", 
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 20000
    }
};