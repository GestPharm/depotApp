package sn.psi.depotHopital.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sn.psi.depotHopital.entities.Transaction;

import java.time.LocalDate;
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


    // New method to count transactions by poste ID
    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.poste.id = :idPoste AND t.type = 'sortie' AND t.dateTransaction BETWEEN :startDate AND :endDate")
    Long countTransactionsByPosteId(@Param("idPoste") Long idPoste, @Param("startDate") LocalDate start,
                                    @Param("endDate") LocalDate end);


    @Query("SELECT DISTINCT t FROM Transaction t " +
            "LEFT JOIN FETCH t.ligneProduits lp " +
            "LEFT JOIN FETCH lp.produit " +
            "WHERE t.poste.id = :idPoste and t.type= 'sortie' AND t.dateTransaction BETWEEN :startDate AND :endDate order by t.dateTransaction desc")
    List<Transaction> findTransactionsByPosteId(@Param("idPoste") Long idPoste, @Param("startDate") LocalDate start,
                                                @Param("endDate") LocalDate end, Pageable pageable);


    @Query("SELECT COALESCE(SUM(t.prixTotal), 0) FROM Transaction t WHERE t.poste.id = :idPoste AND t.type = 'sortie' AND t.dateTransaction BETWEEN :startDate AND :endDate")
    Double calculateTotalVentesAmountByPosteId(@Param("idPoste") Long idPoste, @Param("startDate") LocalDate start,
                                               @Param("endDate") LocalDate end);

    @Query("SELECT COALESCE(SUM(t.prixTotal), 0) " +
            "FROM Transaction t " +
            "WHERE t.type = 'sortie' " +
            "AND FUNCTION('MONTH', t.dateTransaction) = FUNCTION('MONTH', CURRENT_DATE) " +
            "AND FUNCTION('YEAR', t.dateTransaction) = FUNCTION('YEAR', CURRENT_DATE)")
    Double getVentesDuMois();

    @Query("SELECT t.type, COUNT(t) " +
            "FROM Transaction t " +
            "WHERE FUNCTION('MONTH', t.dateTransaction) = FUNCTION('MONTH', CURRENT_DATE) " +
            "AND FUNCTION('YEAR', t.dateTransaction) = FUNCTION('YEAR', CURRENT_DATE) " +
            "GROUP BY t.type")
    List<Object[]> countTransactionsByTypeForCurrentMonth();

    @Query("SELECT FUNCTION('MONTH', t.dateTransaction) as mois, " +
            "COALESCE(SUM(lp.quantite * lp.produit.prix), 0) as total " +
            "FROM Transaction t " +
            "JOIN t.ligneProduits lp " +
            "WHERE t.type = 'sortie' " +
            "AND FUNCTION('YEAR', t.dateTransaction) = FUNCTION('YEAR', CURRENT_DATE) " +
            "GROUP BY FUNCTION('MONTH', t.dateTransaction) " +
            "ORDER BY mois")
    List<Object[]> getVentesParMois();


}
