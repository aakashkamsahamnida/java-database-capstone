# Smart Clinic Management System - Database Schema Design

This document details the database architecture and relational schema for the Smart Clinic Management System using **MySQL**.

---

## 1. System Overview & Key Entities
The backend uses relational mapping (JPA/Hibernate) to persist entity data. The schema consists of four primary relational tables:

1. **`users`**: Base authentication table supporting Role-Based Access Control (RBAC) for `ADMIN`, `DOCTOR`, and `PATIENT`.
2. **`doctors`**: Holds doctor-specific metadata, specialty details, and consultation charges linked to `users`.
3. **`patients`**: Holds medical history, emergency contacts, and personal demographics linked to `users`.
4. **`appointments`**: Tracks consultation bookings between patients and doctors with real-time status tracking.

---

## 2. Table Definitions

### A. `users` Table
Stores authentication and base profile information.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique identifier for user |
| `email` | `VARCHAR(150)` | `NOT NULL`, `UNIQUE` | User login email address |
| `password` | `VARCHAR(255)` | `NOT NULL` | Encrypted password string |
| `full_name` | `VARCHAR(100)` | `NOT NULL` | Full legal name |
| `phone_number`| `VARCHAR(20)` | `NOT NULL` | Contact number |
| `role` | `VARCHAR(20)` | `NOT NULL` | Enum value (`ADMIN`, `DOCTOR`, `PATIENT`) |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record creation date |

---

### B. `doctors` Table
Extends user profiles for medical professionals.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Primary key |
| `user_id` | `BIGINT` | `NOT NULL`, `UNIQUE`, `FOREIGN KEY` | References `users(id)` |
| `specialty` | `VARCHAR(100)` | `NOT NULL` | Medical field (e.g., Cardiology, Neurology) |
| `consultation_fee` | `DECIMAL(10,2)` | `NOT NULL` | Fee per visit |
| `experience_years`| `INT` | `NOT NULL` | Total years of practice |

---

### C. `patients` Table
Stores detailed health profiles for clinic patients.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Primary key |
| `user_id` | `BIGINT` | `NOT NULL`, `UNIQUE`, `FOREIGN KEY` | References `users(id)` |
| `date_of_birth` | `DATE` | `NOT NULL` | Birth date |
| `blood_group` | `VARCHAR(5)` | `NULLABLE` | Blood type classification |
| `emergency_contact`| `VARCHAR(20)` | `NOT NULL` | Phone number for emergency contact |

---

### D. `appointments` Table
Coordinates scheduling between patients and doctors.

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Primary Key |
| `patient_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY` | References `patients(id)` |
| `doctor_id` | `BIGINT` | `NOT NULL`, `FOREIGN KEY` | References `doctors(id)` |
| `appointment_time`| `DATETIME` | `NOT NULL` | Scheduled date and time |
| `status` | `VARCHAR(20)` | `NOT NULL` | Status (`SCHEDULED`, `COMPLETED`, `CANCELLED`) |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Booking timestamp |

---

## 3. SQL DDL Statements (Schema Creation)

```sql
CREATE DATABASE IF NOT EXISTS smart_clinic_db;
USE smart_clinic_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    specialty VARCHAR(100) NOT NULL,
    consultation_fee DECIMAL(10,2) NOT NULL,
    experience_years INT NOT NULL,
    CONSTRAINT fk_doctor_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    blood_group VARCHAR(5),
    emergency_contact VARCHAR(20) NOT NULL,
    CONSTRAINT fk_patient_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_time DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
