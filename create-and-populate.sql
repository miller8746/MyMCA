DROP TABLE Enrollments;
DROP TABLE ProgramDays;
DROP TABLE Programs;
DROP TABLE Credentials;
DROP TABLE Users;

CREATE TABLE Users (
    UserId INTEGER PRIMARY KEY
                   UNIQUE
                   NOT NULL,
    Name   STRING,
    Member BOOLEAN NOT NULL,
    Staff  BOOLEAN NOT NULL
);

CREATE TABLE Credentials (
    Username        STRING      PRIMARY KEY 
                                UNIQUE
                                NOT NULL, 
    Password        STRING      NOT NULL,
    UserId          INTEGER     NOT NULL
                                REFERENCES Users
);

CREATE TABLE Programs (
    ProgramId      INTEGER PRIMARY KEY
                              UNIQUE
                              NOT NULL,
    Title             STRING  NOT NULL,
    OfferingPeriod    STRING  NOT NULL,
    OfferingPeriodEnd STRING  NOT NULL,
    Description       STRING,
    Location          STRING  NOT NULL,
    Cost              DOUBLE  NOT NULL,
    Capacity          INT     NOT NULL,
    Repetitions       INT     NOT NULL,
    Instructor        INTEGER NOT NULL
                              REFERENCES Users
);

CREATE TABLE ProgramDays (
    ProgramDayId   INTEGER PRIMARY KEY
			      UNIQUE
			      NOT NULL,
    ProgramId         INTEGER NOT NULL
                              REFERENCES Programs,
    Day               STRING  NOT NULL
);

CREATE TABLE Enrollments (
    EnrollmentId    INTEGER     PRIMARY KEY 
                                UNIQUE
                                NOT NULL, 
    UserId          INTEGER     NOT NULL
                                REFERENCES Users,
    ProgramId       INTEGER     NOT NULL
                                REFERENCES Programs
);

INSERT INTO Users(UserId, Name, Member, Staff) VALUES (1, 'Susan', 1, 0);
INSERT INTO Users(UserId, Name, Member, Staff) VALUES (2, 'Bob H.', 1, 1);
INSERT INTO Users(UserId, Name, Member, Staff) VALUES (3, 'Jane Doe', 1, 0);
INSERT INTO Users(UserId, Name, Member, Staff) VALUES (4, 'Luke Anderson', 1, 0);

INSERT INTO Credentials(Username, Password, UserId) VALUES ('susan', '123', 1);
INSERT INTO Credentials(Username, Password, UserId) VALUES ('bobby', 'abc', 2);
INSERT INTO Credentials(Username, Password, UserId) VALUES ('jdoe', 'jdoe', 3);
INSERT INTO Credentials(Username, Password, UserId) VALUES ('landerson', 'landerson', 4);

INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location, Repetitions)
VALUES ('X-treme Cycling', '2022-07-06T07:00', '2022-07-06T08:00', 2, 'Hour long super intense workout!', 15.0, 10, 'Onalaska YMCA', 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location, Repetitions)
VALUES ('Yoga Flow', '2022-07-07T07:00', '2022-07-07T08:00', 2, '45 min relaxing yoga session.', 12.0, 8, 'Dahl YMCA', 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location, Repetitions)
VALUES ('Shark', '2022-04-17T17:00', '2022-05-15T17:40', 2, 'This program requires the pike level to be passed.', 96.0, 8, 'YMCA Onalaska Pool', 4);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location, Repetitions)
VALUES ('Shark', '2022-04-17T18:00', '2022-05-15T18:40', 2, 'This program requires the pike level to be passed.', 130.0, 8, 'YMCA Onalaska Pool', 4);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location, Repetitions)
VALUES ('Log Rolling', '2022-04-17T17:00', '2022-05-15T17:40', 2, 'No prerequisites.  Learn the technique of log rolling!', 200.0, 1, 'YMCA Onalaska Pool', 4);

INSERT INTO ProgramDays(ProgramId, Day) VALUES (1, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Wednesday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Friday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (3, 'Thursday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (4, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (4, 'Wednesday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (5, 'Thursday');

INSERT INTO Enrollments(UserId, ProgramId) VALUES (3, 3);
INSERT INTO Enrollments(UserId, ProgramId) VALUES (3, 5);
INSERT INTO Enrollments(UserId, ProgramId) VALUES (4, 4);