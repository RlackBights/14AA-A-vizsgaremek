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

INSERT INTO LearnTheBasics.cpu (hardwareId, name) VALUES
(1, "Z3"),
(2, ""),
(3, "");

/*GPU*/
CREATE TABLE learnthebasics.gpu (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

INSERT INTO LearnTheBasics.gpu (hardwareId, name) VALUES
(1, "TB 720"),
(2, ""),
(3, "");


/*RAM*/
CREATE TABLE learnthebasics.ram (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

INSERT INTO LearnTheBasics.ram (hardwareId, name) VALUES
(1, "8GB DDR5"),
(2, "16GB DDR5"),
(3, "32GB DDR5");


/*STG*/
CREATE TABLE learnthebasics.stg (
  hardwareId tinyint(4) NOT NULL,
  name varchar(50) DEFAULT NULL,
  PRIMARY KEY (hardwareId)
)
ENGINE = INNODB;

INSERT INTO LearnTheBasics.stg (hardwareId, name) VALUES
(1, "256GB HDD"),
(2, "512GB HDD"),
(3, "1TB SSD");


INSERT INTO LearnTheBasics.savedata (saveId, lvl, money, time, cpu, gpu, ram, stg) VALUES
(1, -1, 0, 0, 1, 1, 1, 1),
(2, -1, 0, 0, 1, 1, 1, 1),
(3, -1, 0, 0, 1, 1, 1, 1);

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