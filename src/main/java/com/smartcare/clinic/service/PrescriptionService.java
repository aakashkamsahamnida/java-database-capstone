package com.smartcare.clinic.service;

import com.smartcare.clinic.model.Prescription;
import com.smartcare.clinic.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    public Optional<Prescription> getPrescriptionById(String id) {
        return prescriptionRepository.findById(id);
    }

    public List<Prescription> getPrescriptionsByPatientId(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    public Prescription createPrescription(Prescription prescription) {
        if (prescription.getIssuedDate() == null) {
            prescription.setIssuedDate(LocalDateTime.now());
        }
        return prescriptionRepository.save(prescription);
    }
}
