package net.anas.backend.dtos;

import lombok.*;
import net.anas.backend.entities.PaymentsType;

import java.time.LocalDate;


//payments est une entité JPA
@NoArgsConstructor @AllArgsConstructor @Getter @Setter
public class NewPaymentDTO {
    private String studentCode;
    private LocalDate date;
    private double amount;
    private PaymentsType type;
}