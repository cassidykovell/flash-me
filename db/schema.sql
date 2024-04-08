DROP DATABASE IF EXISTS flashcard_db;
CREATE DATABASE flashcard_db;

USE flashcard_db;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,

);

CREATE TABLE flashcard (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    question TEXT,
    answer TEXT,
    user_id INT


);
