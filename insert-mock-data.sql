-- INSERTING 5 FAKE USERS -----------
INSERT INTO Users(Name, Member, Staff)
VALUES ('Susan', True, False);

INSERT INTO Users(Name, Member, Staff)
VALUES ('Bob H.', True, True);

INSERT INTO Users(Name, Member, Staff)
VALUES ('John Smith.', False, False);

INSERT INTO Users(Name, Member, Staff)
VALUES ('Sally Winters', True, False);

INSERT INTO Users(Name, Member, Staff)
VALUES ('Greg P.', True, True);

-- INSERTING 2 Programs --
INSERT INTO Programs(Title, OfferingPeriod, Instructor, Description, Cost, Capacity)
VALUES ('X-treme Cycling', date('now') + 2, 2, 'Hour long super intense workout!', 15.0, 10);

INSERT INTO Programs(Title, OfferingPeriod, Instructor, Description, Cost, Capacity)
VALUES ('Yoga Flow', (date('now') + 7), 5, '45 min relaxing yoga session.', 12.0, 8);

-- INSERTING 5 ENROLLMENTS --
INSERT INTO Enrollments(UserId, ProgramId)
VALUES(1, 1);

INSERT INTO Enrollments(UserId, ProgramId)
VALUES(5, 1);

INSERT INTO Enrollments(UserId, ProgramId)
VALUES(3, 1);

INSERT INTO Enrollments(UserId, ProgramId)
VALUES(1, 2);

INSERT INTO Enrollments(UserId, ProgramId)
VALUES(4, 2);

