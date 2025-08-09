package sn.psi.depotHopital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sn.psi.depotHopital.entities.User;
import sn.psi.depotHopital.services.CustomUserDetailsService;
import sn.psi.depotHopital.services.UserService;

import java.util.HashMap;
import java.util.Map;


@RestController
public class LoginController {

    @Autowired
    private UserService userDetailsService;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Authenticate the user (e.g., using Spring Security)
        // If authentication is successful, return a token or success message
        // If authentication fails, return an error response
        return ResponseEntity.ok().body("Login successful!");
    }


    @PostMapping("/api/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        if (userDetailsService.existsByUsername(user.getUsername())) {
            response.put("message", "Username already taken!");
            return ResponseEntity.badRequest().body(response);
        }
        if (userDetailsService.existsByEmail(user.getEmail())) {
            response.put("message", "Email already in use!");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDetailsService.createUser(user);

        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

   /* @GetMapping(value = "/login")
    public String login() {
        //return login.html located in /resources/templates
        return "login";
    }*/

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
        // Getters and setters
    }
}