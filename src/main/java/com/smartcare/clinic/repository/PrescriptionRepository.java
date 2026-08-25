package com.smartcare.clinic.repository;

import com.smartcare.clinic.model.Prescription;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PrescriptionRepository extends MongoRepository<Prescription, String> {
    List<Prescription> findByPatientId(Long patientId);
}