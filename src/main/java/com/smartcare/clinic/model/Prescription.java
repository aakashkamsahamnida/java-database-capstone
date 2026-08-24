package com.smartcare.clinic.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "prescriptions")
public class Prescription {
    @Id
    private String id;
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;
    private String diagnosis;
    private List<Medication> medications;
    private String notes;
    private LocalDateTime issuedDate;

    public Prescription() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public List<Medication> getMedications() { return medications; }
    public void setMedications(List<Medication> medications) { this.medications = medications; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getIssuedDate() { return issuedDate; }
    public void setIssuedDate(LocalDateTime issuedDate) { this.issuedDate = issuedDate; }
}