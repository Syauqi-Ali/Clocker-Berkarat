-- Your SQL goes here
CREATE TABLE users (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    avatar TEXT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NULL,
    gender ENUM('male', 'female') DEFAULT 'male',
    status_acount_register ENUM('accepted', 'rejected', 'pending') DEFAULT 'pending',
    address VARCHAR(255) NULL,
    birthday DATE NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'client',
    email_verified_at TIMESTAMP NULL DEFAULT NULL,
    self_description TEXT NULL,
    tarif BIGINT NULL,
    portofolio VARCHAR(255) NULL,
    google_id VARCHAR(255) NULL UNIQUE,
    status ENUM('active', 'banned') NULL,
    status_login ENUM('online', 'offline') DEFAULT 'online',
    skills ENUM('UI_UX', 'Full_Stack', 'Web_Design') NULL,
    country ENUM('ID', 'US', 'UK', 'CA', 'AU', 'Other') NOT NULL DEFAULT 'ID',
    goal ENUM('Side', 'Steady', 'Experience', 'Nothing') NOT NULL DEFAULT 'Nothing',
    job ENUM('Office', 'WFH', 'Full_Time', 'Part_Time') NULL,
    about_user VARCHAR(255) NULL,
    experience ENUM('New', 'Experience', 'Expert') NOT NULL DEFAULT 'New',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


INSERT INTO users (first_name, last_name, email, password, role, status, phone, birthday, address, gender, skills, status_login, status_acount_register)
VALUES
    ('Admin', 'syauqi', 'admin@gmail.com', 'hashed_password', 'ADMIN', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    ('Freelancer', 'mugni', 'freelancer@gmail.com', 'hashed_password', 'FREELANCER', NULL, '085796783031', '1990-01-01', '123 Main Street, City, Country', 'MALE', 'UI_UX', 'online', 'PENDING'),
    ('Ahmad', 'Syauqi', 'sauqi2019@gmail.com', 'hashed_password', 'CLIENT', NULL, '085796783031', '1990-01-01', '123 Main Street, City, Country', 'MALE', 'UI_UX', 'online', 'PENDING'),
    ('Cinta', 'Adenia', 'ccintaadenia06@gmail.com', 'hashed_password', 'CLIENT', 'ACTIVE', '085796783031', '1990-01-01', '123 Main Street, City, Country', 'FEMALE', 'UI_UX', 'online', 'ACCEPTED'),
    ('Nasya', 'Asriva', 'asrivanasya0@gmail.com', 'hashed_password', 'CLIENT', 'ACTIVE', '085796783031', '1990-01-01', '123 Main Street, City, Country', 'FEMALE', 'UI_UX', 'online', 'ACCEPTED'),
    ('Nugi', 'Antartika', 'ar.tika0412@gmail.com', 'hashed_password', 'CLIENT', 'ACTIVE', '085796783031', '1990-01-01', '123 Main Street, City, Country', 'FEMALE', 'UI_UX', 'online', 'ACCEPTED'),
    ('Andhika', 'mugni', 'andhikamugniv@gmail.com', 'hashed_password', 'CLIENT', 'ACTIVE', '085796783031', '1990-01-01', '123 Main Street, City, Country', 'MALE', 'UI_UX', 'online', 'ACCEPTED'),
    ('Rifaldi', 'Gendeng', 'rifaldiliebert@gmail.com', 'hashed_password', 'CLIENT', 'ACTIVE', '085796783031', '1990-01-01', '123 Main Street, City, Country', 'MALE', 'UI_UX', 'online', 'ACCEPTED');
