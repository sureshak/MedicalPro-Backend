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
