let mysql = require('mysql');

exports.connect = () => {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'home_services'
  });
  return connection;
}