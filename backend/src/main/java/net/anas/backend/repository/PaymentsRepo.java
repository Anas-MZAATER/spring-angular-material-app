package net.anas.backend.repository;

import net.anas.backend.entities.Payments;
import net.anas.backend.entities.PaymentsStatus;
import net.anas.backend.entities.PaymentsType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentsRepo extends JpaRepository<Payments, Long> {

    List<Payments> findByStudentCode(String code);
    List<Payments> findByStatus(PaymentsStatus status);
    List<Payments> findByType(PaymentsType type);



    //// 2EME METHODE
//    @Query("SELECT p FROM Payments p WHERE p.paymentsStatus = :status")
//    List<Payments> findByPaymentsStatus(@Param("status") String status);
}
