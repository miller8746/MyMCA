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
    Staff  BOOLEAN NOT NULL,
    Active BOOLEAN NOT NULL
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
    Active            BOOLEAN NOT NULL
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
                                REFERENCES Programs,
    Active          BOOLEAN     NOT NULL,
    FirstName       STRING      NOT NULL
);

INSERT INTO Users(UserId, Name, Member, Staff, Active) VALUES (1, 'Susan', 1, 0, 1);
INSERT INTO Users(UserId, Name, Member, Staff, Active) VALUES (2, 'Bob H.', 1, 1, 1);
INSERT INTO Users(UserId, Name, Member, Staff, Active) VALUES (3, 'Jane Doe', 1, 0, 1);
INSERT INTO Users(UserId, Name, Member, Staff, Active) VALUES (4, 'Luke Anderson', 1, 0, 1);

INSERT INTO Credentials(Username, Password, UserId) VALUES ('susan', '5fbe0a2db6146918c3df5139fb78dff44e40b06e', 1);  /* Password is '123' */
INSERT INTO Credentials(Username, Password, UserId) VALUES ('bobby', '81600936764f8f0c8d587032114425e934b0c67f', 2);  /* Password is 'abc' */
INSERT INTO Credentials(Username, Password, UserId) VALUES ('jdoe', '80363019802f096f6da687aad439e1d982a5d963', 3);  /* Password is 'jdoe' */
INSERT INTO Credentials(Username, Password, UserId) VALUES ('landerson', 'aaa86131a8b5335797c211a3c2601b844879004b', 4);  /* Password is 'landerson' */

INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('X-treme Cycling', '2022-07-06T07:00', '2022-07-06T08:00', 'Hour long super intense workout!', 15.0, 10, 'Onalaska YMCA', 1, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Yoga Flow', '2022-07-07T07:00', '2022-07-07T08:00', '45 min relaxing yoga session.', 12.0, 8, 'Dahl YMCA', 1, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Shark', '2022-04-17T17:00', '2022-05-15T17:40', 'This program requires the pike level to be passed.', 96.0, 8, 'YMCA Onalaska Pool', 4, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Shark', '2022-04-17T18:00', '2022-05-15T18:40', 'This program requires the pike level to be passed.', 130.0, 8, 'YMCA Onalaska Pool', 4, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Log Rolling', '2022-04-17T17:00', '2022-05-15T17:40', 'No prerequisites.  Learn the technique of log rolling!', 200.0, 1, 'YMCA Onalaska Pool', 4, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Shark', '2022-03-13T17:00', '2022-05-22T17:40', 'This program requires the pike level to be passed.', 96.0, 8, 'YMCA Onalaska Pool', 9, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Shark', '2022-05-22T17:00', '2022-06-26T17:40', 'This program requires the pike level to be passed.', 96.0, 8, 'YMCA Onalaska Pool', 5, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Shark', '2022-05-22T18:00', '2022-06-26T18:40', 'This program requires the pike level to be passed.', 200.0, 8, 'YMCA Onalaska Pool', 5, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Log Rolling', '2022-05-22T17:00', '2022-06-26T17:40', 'No prerequisites.', 200.0, 1, 'YMCA Onalaska Pool', 5, 1);
INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Description, Cost, Capacity, Location, Repetitions, Active)
VALUES ('Log Rolling', '2022-05-22T18:00', '2022-06-26T18:40', 'No prerequisites.', 200.0, 2, 'YMCA Onalaska Pool', 5, 1);

INSERT INTO ProgramDays(ProgramId, Day) VALUES (1, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Wednesday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Friday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (3, 'Thursday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (4, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (4, 'Wednesday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (5, 'Thursday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (6, 'Sunday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (7, 'Sunday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (8, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (8, 'Wednesday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (9, 'Sunday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (10, 'Monday');

INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (3, 3, 1, 'Jane');
INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (3, 5, 1, 'Jane');
INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (3, 7, 1, 'Jane');
INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (3, 10, 1, 'Jane');
INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (4, 8, 1, 'Luke');
INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (4, 9, 1, 'Luke');
INSERT INTO Enrollments(UserId, ProgramId, Active, FirstName) VALUES (4, 10, 1, 'Aini');