package sn.psi.depotHopital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sn.psi.depotHopital.entities.Produit;

public interface ProduitRepository extends JpaRepository<Produit, Long> {

    // ProduitRepository.java
    @Query("SELECT COUNT(p) FROM Produit p WHERE p.quantite < :seuil")
    long countProduitsStockFaible(@Param("seuil") Integer seuil);


}