package sn.psi.depotHopital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.psi.depotHopital.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}