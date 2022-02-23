const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3000
var router = express.Router();

app.get('/api/login/:user&:pass', (req, res) => {
  let username = req.params.user;
  let password = req.params.pass;
  
  let sql = `SELECT u.UserId, Name, Member, Staff FROM Users u JOIN Credentials c ON u.UserId = c.UserId WHERE Username = '${username}' AND PASSWORD = '${password}';`
        db.get(sql, [], (err, row) => {
          if (err) {
            console.log("oopsie");
          }
	  console.log(row);
	  userCredentials = row;
	  res.send(row);
        });
});

app.get('/api/programs/:userId', (req, res) => {
  var userId = req.params.userId;
  if (userId == null) {
    res.send('/');
  } else {
    // return program list for user
    console.log('WARNING: data grab for programs is not currently implemented.');
    // temporarily hard-coded data
    var programs = [
			{
			programId: 1, 
			title: 'testProgram', 
			offeringPeriod: new Date('2/20/21'),
			description: "it's not real",
			cost: 48.0,
			capacity: 20,
			instructor: 1
			}
		];
    res.send(programs);
  }
});

app.listen(port, () => {
  console.log(`MyMCA backend listening on port ${port}`)
})

// DB Connection

const sqlite3 = require('sqlite3').verbose();

var dbPath = "../db/cs341-ymca.db";

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the MyMCA database.');
});