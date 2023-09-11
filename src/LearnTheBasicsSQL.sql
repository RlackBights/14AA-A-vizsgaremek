DROP DATABASE IF EXISTS LearnTheBasics;

CREATE DATABASE LearnTheBasics
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE LearnTheBasics;


/*Savedata*/
CREATE TABLE learnthebasics.savedata (
  saveId tinyint(4) NOT NULL,
  lvl tinyint(4) DEFAULT NULL,
  money int(11) DEFAULT NULL,
  time int(11) DEFAULT NULL,
  cpu tinyint(4) DEFAULT NULL,
  gpu tinyint(4) DEFAULT NULL,
  ram tinyint(4) DEFAULT NULL,
  stg tinyint(4) DEFAULT NULL,
  PRIMARY KEY (saveId)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_hungarian_ci;

/*CPU*/
CREATE TABLE learnthebasics.cpu (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

/*GPU*/
CREATE TABLE learnthebasics.gpu (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

/*RAM*/
CREATE TABLE learnthebasics.ram (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

/*STG*/
CREATE TABLE learnthebasics.stg (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

/*ALTER*/
ALTER TABLE learnthebasics.savedata
ADD CONSTRAINT FK_cpu FOREIGN KEY (cpu)
REFERENCES learnthebasics.cpu (hardwareId) ON DELETE NO ACTION;

ALTER TABLE learnthebasics.savedata
ADD CONSTRAINT FK_gpu FOREIGN KEY (gpu)
REFERENCES learnthebasics.gpu (hardwareId) ON DELETE NO ACTION;

ALTER TABLE learnthebasics.savedata
ADD CONSTRAINT FK_ram FOREIGN KEY (ram)
REFERENCES learnthebasics.ram (hardwareId) ON DELETE NO ACTION;

ALTER TABLE learnthebasics.savedata
ADD CONSTRAINT FK_stg FOREIGN KEY (stg)
REFERENCES learnthebasics.stg (hardwareId) ON DELETE NO ACTION;