package sn.psi.depotHopital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.psi.depotHopital.entities.Produit;
import sn.psi.depotHopital.repositories.ProduitRepository;

import java.util.List;
@Service
public class ProduitService {

    @Autowired
    private ProduitRepository atelierRepository;

    public Produit createProduit(Produit atelier) {
        return atelierRepository.save(atelier);
    }

    public List<Produit> getAllProduits() {
        return atelierRepository.findAll();
    }

    public Produit getProduitById(Long id) {
        return atelierRepository.findById(id).orElse(null);
    }

    public Produit updateProduit(Long id, Produit atelier) {
        atelier.setId(id);
        return atelierRepository.save(atelier);
    }

    public void deleteProduit(Long id) {
        atelierRepository.deleteById(id);
    }

    public Long countProduitsStockFaible(Integer i) {
        return atelierRepository.countProduitsStockFaible(i);
    }
}
