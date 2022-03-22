DROP TABLE Programs;
DROP TABLE ProgramDays;

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

INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location)
VALUES ('X-treme Cycling', '2022-07-06T07:00', '2022-07-06T08:00', 2, 'Hour long super intense workout!', 15.0, 10, 'Onalaska YMCA');

INSERT INTO Programs(Title, OfferingPeriod, OfferingPeriodEnd, Instructor, Description, Cost, Capacity, Location)
VALUES ('Yoga Flow', '2022-07-07T07:00', '2022-07-07T08:00', 5, '45 min relaxing yoga session.', 12.0, 8, 'Dahl YMCA');

INSERT INTO ProgramDays(ProgramId, Day) VALUES (1, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Monday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Wednesday');
INSERT INTO ProgramDays(ProgramId, Day) VALUES (2, 'Friday');