const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json());

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
    // remove this for PROD
	  console.log(row);
	  res.send(row);
        });
});

app.get('/api/programs/', (req, res) => {
  let sql = `SELECT ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Instructor FROM Programs ORDER BY OfferingPeriod ASC;`;
  let programs = [];

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("oopsie");
    }

    let i = 0;
    rows.forEach((row) => {
      programs[i] = row;
      i++
    });

    res.send(programs);
  });
});

app.post(`/api/programs/`, (req, res) => {
  let program = req.body;
  console.log(program);

  db.run(`INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Location, Cost, Capacity) VALUES ('${program.programTitle}', '${program.programOfferingPeriod}', '${program.programOfferingPeriodEnd}', 2, '${program.programDescription}', '${program.programLocation}', ${program.programCost}, ${program.programCapacity});`)
  .all(`SELECT * FROM Programs WHERE Title = '${program.programTitle}'`, (err, rows) => {
    if (err){
      throw err;
    }
    res.send(rows);
  });;
}); 

app.post('/api/create-account/', (req,res) => {
  let credentials = req.body;
  console.log(credentials);

  let sql = `SELECT Username FROM Credentials WHERE Username = '${credentials.username}';`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    
    // Check for existing username
    if (rows.length > 0) {
      res.send({successful: false, userId: 0});
    } else {
      // Put values into Credentials and Users tables (unique UserId != 0)
      // db.run(`INSERT INTO Credentials(Username, Password, UserId) VALUES ('${credentials.username}', '${credentials.password}', ???  )`);
      // db.run(`INSERT INTO Users(UserId, Name, Member, Staff) VALUES (???, '${credentials.name}', '${credentials.isMember}', '${credentials.isStaff}')`);
      // res.send({successful: true, userId: ???});
    }
  });
})

app.get('/api/enrollments/', (req, res) => {
  let sql = `SELECT p.ProgramId, Count(e.programId) AS NumOfEnrollments FROM Programs p JOIN Enrollments e ON e.ProgramId = p.ProgramId GROUP BY p.ProgramId`;
  let enrollments = [];

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("oopsie");
    }

    let i = 0;
    rows.forEach((row) => {
      enrollments[i] = row;
      i++
    });

    res.send(enrollments);
  });
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