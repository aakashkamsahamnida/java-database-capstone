package com.smartcare.clinic.controller;

import com.smartcare.clinic.model.Doctor;
import com.smartcare.clinic.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor) {

        Doctor savedDoctor = doctorService.addDoctor(doctor);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Doctor added successfully",
                        "doctor", savedDoctor
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {

        return doctorService.getDoctorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctor(
            @RequestParam String name) {

        return ResponseEntity.ok(
                doctorService.searchByName(name)
        );
    }

    @GetMapping("/specialization")
    public ResponseEntity<List<Doctor>> getBySpecialization(
            @RequestParam String specialization) {

        return ResponseEntity.ok(
                doctorService.getDoctorsBySpecialization(specialization)
        );
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<?> getAvailability(
            @PathVariable Long id,
            @RequestParam String date) {

        List<LocalTime> availableTimes =
                doctorService.getAvailableTimes(
                        id,
                        LocalDate.parse(date)
                );

        return ResponseEntity.ok(
                Map.of(
                        "doctorId", id,
                        "date", date,
                        "availableTimes", availableTimes
                )
        );
    }
}