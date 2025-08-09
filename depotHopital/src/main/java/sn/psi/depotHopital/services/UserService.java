package sn.psi.depotHopital.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sn.psi.depotHopital.entities.User;
import sn.psi.depotHopital.entities.User;
import sn.psi.depotHopital.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUser(String username, String password, String role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        userRepository.save(user);
    }

    public User createUser(User atelier) {
        return userRepository.save(atelier);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, User atelier) {
        atelier.setId(id);
        return userRepository.save(atelier);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Boolean existsByUsername(String username){
        return userRepository.findByUsername(username).isPresent();
    }

    public Boolean existsByEmail(String email){
        return userRepository.findByEmail(email).isPresent();
    }

}