var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bms",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("database connected successfully");
});

module.exports = con;
