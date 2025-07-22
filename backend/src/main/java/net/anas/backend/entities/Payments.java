package net.anas.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class Payments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private String description;
    private double amount;
    private PaymentsType type;
//    Par défaut is created
    @Enumerated(EnumType.STRING) // Si PaymentsStatus est une énumération
    private PaymentsStatus status=PaymentsStatus.CREATED;
//    on suppose qu'on vas génerer un pdf
    private String file;
    @ManyToOne
    private Students student;
}