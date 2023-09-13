DROP DATABASE IF EXISTS LearnTheBasics;

CREATE DATABASE LearnTheBasics
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE LearnTheBasics;


CREATE TABLE cpuTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL
)ENGINE = INNODB;

CREATE TABLE gpuTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL
)ENGINE = INNODB;

CREATE TABLE ramTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL
)ENGINE = INNODB;

CREATE TABLE stgTbl (
  hardwareId tinyint(4) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL
)ENGINE = INNODB;


INSERT INTO cpuTbl VALUES
(0, 'Z3', '3400 3.1GHz 2core', 'InkWell' );

/*Savedata*/
CREATE TABLE savedata (
  saveId tinyint(4) AUTO_INCREMENT,
  lvl tinyint(4) DEFAULT -1,
  money int(11) DEFAULT 0,
  time int(11) DEFAULT 0,
  cpu tinyint(4) DEFAULT 0,
  gpu tinyint(4) DEFAULT 0,
  ram tinyint(4) DEFAULT 0,
  stg tinyint(4) DEFAULT 0,
  PRIMARY KEY (saveId)
)ENGINE = INNODB;

INSERT INTO savedata VALUES
(1, -1, 0, 0, 0, 0, 0, 0),
(2, -1, 0, 0, 0, 0, 0, 0),
(3, -1, 0, 0, 0, 0, 0, 0);