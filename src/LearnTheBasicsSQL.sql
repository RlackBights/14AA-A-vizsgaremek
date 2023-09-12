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

INSERT INTO savedata VALUES
(1, -1, 0, 0, 0, 0, 0, 0),
(2, -1, 0, 0, 0, 0, 0, 0),
(3, -1, 0, 0, 0, 0, 0, 0);
