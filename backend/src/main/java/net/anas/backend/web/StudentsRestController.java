package net.anas.backend.web;


import net.anas.backend.entities.Payments;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;
import net.anas.backend.entities.Students;
import net.anas.backend.repository.PaymentsRepo;
import net.anas.backend.repository.StudentsRepo;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MultipartFilter;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
public class StudentsRestController {
    private  StudentsRepo studentsRepo;
    private PaymentsRepo paymentsRepo;

    public StudentsRestController(StudentsRepo studentsRepo, PaymentsRepo paymentsRepo) {
        this.studentsRepo = studentsRepo;
        this.paymentsRepo = paymentsRepo;
    }

    @GetMapping("/payments")
    public List<Payments> allPayments(){
        return paymentsRepo.findAll();
    }

    @GetMapping("/payments/{id}")
    private Payments findPaymentsById(@PathVariable Long id){
        return paymentsRepo.findById(id).get();
    }

    @GetMapping("/students")
    public List<Students> findStudents(){
        return studentsRepo.findAll();
    }

    @GetMapping("/students/{id}")
    public Students findStudentById(@PathVariable String id){
        return studentsRepo.findById(id).get();
    }

    @GetMapping("/students/{code}/payments")
    public List<Payments> findByStudentCode(@PathVariable String code){
        return paymentsRepo.findByStudentCode(code);
    }

    @PostMapping(value = "/payments" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    //parameter to post
    //# = MultipartFile est une interface de Spring qui représente un fichier
    //#  envoyé par un client (navigateur, application Angular, Postman, etc.)
    //#  via une requête HTTP multipart/form-data.
    public Payments savePayments(
            @RequestParam MultipartFile file,
            LocalDate date, double amount,
            PaymentsType type,
            String studentsC) {
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
        return paymentsRepo.save(payments);
    }

    @GetMapping(value = "/paymentFile/{paymentId}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        Payments payments = paymentsRepo.findById(paymentId).get();
        String filePath = payments.getFile();
        return Files.readAllBytes(Path.of(URI.create(filePath)));
    }

    //changer l'etat de payment
    @PutMapping("/payments/{paymentId}")
    public Payments updatePaymentStatus(@RequestParam PaymentsStatus status,
                                       @PathVariable Long paymentId){
        Payments payment = paymentsRepo.findById(paymentId).get();
        payment.setStatus(status);
        return paymentsRepo.save(payment);
    }













































}



