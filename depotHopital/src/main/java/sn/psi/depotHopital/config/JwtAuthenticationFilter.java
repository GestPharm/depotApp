package sn.psi.depotHopital.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sn.psi.depotHopital.config.LoginRequest;
import sn.psi.depotHopital.entities.User;
import sn.psi.depotHopital.services.UserService;
import sn.psi.depotHopital.utils.JwtUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;


    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;

        // Set the login endpoint
        setFilterProcessesUrl("/api/login"); // Angular should POST here
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        try {
            LoginRequest creds = new ObjectMapper().readValue(request.getInputStream(), LoginRequest.class);

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword());

            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException("Failed to parse login request", e);
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException {

        // Extract username
        String username = authResult.getName();
        String token = jwtUtil.generateToken(username);

        // Retrieve full user details (depending on your UserDetailsService / entity)
        Object principal = authResult.getPrincipal();
        Map<String, Object> userMap = new HashMap<>();

        if (principal instanceof org.springframework.security.core.userdetails.User) {
            org.springframework.security.core.userdetails.User springUser =
                    (org.springframework.security.core.userdetails.User) principal;

            userMap.put("username", springUser.getUsername());
            userMap.put("roles", springUser.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList());
            User usr = userService.findByUsername(springUser.getUsername());
            if(usr!=null){
                userMap.put("id", usr.getId());
                userMap.put("email", usr.getEmail());
                userMap.put("nom", usr.getNom());
                userMap.put("prenom", usr.getPrenom());
                userMap.put("role", usr.getRole());
            }
        } else {
             //If you have a custom User entity, cast and expose its fields

             User user = (User) principal;
             userMap.put("id", user.getId());
             userMap.put("email", user.getEmail());
             userMap.put("nom", user.getNom());
            userMap.put("prenom", user.getPrenom());
             userMap.put("role", user.getRole());
        }

        // Prepare response
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("user", userMap);
        responseMap.put("token", token);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        new ObjectMapper().writeValue(response.getWriter(), responseMap);
    }

    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        Map<String, String> error = new HashMap<>();
        error.put("error", "Invalid username or password");

        new ObjectMapper().writeValue(response.getWriter(), error);
    }
}
