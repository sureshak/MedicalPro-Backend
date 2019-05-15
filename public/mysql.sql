create database MedicalPro;

use MedicalPro;

CREATE TABLE IF NOT EXISTS appointment (
    appointment_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    time_slot TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sex VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    phone BIGINT NOT NULL,
    description TEXT,
    is_deleted TINYINT(1) DEFAULT 0, 
    PRIMARY KEY (appointment_id)
);

CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,  
    is_deleted TINYINT(1) DEFAULT 0, 
    PRIMARY KEY (user_id)
);

insert into user (username,password) values ('suresh','test123');

CREATE TABLE IF NOT EXISTS usersession (
    token VARCHAR(255),
    user_id INT NOT NULL,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    is_active TINYINT(1) DEFAULT 1, 
    PRIMARY KEY (token),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
