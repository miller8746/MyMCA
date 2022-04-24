/*
* File name: index.js
* Purpose: Runs the server and executes database queries
* Authors: Hannah Hunt, Heather Miller
* Date Created: 2/21/22
* Last Modified: 4/23/22
*/

// Import requirements
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json());

// Set port to localhost:3000
const port = 3000
var router = express.Router();

// Common attributes for selection
const allProgramAttributes = "ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Location, Cost, Capacity, Repetitions"
const allUserAttributes = "UserId, Name,Member, Staff"
const allCredentialAttributes = "Username, Password, UserId";

// Log in with username and password
app.get('/api/login/:user&:pass', (req, res) => {
  let username = req.params.user;
  let password = req.params.pass;
  
  let sql = `SELECT u.UserId, Name, Member, Staff 
                FROM Users u 
                JOIN Credentials c ON u.UserId = c.UserId 
                WHERE Username = '${username}' AND PASSWORD = '${password}';`

  db.get(sql, [], (err, row) => {
    if (err) {
      console.log("oopsie");
    }
	  
    res.send(row);
  });
});

/* PROGRAMS - all apis */

/* GETS */

// Get for Programs, Enrollments pages
// If a user id is specified, it will get enrolled programs, otherwise returns all programs
app.get('/api/programs/:userId/:searchTerm', (req, res) => {
  // TODO: Maybe should split these into separate API calls
  let userId = req.params.userId;
  let searchTerm = req.params.searchTerm;
   let sql = ``;
  if (userId == 'null' && searchTerm == 'null') {
    // Get all programs
    console.log('Loading all programs')
    sql = `SELECT ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Repetitions, Location
              FROM Programs
              ORDER BY OfferingPeriod ASC;`;
  } else if (searchTerm == 'null'){
    // Get user-enrolled programs
    console.log('Loading user programs for id ' + userId);
    sql = `SELECT DISTINCT Programs.ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Repetitions, Location
              FROM Programs
              INNER JOIN Enrollments ON
              Enrollments.ProgramId = Programs.ProgramId
              WHERE Enrollments.UserId = ${userId}
              ORDER BY OfferingPeriod ASC;`;
  } else if (userId == 'null') {
    // Loading all programs with search term
    console.log('Loading all programs with search term ' + searchTerm);
    sql = `SELECT ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Repetitions, Location
              FROM Programs
              WHERE Title LIKE '${searchTerm}%'
              ORDER BY OfferingPeriod ASC;`;
  } else {
    // Loading user-enrolled programs with search term
    console.log('Loading user-enrolled programs with search term ' + searchTerm);
    sql = `SELECT DISTINCT Programs.ProgramId, Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Repetitions, Location
              FROM Programs
              INNER JOIN Enrollments ON
              Enrollments.ProgramId = Programs.ProgramId
              WHERE Enrollments.UserId = ${userId} AND
              Programs.Title LIKE '${searchTerm}%'
              ORDER BY OfferingPeriod ASC;`;
  }
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
    }
    db.all(`SELECT Day, ProgramId FROM ProgramDays`, (err, days) => { // TODO: use a join here. something like
      // SELECT d.Day, p.ProgramId FROM ProgramDays d JOIN Programs p ON d.ProgramId = p.ProgramId
      if (err) {
        console.log(err);
      }
      // Match programs with their occurrence days
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
              GROUP BY p.ProgramId`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("oopsie");
    } 
    
    res.status(200).json(rows)
  });
});

// Get number of user enrollments for each program
app.get('/api/user-enrollments/:userId', (req, res) => {
  let userId = req.params.userId;
  let sql = `SELECT p.ProgramId, p.Title, p.OfferingPeriod, Count(e.programId) AS NumOfEnrollments 
              FROM Programs p JOIN Enrollments e ON e.ProgramId = p.ProgramId WHERE e.UserId = ${userId} 
              GROUP BY p.ProgramId`

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log("oopsie");
    } 
    
    res.status(200).json(rows);
  });
});

// Get time conflict
app.get('api/timeConflict/:programId/:userId', (req, res) => {
  let programId = req.params.programId;
  let userId = req.params.userId;
  let hasConflict = false;

  let sql = `SELECT ${allProgramAttributes}
              FROM Programs 
              WHERE ProgramId = ${programId}`;

  db.all(sql, [], (err, newProgram) => {
      if( er ){
        console.log("Something happened.");
      }

     sql = `SELECT p.ProgramId, OfferingPeriod, OfferingPeriodEnd, Repetitions
              FROM Programs p JOIN Enrollments e 
                ON e.ProgramId = p.ProgramId 
              WHERE e.UserId = ${userId};`;

      db.all(sql, [], (err, allEnrollments) => {
        
        allEnrollments.forEach(program => { 
            for(let i = 0; i < program['Repetitions']; i++){
                var newProgramDateStart = new Date(newProgram['OfferingPeriod']);
                newProgramDateStart.setDate(newProgramDateStart.getDate() + i);

                var newProgramDateEnd = new Date(newProgram['OfferingPeriodEnd']);
                newProgramDateEnd.setDate(newProgramDateEnd.getDate() + i);

                var currentProgramDateStart = new Date(program['OfferingPeriod']);
                currentProgramDateStart.setDate(currentProgramDateStart.getDate() + i);

                var currentProgramDateEnd = new Date(program['OfferingPeriodEnd']);
                currentProgramDateEnd.setDate(currentProgramDateStart.getDate() + i);

                hasConflict = newProgramDateStart == currentProgramDateStart &&
                        newProgramDateStart.getHours() >= currentProgramDateStart.getHours() && newProgramDateStart <= currentProgramDateEnd &&
                        currentProgramDateStart.getHours >= newProgramDateStart.getHours() && currentProgramDateStart <= newProgramDateEnd;

            }
        });

        return hasConflict;
      });
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
app.post('/api/users/:userId/enrollments/:programId/', (req, res) => {
  const userId = req.params.userId;
  const programId = req.params.programId;
  db.run(`INSERT INTO Enrollments(UserId, ProgramId, Active) 
          VALUES(${userId}, ${programId}, 1);`)
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

// Post for Edit Program page
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

/* USERS - all apis */

/* GETS */

// Get for Users page
app.get('/api/users/:searchTerm', (req, res) => {
  let searchTerm = req.params.searchTerm;
  let sql = ``;
  if (searchTerm == 'null') {
    // Get all users
    console.log('Getting all users');
    sql = `SELECT ${allUserAttributes} FROM Users`;
  } else {
    // Get users that match the search term
    console.log(`Getting users that match ${searchTerm}`);
    sql = `SELECT ${allUserAttributes} FROM Users WHERE Name LIKE '${searchTerm}%'`;
  }
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
            db.run(`INSERT INTO Credentials(Username, Password, UserId) VALUES ('${credentials.username}', '${credentials.password}', ${id})`).all(`SELECT ${allCredentialAttributes} FROM Credentials WHERE UserId = ${id}`, (err, rows) => {
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
  console.log('Connected to the MyMCA database.'); // REMOVE FOR PROD
});