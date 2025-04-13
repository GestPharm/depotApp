package sn.psi.depotHopital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.psi.depotHopital.entities.Poste;
import sn.psi.depotHopital.services.PosteService;

import java.util.List;

@RestController
@RequestMapping("/api/postes")
public class PosteController {

    @Autowired
    private PosteService posteService;

    @PostMapping("/")
    public Poste createPoste(@RequestBody Poste poste) {
        return posteService.createPoste(poste);
    }

    @GetMapping
    public List<Poste> getAllPostes() {
        return posteService.getAllPostes();
    }
    

    @GetMapping("/{id}")
    public Poste getPosteById(@PathVariable Long id) {
        return posteService.getPosteById(id);
    }

    @PutMapping("/{id}")
    public Poste updatePoste(@PathVariable Long id, @RequestBody Poste poste) {
        return posteService.updatePoste(id, poste);
    }

    @DeleteMapping("/{id}")
    public void deletePoste(@PathVariable Long id) {
        posteService.deletePoste(id);
    }

}
