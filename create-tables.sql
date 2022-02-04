CREATE TABLE Users (
    UserId INTEGER PRIMARY KEY
                   UNIQUE
                   NOT NULL,
    Name   STRING,
    Member BOOLEAN NOT NULL,
    Staff  BOOLEAN NOT NULL
);

CREATE TABLE Programs (
    ProgramId       INTEGER     PRIMARY KEY
                                UNIQUE
                                NOT NULL,
    Title           STRING      NOT NULL,
    OfferingPeriod  DATETIME    NOT NULL,                     
    Description     STRING,
    Cost            DOUBLE      NOT NULL, 
    Capacity        INT         NOT NULL,
    Instructor      INTEGER     NOT NULL
                                REFERENCES Users
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

CREATE TABLE Credentials (
    Username        STRING      PRIMARY KEY 
                                UNIQUE
                                NOT NULL, 
    Password        STRING      NOT NULL,
    UserId          INTEGER     NOT NULL
                                REFERENCES Users
);

