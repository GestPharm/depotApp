package sn.psi.depotHopital.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class LoginController {

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Authenticate the user (e.g., using Spring Security)
        // If authentication is successful, return a token or success message
        // If authentication fails, return an error response
        return ResponseEntity.ok().body("Login successful!");
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