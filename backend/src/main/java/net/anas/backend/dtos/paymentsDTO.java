package net.anas.backend.dtos;

import jakarta.persistence.*;
import lombok.*;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;

import java.time.LocalDate;


//payments est une entité JPA
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class paymentsDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String description;
    private double amount;
    private PaymentsType type;
    //    @Enumerated(EnumType.STRING) // Si PaymentsStatus est une énumération
    private PaymentsStatus status=PaymentsStatus.CREATED; //    Par défaut is created
}