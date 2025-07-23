package net.anas.backend.repository;

import net.anas.backend.entities.Students;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentsRepo extends JpaRepository<Students, String> {
    Students findByCode(String code);

    Students findStudentById(String id);

    List<Students> findStudentsByProgramId(String programId);
}
