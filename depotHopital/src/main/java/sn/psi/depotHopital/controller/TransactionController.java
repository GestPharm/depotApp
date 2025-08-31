package sn.psi.depotHopital.controller;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.psi.depotHopital.entities.Transaction;
import sn.psi.depotHopital.services.TransactionService;
import sn.psi.depotHopital.vo.StatPoste;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/")
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/dernieres_ventes")
    public List<Transaction> getDernieresVentes() {
        return transactionService.getDernieresVentes();
    }


    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }

    /**
     * @param dci
     * @param nomPoste
     * @return
     */
    @GetMapping("/rechercher")
    public List<Transaction> rechercherClient(@RequestParam (name="dci", required=false) String dci, @RequestParam(name="nomPoste", required=false) String nomPoste) {
        List<Transaction> res = new ArrayList<>();
        return transactionService.searchTransactions(dci, nomPoste);
    }

    @GetMapping("/stat_by_poste/{idPoste}")
    public StatPoste getStatByPoste(@PathVariable Long idPoste) {
        StatPoste stat = new StatPoste();
        stat.setBudgetTotal(10000d);
        stat.setDepenseTotale(transactionService.getTotalTransactionsAmount(idPoste));
        stat.setNbTotalCommandes(transactionService.getTransactionCountForPoste(idPoste));
        stat.setDernieresCommandes(transactionService.getTransactionsForPoste(idPoste));
         return stat;

    }

    @GetMapping("/ventes-du-mois")
    public Double getVentesDuMois() {
        return transactionService.getVentesDuMois();
    }

    @GetMapping("/stats")
    public Map<String, Long> getTransactionStats() {
        List<Object[]> results = transactionService.countTransactionsByTypeForCurrentMonth();
        Map<String, Long> stats = new HashMap<>();
        stats.put("ENTREE", 0L);
        stats.put("SORTIE", 0L);
        stats.put("RETOUR", 0L);

        for (Object[] row : results) {
            String type = (String) row[0];
            Long count = (Long) row[1];
            stats.put(type.toUpperCase(), count);
        }
        return stats;
    }

    @GetMapping("/ventes-par-mois")
    public Map<Integer, Double> getVentesParMois() {
        List<Object[]> results = transactionService.getVentesParMois();
        Map<Integer, Double> ventesParMois = new HashMap<>();

        // Initialiser chaque mois à 0 (de 1 à 12)
        for (int m = 1; m <= 12; m++) {
            ventesParMois.put(m, 0.0);
        }

        for (Object[] row : results) {
            Integer mois = ((Number) row[0]).intValue();
            Double total = ((Number) row[1]).doubleValue();
            ventesParMois.put(mois, total);
        }
        return ventesParMois;
    }




}
