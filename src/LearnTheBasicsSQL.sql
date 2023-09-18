﻿DROP DATABASE IF EXISTS LearnTheBasics;

CREATE DATABASE LearnTheBasics
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE LearnTheBasics;


CREATE TABLE cpuTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

CREATE TABLE gpuTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

CREATE TABLE ramTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

CREATE TABLE stgTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

/*Savedata*/
CREATE TABLE savedata (
  id int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  saveId tinyint(4) NOT NULL,
  lvl tinyint(4) DEFAULT -1,
  money int(11) DEFAULT 0,
  time int(11) DEFAULT 0,
  cpuId tinyint(4) DEFAULT 0,
  gpuId tinyint(4) DEFAULT 0,
  ramId tinyint(4) DEFAULT 0,
  stgId tinyint(4) DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (cpuId) REFERENCES cpuTbl(hardwareId),
  FOREIGN KEY (gpuId) REFERENCES gpuTbl(hardwareId),
  FOREIGN KEY (ramId) REFERENCES ramTbl(hardwareId),
  FOREIGN KEY (stgId) REFERENCES stgTbl(hardwareId)
)ENGINE = INNODB;

CREATE TABLE userTbl (
  uid int NOT NULL AUTO_INCREMENT,
  name varchar(25) NOT NULL,
  password varchar(25) NOT NULL,
  PRIMARY KEY (uid)
)ENGINE = INNODB;

CREATE TABLE login (
  id int(11) AUTO_INCREMENT NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  PRIMARY KEY (id)
)ENGINE = INNODB;


INSERT INTO cpuTbl VALUES
(0, 'Z3', '3400 3.1GHz 2core', 'InkWell' ),
(1, 'Z5', '6500 2.8GHz 4core/4thread', 'InkWell'),
(2, 'Z7', '9800P 3.8GHz 8core/16thread', 'InkWell'),
(3, 'Z9', '12990P 4.9GHz 16core/32thread', 'InkWell');

INSERT INTO gpuTbl VALUES
(0, 'DT', '620 1GB GDDR3', 'MediaVideo' ),
(1, 'DTX', '1150 2GB GDDR4', 'MediaVideo'),
(2, 'ETX', '2260 6GB GDDR5', 'MediaVideo'),
(3, 'ETX', '12990P 4.9GHz 16core/32thread', 'MediaVideo');

INSERT INTO ramTbl VALUES
(0, '8GB', 'DDR4 1600MHz', 'Tungsten Curie' ),
(1, '16GB', 'DDR4 2133MHz', 'Tungsten Curie'),
(2, '32GB', 'DDR4 2666MHz', 'Tungsten Curie'),
(3, '64GB', 'DDR4 3200MHz', 'Tungsten Curie');

INSERT INTO stgTbl VALUES
(0, '250GB HDD', '5400rpm', 'SeeGait Bermuda' ),
(1, '500GB HDD', '7200rpm', 'SeeGait Bermuda'),
(2, '500GB SSD', '200MB/s', 'DanTsung 710Evolution'),
(3, '1TB SSD', '520MB/s', 'DanTsung 710Evolution');

INSERT INTO userTbl (uid, name, password)
  VALUES (0, 'admin', 'admin');

INSERT INTO savedata VALUES
  (0, 0, 1, -1, 0, 0, 0, 0, 0, 0),
  (0, 0, 2, -1, 0, 0, 0, 0, 0, 0),
  (0, 0, 3, -1, 0, 0, 0, 0, 0, 0);

INSERT INTO login (username, password) VALUES
('adminUSR', 'adminPASSWD');



--
-- Script was generated by Devart dbForge Studio 2022 for MySQL, Version 9.1.21.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2023. 09. 18. 17:20:51
-- Server version: 10.4.28
-- Client version: 4.1
--
DROP DATABASE IF EXISTS LearnTheBasics;

CREATE DATABASE LearnTheBasics
	CHARACTER SET utf8mb4
	COLLATE utf8mb4_hungarian_ci;

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE LearnTheBasics;

--
-- Drop table `login`
--
DROP TABLE IF EXISTS login;

--
-- Drop table `usertbl`
--
DROP TABLE IF EXISTS usertbl;

--
-- Drop table `savedata`
--
DROP TABLE IF EXISTS savedata;

--
-- Drop table `cputbl`
--
DROP TABLE IF EXISTS cputbl;

--
-- Drop table `gputbl`
--
DROP TABLE IF EXISTS gputbl;

--
-- Drop table `ramtbl`
--
DROP TABLE IF EXISTS ramtbl;

--
-- Drop table `stgtbl`
--
DROP TABLE IF EXISTS stgtbl;

--
-- Set default database
--
USE LearnTheBasics;

--
-- Create table `stgtbl`
--
CREATE TABLE stgtbl (
  hardwareId TINYINT(4) NOT NULL,
  name VARCHAR(50) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  company VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

--
-- Create table `ramtbl`
--
CREATE TABLE ramtbl (
  hardwareId TINYINT(4) NOT NULL,
  name VARCHAR(50) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  company VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

--
-- Create table `gputbl`
--
CREATE TABLE gputbl (
  hardwareId TINYINT(4) NOT NULL,
  name VARCHAR(50) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  company VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

--
-- Create table `cputbl`
--
CREATE TABLE cputbl (
  hardwareId TINYINT(4) NOT NULL,
  name VARCHAR(50) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  company VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

--
-- Create table `savedata`
--
CREATE TABLE savedata (
  id INT(11) NOT NULL AUTO_INCREMENT,
  userId INT(11) NOT NULL,
  saveId TINYINT(4) NOT NULL,
  lvl TINYINT(4) DEFAULT -1,
  money INT(11) DEFAULT 0,
  time INT(11) DEFAULT 0,
  cpuId TINYINT(4) DEFAULT 0,
  gpuId TINYINT(4) DEFAULT 0,
  ramId TINYINT(4) DEFAULT 0,
  stgId TINYINT(4) DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 4,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE savedata 
  ADD CONSTRAINT savedata_ibfk_1 FOREIGN KEY (cpuId)
    REFERENCES cputbl(hardwareId);

--
-- Create foreign key
--
ALTER TABLE savedata 
  ADD CONSTRAINT savedata_ibfk_2 FOREIGN KEY (gpuId)
    REFERENCES gputbl(hardwareId);

--
-- Create foreign key
--
ALTER TABLE savedata 
  ADD CONSTRAINT savedata_ibfk_3 FOREIGN KEY (ramId)
    REFERENCES ramtbl(hardwareId);

--
-- Create foreign key
--
ALTER TABLE savedata 
  ADD CONSTRAINT savedata_ibfk_4 FOREIGN KEY (stgId)
    REFERENCES stgtbl(hardwareId);

--
-- Create table `usertbl`
--
CREATE TABLE usertbl (
  uid INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  PRIMARY KEY (uid)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

--
-- Create table `login`
--
CREATE TABLE login (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

-- 
-- Dumping data for table stgtbl
--
INSERT INTO stgtbl VALUES
(0, '250GB HDD', '5400rpm', 'SeeGait Bermuda'),
(1, '500GB HDD', '7200rpm', 'SeeGait Bermuda'),
(2, '500GB SSD', '200MB/s', 'DanTsung 710Evolution'),
(3, '1TB SSD', '520MB/s', 'DanTsung 710Evolution');

-- 
-- Dumping data for table ramtbl
--
INSERT INTO ramtbl VALUES
(0, '8GB', 'DDR4 1600MHz', 'Tungsten Curie'),
(1, '16GB', 'DDR4 2133MHz', 'Tungsten Curie'),
(2, '32GB', 'DDR4 2666MHz', 'Tungsten Curie'),
(3, '64GB', 'DDR4 3200MHz', 'Tungsten Curie');

-- 
-- Dumping data for table gputbl
--
INSERT INTO gputbl VALUES
(0, 'DT', '620 1GB GDDR3', 'MediaVideo'),
(1, 'DTX', '1150 2GB GDDR4', 'MediaVideo'),
(2, 'ETX', '2260 6GB GDDR5', 'MediaVideo'),
(3, 'ETX', '12990P 4.9GHz 16core/32thread', 'MediaVideo');

-- 
-- Dumping data for table cputbl
--
INSERT INTO cputbl VALUES
(0, 'Z3', '3400 3.1GHz 2core', 'InkWell'),
(1, 'Z5', '6500 2.8GHz 4core/4thread', 'InkWell'),
(2, 'Z7', '9800P 3.8GHz 8core/16thread', 'InkWell'),
(3, 'Z9', '12990P 4.9GHz 16core/32thread', 'InkWell');

-- 
-- Dumping data for table usertbl
--
INSERT INTO usertbl VALUES
(1, 'admin', 'admin');

-- 
-- Dumping data for table savedata
--
INSERT INTO savedata VALUES
(1, 0, 1, -1, 0, 0, 0, 0, 0, 0),
(2, 0, 2, -1, 0, 0, 0, 0, 0, 0),
(3, 0, 3, -1, 0, 0, 0, 0, 0, 0);

-- 
-- Dumping data for table login
--
INSERT INTO login VALUES
(1, 'adminUSR', 'adminPASSWD');

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;