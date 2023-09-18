DROP DATABASE IF EXISTS LearnTheBasics;

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

CREATE TABLE userTbl (
  uid int NOT NULL AUTO_INCREMENT,
  name varchar(25) NOT NULL,
  password varchar(25) NOT NULL,
  isAdmin boolean DEFAULT FALSE,
  PRIMARY KEY (uid)
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
  FOREIGN KEY (stgId) REFERENCES stgTbl(hardwareId),
  FOREIGN KEY (userId) REFERENCES userTbl(uid)
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

INSERT INTO userTbl VALUES
  (0, 'admin', MD5("admin"), TRUE),
  (0, 'josef', MD5("hello"), FALSE);

INSERT INTO savedata VALUES
  (0, 1, 1, 10, 5012, 0, 0, 0, 0, 0),
  (0, 1, 2, -1, 0, 0, 0, 0, 0, 0),
  (0, 1, 3, -1, 0, 0, 0, 0, 0, 0),
  (0, 2, 1, -1, 0, 0, 0, 0, 0, 0),
  (0, 2, 2, 2, 210, 0, 0, 0, 0, 0),
  (0, 2, 3, -1, 0, 0, 0, 0, 0, 0);