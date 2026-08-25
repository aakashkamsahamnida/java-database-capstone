USE smart_clinic;

DELIMITER //

CREATE PROCEDURE ScheduleAppointment(
    IN p_patient_id BIGINT,
    IN p_doctor_id BIGINT,
    IN p_appointment_date DATETIME,
    IN p_reason TEXT
)
BEGIN
    -- Insert the new appointment record with default status 'SCHEDULED'
INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, reason)
VALUES (p_patient_id, p_doctor_id, p_appointment_date, 'SCHEDULED', p_reason);

-- Return the newly created appointment record
SELECT * FROM appointments WHERE id = LAST_INSERT_ID();
END //

DELIMITER ;