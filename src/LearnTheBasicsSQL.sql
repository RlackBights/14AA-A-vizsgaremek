﻿DROP DATABASE IF EXISTS LearnTheBasics;

CREATE DATABASE LearnTheBasics
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE LearnTheBasics;


CREATE TABLE cpuTbl (
  hardwareId tinyint(4) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

CREATE TABLE gpuTbl (
  hardwareId tinyint(4) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

CREATE TABLE ramTbl (
  hardwareId tinyint(4) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  company varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)ENGINE = INNODB;

CREATE TABLE stgTbl (
  hardwareId tinyint(4) NOT NULL AUTO_INCREMENT,
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


INSERT INTO cpuTbl (name, description, company) VALUES
('Z3', '3400 3.1GHz 2core', 'InkWell' ),
('Z5', '6500 2.8GHz 4core/4thread', 'InkWell'),
('Z7', '9800P 3.8GHz 8core/16thread', 'InkWell'),
('Z9', '12990P 4.9GHz 16core/32thread', 'InkWell');

INSERT INTO gpuTbl (name, description, company) VALUES
('DT', '620 1GB GDDR3', 'MediaVideo' ),
('DTX', '1150 2GB GDDR4', 'MediaVideo'),
('ETX', '2260 6GB GDDR5', 'MediaVideo'),
('ETX', '12990P 4.9GHz 16core/32thread', 'MediaVideo');

INSERT INTO ramTbl (name, description, company) VALUES
('8GB', 'DDR4 1600MHz', 'Tungsten Curie' ),
('16GB', 'DDR4 2133MHz', 'Tungsten Curie'),
('32GB', 'DDR4 2666MHz', 'Tungsten Curie'),
('64GB', 'DDR4 3200MHz', 'Tungsten Curie');

INSERT INTO stgTbl (name, description, company) VALUES
('250GB HDD', '5400rpm', 'SeeGait Bermuda' ),
('500GB HDD', '7200rpm', 'SeeGait Bermuda'),
('500GB SSD', '200MB/s', 'DanTsung 710Evolution'),
('1TB SSD', '520MB/s', 'DanTsung 710Evolution');

INSERT INTO userTbl (uid, name, password)
  VALUES (0, 'admin', 'admin');

INSERT INTO savedata (userId, saveId, lvl, money, time, cpuId, gpuId, ramId, stgId) VALUES
  (0, 1, -1, 0, 0, 1, 1, 1, 1),
  (0, 2, -1, 0, 0, 1, 1, 1, 1),
  (0, 3, -1, 0, 0, 1, 1, 1, 1);

INSERT INTO login (username, password) VALUES
('adminUSR', 'adminPASSWD');
