package net.anas.backend;

import net.anas.backend.entities.Payments;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;
import net.anas.backend.entities.Students;
import net.anas.backend.repository.PaymentsRepo;
import net.anas.backend.repository.StudentsRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(StudentsRepo studentsRepo,
                                        PaymentsRepo paymentsRepo){
        return args -> {
            studentsRepo.save(Students.builder().id(UUID.randomUUID().toString()).code("1111").programId("GL").firstName("Anas").build());
            studentsRepo.save(Students.builder().id(UUID.randomUUID().toString()).code("2222").programId("GL").firstName("Iman").build());
            studentsRepo.save(Students.builder().id(UUID.randomUUID().toString()).code("3333").programId("ISI").firstName("Houssam").build());


            PaymentsType[] paymentsType = PaymentsType.values();
            Random random = new Random();
            studentsRepo.findAll().forEach(st ->{
                int index = random.nextInt(paymentsType.length);
                for (int i=0; i<10 ; i++){
                    Payments payment = Payments.builder()
                            .amount(1000+(int)(Math.random()*10000))
                            .date(LocalDate.now())
                            .type(paymentsType[index])
                            .status(PaymentsStatus.CREATED)
                            .file(UUID.randomUUID().toString())
                            .student(st)
                            .build();
                    paymentsRepo.save(payment);
                }


            });

            studentsRepo.findAll().forEach(st->System.out.println(st.toString()));
            System.out.println("Hello Mr. Engineer!");
        };//fin return
    }//fin bean

}//fin SpringBootApplication

