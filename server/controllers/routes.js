const db = require('../config/dbConn');

module.exports = function(app){
  
// routes
app.get("/", function(req, res)  {
    res.json({ message: "Welcome to Home Services Web application." });
  });
  
app.get("/admin", function(req, res)  {
    // res.json({ message: "Hello from server." });
    db.query("SELECT * from admin", (err,rows,fields) => {
      if (!err)
        res.send(rows);
      else
        console.log(err);
  
    });
  });
}

