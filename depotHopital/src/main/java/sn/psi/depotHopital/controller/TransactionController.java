package sn.psi.depotHopital.controller;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.psi.depotHopital.entities.Transaction;
import sn.psi.depotHopital.services.TransactionService;
import sn.psi.depotHopital.vo.StatPoste;

import java.util.ArrayList;
import java.util.List;

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


    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
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

}
