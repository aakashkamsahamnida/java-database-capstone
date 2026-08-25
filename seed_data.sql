USE smart_clinic;

-- 1. Insert Initial Users (1 Admin, 2 Doctors, 2 Patients)
INSERT INTO users (name, email, password, role) VALUES
                                                    ('Admin User', 'admin@clinic.com', '$2a$10$e8.Z/W5z9h...', 'ADMIN'),
                                                    ('Dr. Robert Smith', 'dr.smith@clinic.com', '$2a$10$e8.Z/W5z9h...', 'DOCTOR'),
                                                    ('Dr. Emily Wong', 'dr.wong@clinic.com', '$2a$10$e8.Z/W5z9h...', 'DOCTOR'),
                                                    ('John Doe', 'john.doe@email.com', '$2a$10$e8.Z/W5z9h...', 'PATIENT'),
                                                    ('Alice Brown', 'alice.b@email.com', '$2a$10$e8.Z/W5z9h...', 'PATIENT');

-- 2. Insert Initial Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, reason) VALUES
                                                                                       (4, 2, '2026-08-25 10:00:00', 'SCHEDULED', 'Annual Routine Checkup'),
                                                                                       (5, 3, '2026-08-25 11:30:00', 'COMPLETED', 'Persistent Fever and Cough'),
                                                                                       (4, 3, '2026-08-26 14:00:00', 'SCHEDULED', 'Follow-up Consultation');