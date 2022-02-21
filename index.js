const express = require('express')
const app = express()
const port = 3000
var router = express.Router();

app.get('/api/login/', (req, res) => {

  let username = 'susan'
  let password = '123'

  // let username = req.body.username;
  // let password = req.body.password;
  let sql = `SELECT u.UserId, Name, Member, Staff FROM Users u JOIN Credentials c ON u.UserId = c.UserId WHERE Username = '${username}' AND PASSWORD = '${password}';`

        db.all(sql, [], (err, rows) => {
          console.log("RESULTS :");
          if (err) {
            console.log("oopsie");
          }
          rows.forEach((row) => {
            console.log(row);
          });
        });

  res.send('Login Page')
})

app.get('/test/', function(req, res) {
  let sql = `SELECT * FROM Users;`

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// DB Connection

const sqlite3 = require('sqlite3').verbose();

var dbPath = "/Users/Hannah/Desktop/school-2022/cs341/cs341-ymca.db";

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the MyMCA database.');
});