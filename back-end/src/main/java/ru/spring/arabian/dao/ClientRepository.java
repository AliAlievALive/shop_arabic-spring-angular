package ru.spring.arabian.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.spring.arabian.model.Client;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, Long> {
}