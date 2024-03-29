const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

const userPasswords = ['123','abc','c'];

let userPasswordsHashed = [];

// loops through userPasswords array and hashes each password
for (let i = 0; i < userPasswords.length; i++) {

  // hash password
  bcrypt.hash(userPasswords[i], saltRounds, (error, hash) => {
    if (error) {
      // if error, console log error
      console.error("Error hashing password:", error);
    } else {
      // if no error, push hashed password to userPasswordsHashed array
      console.log("Hashed password:", hash);
      userPasswordsHashed.push(hash);

      if (userPasswordsHashed.length === userPasswords.length) {
        console.log("userPasswordsHashed:", userPasswordsHashed);
        // if userPasswordsHashed array is same length as userPasswords array, run SQL statement
        pool.query(SQLSTATEMENT, userPasswordsHashed, callback);
      }
      
    }
  });
}


const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

DROP TABLE IF EXISTS PlayerUserRel;

DROP TABLE IF EXISTS Shop;

DROP TABLE IF EXISTS Player;

DROP TABLE IF EXISTS UserCharRel;

DROP TABLE IF EXISTS Court;

DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User (
user_id INT PRIMARY KEY AUTO_INCREMENT,
username TEXT,
email TEXT,
password TEXT,
points INT 
);

CREATE TABLE Task (
task_id INT PRIMARY KEY AUTO_INCREMENT,
title TEXT,
description TEXT,
points INT DEFAULT 0
);

CREATE TABLE TaskProgress (
progress_id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,
task_id INT,
completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
notes TEXT
);

CREATE TABLE Shop (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  brand ENUM ('Yonex', 'Victor', 'Ashaway', 'LiNing', 'Felet'),
  type ENUM ('racket', 'shoe', 'shirt', 'pants') NOT NULL,
  name TEXT NOT NULL,
  atk INT DEFAULT 0 NOT NULL,
  def INT DEFAULT 0 NOT NULL,
  price INT DEFAULT 0 NOT NULL
  );

CREATE TABLE Player (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name TEXT NOT NULL,
  level INT NOT NULL,
  PlayType ENUM ('single', 'double') NOT NULL,
  partner INT,
  specialty ENUM ('net', 'drop', 'smash', 'lob', 'lift') NOT NULL,
  racket TEXT,
  shoe TEXT,
  shirt TEXT,
  pants TEXT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE UserCharRel (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  player_id INT NOT NULL
);

CREATE TABLE Court (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date TIMESTAMP NOT NULL,
  player1 INT NOT NULL,
  player1Pair INT,
  player2 INT NOT NULL,
  player2Pair INT,
  winner TEXT NOT NULL
);


INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', '50'),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', '30'),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', '40'),
('Energy Conservation', 'Turn off lights and appliances when not in use.', '25'),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', '35')
;

INSERT INTO Shop (brand, type, name, atk, def, price) VALUES
('Yonex', 'racket', '100zz', 80, 30, 20),
('Yonex', 'racket', '99 pro', 100, 50, 25),
('Yonex', 'shoe', '65z', 20, 70, 40),
('Yonex', 'shoe', 'aeroz', 10, 10, 50),
('Yonex', 'shirt', 'red shirt', 20, 20, 50),
('Yonex', 'pants', 'red pants', 20, 20, 60),
('Yonex', 'pants', 'highPants', 50, 50, 50),
('Victor', 'racket', 'jetspeed12', 90, 10, 10),
('Victor', 'shoe', 'aks 99', 20, 20, 35),
('Victor', 'shirt', 'pika', 55, 10, 100),
('LiNing', 'shirt', 'yellower', 50, 0, 55),
('LiNing', 'racket', 'axf999', 99, 99, 90),
('LiNing', 'pants', 'reddisher', 0, 60, 50)
;

INSERT INTO User (username,email,password,points) VALUES 
('John','john@example.com',?,0),
('Jane','jane@example.com',?,0),
('a','bob@example.com',?,100);

INSERT INTO Player (name, level, PlayType, partner, specialty, racket, shoe, shirt, pants) VALUES 
('adam', 3, 'single', NULL , 'smash', 'axf999', '65z', 'pika', 'reddisher'),
('aaron', 5, 'double', 3, 'drop', '100zz', 'aks 99', 'yellower', 'reddisher'),
('andrew', 4, 'double', 2, 'net', 'jetspeed12', 'aks 99', 'red shirt', 'red pants'),
('asher', 9, 'single', NULL, 'lob', '99 pro', '65z', 'red shirt', 'red pants'),
('alex', 1, 'single', NULL, 'lift', '99 pro', 'aks 99', 'pika', 'reddisher')
;

INSERT INTO UserCharRel (user_id, player_id) VALUES
(1,1),
(2,2),
(2,3)
;

INSERT INTO Messages (message_text, user_id) VALUES
("Hello world!", 1),
("Yummy!", 2),  
("I am the one", 3);

`;


// pool.query(SQLSTATEMENT, callback);
