DROP DATABASE IF EXISTS `study_buddy`;
CREATE DATABASE `study_buddy`;
USE `study_buddy`;

CREATE TABLE User (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    year INT,
    name VARCHAR(100),
    email VARCHAR(100),
    contact_info VARCHAR(100),
    buddy_username VARCHAR(50),	
    FOREIGN KEY (buddy_username) REFERENCES User(username)
);

CREATE TABLE Course (
    courseID INT PRIMARY KEY,
    instructor VARCHAR(100)
);

CREATE TABLE StudyGroup (
    groupID INT PRIMARY KEY,
    courseID INT,
    FOREIGN KEY (courseID) REFERENCES Course(courseID)
);

CREATE TABLE Enrollment (
    username VARCHAR(50),
    courseID INT,
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
    PRIMARY KEY (username, courseID)
);

CREATE TABLE Assignment (
    username VARCHAR(50),
    groupID INT,
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (groupID) REFERENCES StudyGroup(groupID),
    PRIMARY KEY (username, groupID)
);

CREATE TABLE Join_Group (
    username VARCHAR(50),
    groupID INT,
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (groupID) REFERENCES StudyGroup(groupID),
    PRIMARY KEY (username, groupID)
);

INSERT INTO User (username, password, year, name, email, contact_info)
VALUES 
    ('user1', 'password1', 2023, 'John Doe', 'john@example.com', '123-456-7890'),
    ('user2', 'password2', 2022, 'Alice Smith', 'alice@example.com', '987-654-3210'),
    ('user3', 'password3', 2023, 'Bob Johnson', 'bob@example.com', '456-123-7890');

INSERT INTO Course (courseID, instructor)
VALUES 
    (4350, 'Dr. Smith'),
    (4270, 'Prof. Johnson');

INSERT INTO StudyGroup (groupID, courseID)
VALUES 
    (1, 4350),
    (2, 4270);

INSERT INTO Assignment (username, groupID)
VALUES 
    ('user1', 1),
    ('user2', 2),
    ('user3', 1);

INSERT INTO Join_Group (username, groupID)
VALUES 
    ('user1', 1),
    ('user2', 2),
    ('user3', 1);






