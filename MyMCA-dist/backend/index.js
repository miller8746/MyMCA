/*
* File name: index.js
* Purpose: Runs the server and executes database queries
* Authors: Hannah Hunt, Heather Miller
* Date Created: 2/21/22
* Last Modified: 5/1/22
*/

// Import requirements
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const hash = require('object-hash')
app.use(cors())
app.use(bodyParser.json());

// Set port to localhost:3000
const port = 3000
var router = express.Router();

// Common attributes for selection
const allProgramAttributes = "ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Location, Cost, Capacity, Repetitions, Active"
const allUserAttributes = "UserId, Name,Member, Staff, Active"
const allCredentialAttributes = "Username, Password, UserId";

// Log in with username and password
app.get('/api/login/:user&:pass', (req, res) => {
  let username = req.params.user;
  let password = req.params.pass;
  var hashPswd = hash({pswd: password});

  let sql = `SELECT u.UserId, Name, Member, Staff, Active
                FROM Users u 
                JOIN Credentials c ON u.UserId = c.UserId 
                WHERE Username = '${username}' AND PASSWORD = '${hashPswd}';`

  db.get(sql, [], (err, row) => {
    if (err) {
      console.log(err);
    }
    
    // Send different results if account does not exist, account is deactivated, or account is valid
    if (row == null) {
      res.send('');
    } else if (row.Active == 0) {
      res.send('inactive');
    } else {
      res.send(row);
    }
  });
});

/* PROGRAMS - all apis */

/* GETS */
app.get('/api/programs/search=:searchTerm', (req, res) => {
  var searchTerm = req.params.searchTerm == 0 ? '%' : req.params.searchTerm;

  sql = `SELECT p.ProgramId, p.Title, p.OfferingPeriod, p.OfferingPeriodEnd, p.Description, 
                        p.Location, p.Cost, p.Capacity, p.Repetitions, p.Active
          FROM Programs p 
          WHERE p.Title LIKE '%${searchTerm}%'
          ORDER BY p.OfferingPeriod ASC
          LIMIT 100;`;

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
      res.send(rows);
    });
    });
});

app.get('/api/nondeactivatedprograms/search=:searchTerm', (req, res) => {
  var searchTerm = req.params.searchTerm == 0 ? '%' : req.params.searchTerm;

  sql = `SELECT p.ProgramId, p.Title, p.OfferingPeriod, p.OfferingPeriodEnd, p.Description, 
                        p.Location, p.Cost, p.Capacity, p.Repetitions, p.Active
          FROM Programs p 
          WHERE p.Title LIKE '%${searchTerm}%' AND p.Active == 1
          ORDER BY p.OfferingPeriod ASC
          LIMIT 100;`;

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
      res.send(rows);
    });
  });
});

// Get programs for Enrollments page
// Gets a user's enrolled programs and optionally filters by search term
app.get('/api/users/:userId/programs/search=:searchTerm', (req, res) => {
  let userId = req.params.userId;
  let searchTerm = req.params.searchTerm == 0 ? '%' : req.params.searchTerm;

  let sql = `SELECT DISTINCT p.ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Repetitions, Location, p.Active, e.FirstName
              FROM Programs p JOIN Enrollments e 
              ON e.ProgramId = p.ProgramId
              WHERE e.UserId = ${userId} AND
              p.Title LIKE '${searchTerm}%'
              ORDER BY OfferingPeriod ASC;`;
  
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
      
      res.send(rows);
    });
  });
});

// Get number of enrollments for each program
app.get('/api/enrollments/', (req, res) => {
  let sql = `SELECT p.ProgramId, Count(e.programId) AS NumOfEnrollments 
              FROM Programs p JOIN Enrollments e ON e.ProgramId = p.ProgramId 
              WHERE e.Active == 1
              GROUP BY p.ProgramId`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("oopsie");
    } 
    
    res.status(200).json(rows)
  });
});

// Get number of user enrollments for each program
app.get('/api/users/:userId/enrollments', (req, res) => {
  let userId = req.params.userId;
  let sql = `SELECT p.ProgramId, p.Title, p.OfferingPeriod, Count(e.programId) AS NumOfEnrollments 
              FROM Programs p JOIN Enrollments e ON e.ProgramId = p.ProgramId 
              WHERE e.UserId = ${userId} AND e.Active == 1
              GROUP BY p.ProgramId`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("oopsie");
    } 
    
    res.status(200).json(rows);
  });
});

// Get a single program and its days for use in the Edit Program tool
app.get('/api/edit-program/:programId', (req, res) => {
  let programId = req.params.programId;
  let sql = `SELECT * FROM Programs WHERE ProgramId = ${programId}`;
  db.get(sql, [], (err, row) => {
    if (err) { console.log(err); }
    db.all(`SELECT * FROM ProgramDays WHERE ProgramId = ${programId}`, (err, days) => {
      if (err) { console.log(err); }
      row.Days = days;
      res.send(row);
    });
  });
});

/* POSTS */
// Post for enrolling a user in a program
app.post('/api/users/:userId/enrollments/', (req, res) => {
  const userId = req.params.userId;
  const programId = req.body.ProgramId;
  const firstName = req.body.FirstName;

  console.log("first name = " + firstName + "programid = " + programId);

  db.run(`INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) 
          VALUES(${userId}, ${programId}, 1, '${firstName}');`)
    .all(`SELECT p.ProgramId, Count(e.programId) AS NumOfEnrollments 
            FROM Programs p JOIN Enrollments e ON e.ProgramId = p.ProgramId 
            GROUP BY p.ProgramId`, (err, rows) => {
              if( err ){
                console.log(error);
              } else {
                res.send(rows);
              }
    });
}); 

// Post for Create Programs page
app.post(`/api/programs/`, (req, res) => {
  let program = req.body;

  console.log(program);

  db.run(`INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Repetitions, Description, Location, Cost, Capacity, Active) 
            VALUES ('${program.programTitle}', '${program.programOfferingPeriod}', '${program.programOfferingPeriodEnd}', ${program.programRepetitions}, '${program.programDescription}', '${program.programLocation}', ${program.programCost}, ${program.programCapacity}, 1);`)
  .all(`SELECT ${allProgramAttributes} 
          FROM Programs 
          WHERE Title = '${program.programTitle}' AND 
                OfferingPeriod = '${program.programOfferingPeriod}' AND 
                OfferingPeriodEnd = '${program.programOfferingPeriodEnd}' AND 
                Repetitions = '${program.programRepetitions}' AND
                Description = '${program.programDescription}' AND 
                Location = '${program.programLocation}' AND 
                Cost = ${program.programCost} AND 
                Capacity = ${program.programCapacity}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    db.serialize(() => {
      var i = 0;
      for (i = 0; i < program.programDays.length; i++) {
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

// Post for Edit Program page (save)
app.post(`/api/edit-program/`, (req, res) => {
  let program = req.body;

  console.log(program);
  console.log('Saving program');
  // Force queries to run sequentially
  db.serialize(() => {
    db.run(`UPDATE Programs SET Title = '${program.programTitle}', OfferingPeriod = '${program.programOfferingPeriod}', OfferingPeriodEnd = '${program.programOfferingPeriodEnd}', Repetitions = ${program.programRepetitions}, Description = '${program.programDescription}', Location = '${program.programLocation}', Cost = ${program.programCost}, Capacity = ${program.programCapacity} WHERE ProgramId = ${program.programId};`).run(`DELETE FROM ProgramDays WHERE ProgramId = ${program.programId};`);
    
    console.log('Updated program and deleted old days');
    
    // Add new program days
    var i = 0;
    for (i = 0; i < program.programDays.length; i++) {
      console.log('Adding day ' + program.programDays[i]);
      db.run(`INSERT INTO ProgramDays(ProgramId, Day) VALUES (${program.programId}, '${program.programDays[i]}');`);
    }
    console.log('Should be finished');
    res.status(200).send(true);
  });
});

// Post for Edit Program page (deactivation)
app.post(`/api/deactivate-program/:programId`, (req, res) => {
  let programId = req.params.programId;

  console.log('Deactivating program ' + programId);
  // Set Program Active to false
  db.run(`UPDATE Programs SET Active = 0 WHERE ProgramId = ${programId}`);
  // Set Enrollments Active to false
  db.run(`UPDATE Enrollments SET Active = 0 WHERE ProgramId = ${programId}`);

  res.status(200).send(true);
});

/* USERS - all apis */

/* GETS */

// Get for Users page
app.get('/api/users/search=:searchTerm', (req, res) => {
  var searchTerm = req.params.searchTerm == 0 ? '%' : req.params.searchTerm;
  
  console.log(`Getting users that match ${searchTerm}`);
  let sql = `SELECT ${allUserAttributes} FROM Users WHERE Name LIKE '${searchTerm}%'`;
  
  db.all(sql, [], (err, rows) => {
    if (err) { console.log(err); }
    res.send(rows);
  });
});

/* POSTS */

// Post for updating credentials on Profile page
app.post('/api/account-info/', (req, res) => {
  db.run(`UPDATE Users SET Member = '${req.body.isMember}', Staff = '${req.body.isStaff}' WHERE UserId = ${req.body.userId};`)
  .all(`SELECT ${allUserAttributes} FROM Users WHERE UserId = ${req.body.userId};`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send({successful: true});
    }
  });
});

// Post for Create Account page
app.post('/api/account/', (req,res) => {
  let credentials = req.body;

  let sql = `SELECT ${allCredentialAttributes} FROM Credentials WHERE Username = '${credentials.username}';`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    
    // Check for existing username
    if (rows[0] != null) {
      res.send({successful: false, userId: 0});
    } else {
      // Put values into Users and Credentials tables (unique UserId != 0)
      db.run(`INSERT INTO Users(Name, Member, Staff, Active) VALUES ('${credentials.name}', ${credentials.isMember}, ${credentials.isStaff}, 1)`)
        .all(`SELECT ${allUserAttributes} FROM Users WHERE Name = '${credentials.name}' AND Member = ${credentials.isMember} AND Staff = ${credentials.isStaff}`, (err, rows) => {
          // TODO: Better way to select row after creation?
          if (err) {
            throw err;
          }
          if (rows[0] == null) {
            console.log('Credential was accessed before created.');
          } else {
            var id = rows[0].UserId;
	    // Create corresponding entry in Credentials table
            var hashPswd = hash({pswd: credentials.password});
            console.log('Password hashed as ' + hashPswd);
            db.run(`INSERT INTO Credentials(Username, Password, UserId) VALUES ('${credentials.username}', '${hashPswd}', ${id})`).all(`SELECT ${allCredentialAttributes} FROM Credentials WHERE UserId = ${id}`, (err, rows) => {
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

//POST to soft delete account
app.post('/api/account/delete', (req, res) => {
  let userId = req.body.userId;

  let updateUsers = `UPDATE Users 
              SET Active = 0
              WHERE UserId = '${userId}';`;

  let updateEnrollments = `UPDATE Enrollments 
              SET Active = 0 
              WHERE UserId = '${userId}';`;

  db.run(updateUsers)
      .run(updateEnrollments)
      .all(`SELECT ${allUserAttributes} FROM Users`, (err, rows) => {
        if( err ){
          console.log(error);
        } else {
          console.log(rows);
          res.send(rows);
        }
      });
});


// OTHER

app.listen(port, () => {
  console.log(`MyMCA backend listening on port ${port}`) // REMOVE FOR PROD
})

// DB Connection

const sqlite3 = require('sqlite3').verbose();

var dbPath = "../db/cs341-ymca.db";

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
});