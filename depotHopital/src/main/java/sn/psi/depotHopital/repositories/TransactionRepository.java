package sn.psi.depotHopital.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sn.psi.depotHopital.entities.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT DISTINCT t FROM Transaction t " +
            "LEFT JOIN t.ligneProduits lp " +
            "LEFT JOIN lp.produit p " +
            "LEFT JOIN t.poste po " +
            "WHERE (:dci IS NULL OR p.dci like %:dci%) " +
            "AND (:nomPoste IS NULL OR po.nom like %:nomPoste%)")
    List<Transaction> findTransactionsByDciAndPoste(
            @Param("dci") String dci,
            @Param("nomPoste") String nomPoste
    );

}
