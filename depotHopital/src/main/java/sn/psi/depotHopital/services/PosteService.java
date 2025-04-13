package sn.psi.depotHopital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.psi.depotHopital.entities.Poste;
import sn.psi.depotHopital.repositories.PosteRepository;

import java.util.List;
@Service
public class PosteService {

    @Autowired
    private PosteRepository atelierRepository;

    public Poste createPoste(Poste atelier) {
        return atelierRepository.save(atelier);
    }

    public List<Poste> getAllPostes() {
        return atelierRepository.findAll();
    }

    public Poste getPosteById(Long id) {
        return atelierRepository.findById(id).orElse(null);
    }

    public Poste updatePoste(Long id, Poste atelier) {
        atelier.setId(id);
        return atelierRepository.save(atelier);
    }

    public void deletePoste(Long id) {
        atelierRepository.deleteById(id);
    }
}
