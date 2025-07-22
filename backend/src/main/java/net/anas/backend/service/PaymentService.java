package net.anas.backend.service;


import net.anas.backend.entities.Payments;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;
import net.anas.backend.entities.Students;
import net.anas.backend.repository.PaymentsRepo;
import net.anas.backend.repository.StudentsRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public Payments savePayment(MultipartFile file,
                                LocalDate date, double amount,
                                PaymentsType type,
                                String studentsC){
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
        String paymentsId = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"students-app-file","payments",paymentsId+".pdf");
        try {
            Files.copy(file.getInputStream(),filePath);//permet de copier les données vers un fichier
            System.out.println("Fichier copy avec succès : " + path.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Erreur lors de la copy de fichier : " + e.getMessage());
            //e.printStackTrace();
            throw new RuntimeException(e);
        }
        Students students = studentsRepo.findByCode(studentsC);
        Payments payments =  Payments.builder()
                .type(type)
                .amount(amount)
                .student(students)
                .status(PaymentsStatus.CREATED)
                .date(date)
                .file(filePath.toUri().toString())
                .build();
        Payments sevedPayment = paymentsRepo.save(payments);
        return sevedPayment;
    }

}
