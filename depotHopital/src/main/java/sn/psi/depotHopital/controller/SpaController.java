package sn.psi.depotHopital.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
public class SpaController {

    @GetMapping(value = {
            "/depotHopital",
            "/depotHopital/**",
            "/{path:^(?!api$|static$|assets$)[^\\.]*}",
            "/{path:^(?!api$|static$|assets$)[^\\.]*}/**"
    })
    public void redirect(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.sendRedirect("/depotHopital/index.html");
        } catch (IOException e) {
            throw new RuntimeException("Redirection failed", e);
        }
    }
}