CREATE DATABASE IF NOT EXISTS projectdb;
USE projectdb;

DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
	rid int PRIMARY KEY AUTO_INCREMENT ,
    name varchar(24) NOT NULL,
	age int NOT NULL,
	grade varchar(24) NOT NULL,
	rating int NOT NULL);

DROP TABLE IF EXISTS game;
CREATE TABLE game (
	gid int PRIMARY KEY AUTO_INCREMENT ,
    location varchar(48) NOT NULL,
	gdate date NOT NULL,
	gtime time NOT NULL);

DROP TABLE IF EXISTS assignment;
CREATE TABLE assignment (
	aid int PRIMARY KEY AUTO_INCREMENT ,
	position varchar(24) NOT NULL,
	rstatus varchar(24) NOT NULL,
    gid int NOT NULL REFERENCES game(gid),
	rid int NOT NULL REFERENCES referee(rid),
	UNIQUE (gid, rid)) ;
    
INSERT INTO referee (rid, name, age, grade, rating) VALUES 
(1, 'Tom Gregory', 45, 'A', 80),
(2, 'Beth Barnhart', 40, 'B', 89),
(3, 'Prof. Prabhakar', 50, 'A+', 90);
SELECT * FROM referee; 


INSERT INTO game (gid, location, gdate, gtime) VALUES 
(1, 'Bloomington', '2000-12-05', '09:30:00'),
(2, 'Chicago', '2000-12-08', '10:30:00');

SELECT * FROM game; 

INSERT INTO assignment (gid, rid, position, rstatus) VALUES 
(1, 1, 'Assistant', 'Assigned'),
(2, 2, 'Main','Unassigned'),
(3, 3, 'Main', 'Unassigned');
SELECT * FROM assignment; 

SELECT	 name, position, rstatus from referee LEFT JOIN assignment ON referee.rid = assignment.rid AND assignment.rstatus = 'unassigned' ; 
