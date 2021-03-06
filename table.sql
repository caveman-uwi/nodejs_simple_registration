CREATE TABLE _USERS(
	USERID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	USERNAME VARCHAR(50) UNIQUE NOT NULL, 
	FIRSTNAME VARCHAR(50) NOT NULL, 
	LASTNAME  VARCHAR(50) NOT NULL, 
	EMAIL VARCHAR(100) UNIQUE NOT NULL, 
	PASSWORD VARCHAR(100) NOT NULL, 
	SALT INT
) AUTO_INCREMENT=15034;

CREATE TABLE _STUDENTS(
	COURSEID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	USERNAME VARCHAR(50) UNIQUE NOT NULL, 
	FIRSTNAME VARCHAR(50) NOT NULL, 
	LASTNAME  VARCHAR(50) NOT NULL, 
	DOB DATE  NOT NULL, 
	TELE LONG NOT NULL, 
	GENDER VARCHAR(20) NOT NULL, 
	ADDRESS VARCHAR(200),
	COURSES VARCHAR(200)
) AUTO_INCREMENT=81034;