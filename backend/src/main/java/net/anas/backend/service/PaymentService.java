package net.anas.backend.service;


import jakarta.persistence.EntityNotFoundException;
import net.anas.backend.dtos.NewPaymentDTO;
import net.anas.backend.entities.Payments;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;
import net.anas.backend.entities.Students;
import net.anas.backend.repository.PaymentsRepo;
import net.anas.backend.repository.StudentsRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    //INJECTER LES RIPOSITORY
    private PaymentsRepo paymentsRepo;
    private StudentsRepo studentsRepo;

    public PaymentService(PaymentsRepo paymentsRepo, StudentsRepo studentsRepo) {
        this.paymentsRepo = paymentsRepo;
        this.studentsRepo = studentsRepo;
    }

    public Payments savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) {
        //create path for app in client home directory
        Path path = Paths.get(System.getProperty("user.home"),"students-app-file","payments");
        if(!Files.exists(path)){
            //Traiter la méthode à tâche critique : Pour créer un dossier dans le dossier home de l'utilisateur
            //aprés verifier : if not existe
            try {
                Files.createDirectories(path);
                System.out.println("Dossier(s) de payments créé(s) avec succès : " + path.toAbsolutePath());
            } catch (IOException e) {
                System.err.println("Erreur lors de la création du dossier : " + e.getMessage());
                //e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"students-app-file","payments",fileName+".pdf");
        try {
            Files.copy(file.getInputStream(),filePath);//permet de copier les données vers un fichier
            System.out.println("Fichier copy avec succès : " + path.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Erreur lors de la copy de fichier : " + e.getMessage());
            //e.printStackTrace();
            throw new RuntimeException(e);
        }
        Students students = studentsRepo.findByCode(newPaymentDTO.getStudentCode());
        //build payment object
        Payments payment =  Payments.builder()
                .type(newPaymentDTO.getType())
                .amount(newPaymentDTO.getAmount())
                .student(students)
                .status(PaymentsStatus.CREATED)
                .date(newPaymentDTO.getDate())
                .file(filePath.toUri().toString())
                // Utiliser .toUri() sur un Path (comme un java.nio.file.Path),
                // ça génère une URI (Uniform Resource Identifier),
                // mais basée sur ton système de fichiers local.
                .build();
        // persiste payment object status
        Payments sevedPayment = paymentsRepo.save(payment);
        return sevedPayment;
    }

    public Payments updatePaymentStatus(PaymentsStatus status,
                                        Long paymentId){
        Payments payment = paymentsRepo.findById(paymentId).orElseThrow(()->new EntityNotFoundException("Payments with id "+paymentId+" not found"));
        payment.setStatus(status);
        return paymentsRepo.save(payment);
    }

    public byte[] getPaymentFile(Long paymentId) {
        Payments payments = paymentsRepo.findById(paymentId).orElseThrow(()->new EntityNotFoundException("Payments with id "+paymentId+" not found"));
        String filePath = payments.getFile();
        try {
            return Files.readAllBytes(Path.of(URI.create(filePath)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
