--
-- File generated with SQLiteStudio v3.3.3 on Tue Mar 1 18:22:03 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Credentials
CREATE TABLE Credentials (
    Username STRING  PRIMARY KEY
                     UNIQUE
                     NOT NULL,
    Password STRING  NOT NULL,
    UserId   INTEGER NOT NULL
                     REFERENCES Users (UserId) 
);

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'susan',
                            123,
                            1
                        );

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'bobby',
                            'abc',
                            2
                        );

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'jsmith',
                            'password',
                            3
                        );

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'snowman',
                            'frosty',
                            4
                        );

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'dudegreg',
                            'blahblah',
                            5
                        );

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'nonmem',
                            'nonmem',
                            7
                        );

INSERT INTO Credentials (
                            Username,
                            Password,
                            UserId
                        )
                        VALUES (
                            'member',
                            'member',
                            6
                        );


-- Table: Enrollments
CREATE TABLE Enrollments (
    EnrollmentId INTEGER PRIMARY KEY
                         UNIQUE
                         NOT NULL,
    UserId       INTEGER NOT NULL
                         REFERENCES Users,
    ProgramId    INTEGER NOT NULL
                         REFERENCES Programs (ProgramId) 
);

INSERT INTO Enrollments (
                            EnrollmentId,
                            UserId,
                            ProgramId
                        )
                        VALUES (
                            1,
                            1,
                            1
                        );

INSERT INTO Enrollments (
                            EnrollmentId,
                            UserId,
                            ProgramId
                        )
                        VALUES (
                            2,
                            5,
                            1
                        );

INSERT INTO Enrollments (
                            EnrollmentId,
                            UserId,
                            ProgramId
                        )
                        VALUES (
                            3,
                            3,
                            1
                        );

INSERT INTO Enrollments (
                            EnrollmentId,
                            UserId,
                            ProgramId
                        )
                        VALUES (
                            4,
                            1,
                            2
                        );

INSERT INTO Enrollments (
                            EnrollmentId,
                            UserId,
                            ProgramId
                        )
                        VALUES (
                            5,
                            4,
                            2
                        );


-- Table: Programs
CREATE TABLE Programs (
    ProgramId         INTEGER PRIMARY KEY
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
                              REFERENCES Users (UserId) 
);

INSERT INTO Programs (
                         ProgramId,
                         Title,
                         OfferingPeriod,
                         OfferingPeriodEnd,
                         Description,
                         Location,
                         Cost,
                         Capacity,
                         Instructor
                     )
                     VALUES (
                         1,
                         'Test Program',
                         '2022-03-01T19:16',
                         '2022-03-01T20:16',
                         'A simple test program.',
                         'N/A',
                         20.0,
                         10,
                         2
                     );


-- Table: Users
CREATE TABLE Users (
    UserId INTEGER PRIMARY KEY
                   UNIQUE
                   NOT NULL,
    Name   STRING,
    Member BOOLEAN NOT NULL,
    Staff  BOOLEAN NOT NULL
);

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      1,
                      'Susan',
                      1,
                      0
                  );

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      2,
                      'Bob H.',
                      1,
                      1
                  );

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      3,
                      'John Smith.',
                      0,
                      0
                  );

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      4,
                      'Sally Winters',
                      1,
                      0
                  );

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      5,
                      'Greg P.',
                      1,
                      1
                  );

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      6,
                      'Jane Doe',
                      1,
                      0
                  );

INSERT INTO Users (
                      UserId,
                      Name,
                      Member,
                      Staff
                  )
                  VALUES (
                      7,
                      'Luke Anderson',
                      0,
                      0
                  );


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
