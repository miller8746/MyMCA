const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json());

const port = 3000
var router = express.Router();

// Log in with username and password
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

// Get for Programs page
app.get('/api/programs/', (req, res) => {
  let sql = `SELECT ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Instructor FROM Programs ORDER BY OfferingPeriod ASC;`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    db.all(`SELECT Day, ProgramId FROM ProgramDays`, (err, days) => {
      if (err) {
        console.log(err);
      }
      rows.forEach((row) => {
        row.Days = days.filter(function(day) { if (day.ProgramId == row.ProgramId) return true});
      });
      console.log(rows);
      res.send(rows);
    });
  });
});

// Post for Create Programs page
app.post(`/api/programs/`, (req, res) => {
  let program = req.body;
  console.log(program);

  db.run(`INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Location, Cost, Capacity) VALUES ('${program.programTitle}', '${program.programOfferingPeriod}', '${program.programOfferingPeriodEnd}', 2, '${program.programDescription}', '${program.programLocation}', ${program.programCost}, ${program.programCapacity});`)
  .all(`SELECT * FROM Programs WHERE Title = '${program.programTitle}' AND OfferingPeriod = '${program.programOfferingPeriod}' AND OfferingPeriodEnd = '${program.programOfferingPeriodEnd}' AND Description = '${program.programDescription}' AND Location = '${program.programLocation}' AND Cost = ${program.programCost} AND Capacity = ${program.programCapacity}`, (err, rows) => {
    // TODO: Is there a better way to select the program we just made, rather than selecting by all attributes?
    // TODO: If not, add Instructor to the list of attributes we are selecting on if/when we implement instructors in programs
    if (err) {
      console.log(err);
    }
    db.serialize(() => {
      // Queries will be forced to run sequentially
      // Create entries in Days table
      var i = 1;
      for (i = 1; i < program.programDays.length; i++) {
        db.run(`INSERT INTO ProgramDays(ProgramId, Day) VALUES (${rows[0].ProgramId}, '${program.programDays[i]}');`);
      }
      db.all(`SELECT ProgramDayId, Day FROM ProgramDays WHERE ProgramId = ${rows[0].ProgramId}`, (err, days) => {
        if (err) {
          console.log(err);
        }
        res.send(rows);
      });
    });
  });;
}); 

// Post for Create Account page
app.post('/api/create-account/', (req,res) => {
  let credentials = req.body;
  console.log(credentials);

  let sql = `SELECT * FROM Credentials WHERE Username = '${credentials.username}';`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    
    // Check for existing username
    if (rows[0] != null) {
      res.send({successful: false, userId: 0});
    } else {
      // Put values into Users and Credentials tables (unique UserId != 0)
      db.run(`INSERT INTO Users(Name, Member, Staff) VALUES ('${credentials.name}', ${credentials.isMember}, ${credentials.isStaff})`)
        .all(`SELECT * FROM Users WHERE Name = '${credentials.name}' AND Member = ${credentials.isMember} AND Staff = ${credentials.isStaff}`, (err, rows) => {
          // TODO: Better way to select row after creation?
          if (err) {
            throw err;
          }
          if (rows[0] == null) {
            console.log('Credential was accessed before created.');
          } else {
            var id = rows[0].UserId;
	    // Create corresponding entry in Credentials table
            db.run(`INSERT INTO Credentials(Username, Password, UserId) VALUES ('${credentials.username}', '${credentials.password}', ${id})`).all(`SELECT * FROM Credentials WHERE UserId = ${id}`, (err, rows) => {
              if (err) {
                console.log(err);
	      }
              res.send({successful: true, userId: id});
            });
          }
      });
    }
  });
})

// Get enrollments for Programs page
app.get('/api/enrollments/', (req, res) => {
  let sql = `SELECT p.ProgramId, Count(e.programId) AS NumOfEnrollments FROM Programs p JOIN Enrollments e ON e.ProgramId = p.ProgramId GROUP BY p.ProgramId`;
  let enrollments = [];

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
    }

    let i = 0;
    rows.forEach((row) => {
      enrollments[i] = row;
      i++
    });

    res.send(enrollments);
  });
});

// Post for updating credentials on Profile page
app.post('/api/save-account-info/', (req, res) => {
  db.run(`UPDATE Users SET Member = '${req.body.isMember}', Staff = '${req.body.isStaff}' WHERE UserId = ${req.body.userId};`)
  .all(`SELECT * FROM Users WHERE UserId = ${req.body.userId};`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send({successful: true});
    }
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