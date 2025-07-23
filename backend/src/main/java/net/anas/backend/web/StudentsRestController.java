package net.anas.backend.web;


import jakarta.persistence.EntityNotFoundException;
import net.anas.backend.entities.Payments;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;
import net.anas.backend.entities.Students;
import net.anas.backend.repository.PaymentsRepo;
import net.anas.backend.repository.StudentsRepo;
import net.anas.backend.service.PaymentService;
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
    private PaymentService paymentService;

    public StudentsRestController(StudentsRepo studentsRepo, PaymentsRepo paymentsRepo,  PaymentService paymentService) {
        this.studentsRepo = studentsRepo;
        this.paymentsRepo = paymentsRepo;
        this.paymentService = paymentService;
    }

    @GetMapping("/students")
    public List<Students> getStudents(){
        return studentsRepo.findAll();
    }

    @GetMapping("/students/{id}")
    //@PathVariable pour un varible qui se trouve dans le path
    public Students getStudentById(@PathVariable String id){
        return studentsRepo.findById(id).orElseThrow(()->new EntityNotFoundException("Students with id "+id+" not found"));
        // La méthode findById(id) retourne un Optional<Payment>
        // On peut le traiter de plusieurs manières :
        // - .get() : retourne la valeur si présente, sinon lève NoSuchElementException (à éviter sans vérification préalable)
        // - .orElse(null) : retourne la valeur si présente, sinon null
        // - .orElseThrow(() -> new EntityNotFoundException("Payment with id " + id + " not found")) : lève une exception personnalisée si absent
    }

    @GetMapping("/students/ByProgramId")
    //@RequestParam POUR un variable qu'on va l'enoyer apre ? : comme un parametre
    public List<Students> getStudentsByProgramId(@RequestParam String programId){
        return studentsRepo.findStudentsByProgramId(programId);
    }


    @GetMapping("/payments")
    public List<Payments> allPayments(){
        return paymentsRepo.findAll();
    }

    @GetMapping("/payments/{id}")
    private Payments getPaymentsById(@PathVariable Long id){
        return paymentsRepo.findById(id).orElseThrow(()->new EntityNotFoundException("Payments with id "+id+" not found"));
    }

    @GetMapping("/students/{code}/payments")
    public List<Payments> PaymentsByStudentCode(@PathVariable String code){
        return paymentsRepo.findByStudentCode(code);
    }

    @GetMapping("/payments/byStatus")
    public List<Payments> paymentsByStatus(@RequestParam PaymentsStatus status){
        return paymentsRepo.findByStatus(status);
    }

    @GetMapping("/payments/byType")
    public List<Payments> paymentsByStatus(@RequestParam PaymentsType type){
        return paymentsRepo.findByType(type);
    }

    @PostMapping(path = "/payments" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    //parameter to post
    //upload un fichier
    //# = MultipartFile est une interface de Spring qui représente un fichier
    //#  envoyé par un client (navigateur, application Angular, Postman, etc.)
    //#  via une requête HTTP multipart/form-data.
    public Payments savePayment(
            @RequestParam MultipartFile file, LocalDate date, double amount,
            PaymentsType type, String studentsC) {

        return paymentService.savePayment(file, date, amount, type, studentsC);
    }

    @GetMapping(path = "/paymentFile/{paymentId}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) {
        return paymentService.getPaymentFile(paymentId);
    }

    //changer l'etat de payment
    @PutMapping("/payments/{paymentId}")
    public Payments updatePaymentStatus(@RequestParam PaymentsStatus status,
                                       @PathVariable Long paymentId){
        return paymentService.updatePaymentStatus(status, paymentId);
    }













































}



