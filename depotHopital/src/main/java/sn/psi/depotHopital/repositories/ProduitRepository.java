package sn.psi.depotHopital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.psi.depotHopital.entities.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Long> {

}