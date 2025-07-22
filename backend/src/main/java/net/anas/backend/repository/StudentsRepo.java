package net.anas.backend.repository;

import net.anas.backend.entities.Students;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentsRepo extends JpaRepository<Students, String> {
    Students findByCode(String code);

    Students findStudentsById(String id);
}
