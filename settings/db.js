var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
});

connection.connect((error) => {
  if (error) {
    return console.log("Ошибка подключения к БД!");
  } else {
    return console.log("Подключение успешно!");
  }
});

module.exports = connection;