package com.smartcare.clinic.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Doctor Name
    @NotBlank(message = "Name is required")
    private String name;

    // Doctor Email
    @Email(message = "Invalid email")
    @Column(unique = true, nullable = false)
    private String email;

    // Doctor Phone Number
    private String phone;

    // Doctor Password
    private String password;

    // Doctor Specialization
    @NotBlank(message = "Specialization is required")
    private String specialization;

    // Available Time Slots
    @ElementCollection
    @CollectionTable(
            name = "doctor_available_times",
            joinColumns = @JoinColumn(name = "doctor_id")
    )
    @Column(name = "available_time")
    private List<LocalTime> availableTimes;

    // Default Constructor
    public Doctor() {
    }

    // Constructor
    public Doctor(
            String name,
            String email,
            String phone,
            String password,
            String specialization,
            List<LocalTime> availableTimes
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.specialization = specialization;
        this.availableTimes = availableTimes;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public List<LocalTime> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List<LocalTime> availableTimes) {
        this.availableTimes = availableTimes;
    }
}