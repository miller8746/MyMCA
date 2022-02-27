DROP TABLE Programs;

CREATE TABLE Programs (
    ProgramId      INTEGER PRIMARY KEY
                           UNIQUE
                           NOT NULL,
    Title          STRING  NOT NULL,
    OfferingPeriod STRING  NOT NULL,
    Description    STRING,
    Location       STRING  NOT NULL,
    Cost           DOUBLE  NOT NULL,
    Capacity       INT     NOT NULL,
    Instructor     INTEGER NOT NULL
                           REFERENCES Users
);

INSERT INTO Programs(Title, OfferingPeriod, Instructor, Description, Location, Cost, Capacity)
VALUES ('X-treme Cycling', date('now') + 20, 2, 'Hour long super intense workout!', 'Onalaska YMCA', 15.0, 10);

INSERT INTO Programs(Title, OfferingPeriod, Instructor, Description, Cost, Capacity, Location)
VALUES ('Yoga Flow', (date, 5, '45 min relaxing yoga session.', 12.0, 8, 'Dahl YMCA');

INSERT INTO Programs(Title, OfferingPeriod, Instructor, Description, Cost, Capacity, Location)
VALUES ('Shark', (date('now') + 30), 2, 'Learn how to swim in this four week course. Sundays at 4pm. Partipants must have completed the pike level', 96.0, 8, 'Somewhere');




select * from programs
select * from credentials

