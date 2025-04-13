package sn.psi.depotHopital.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.psi.depotHopital.entities.Transaction;
import sn.psi.depotHopital.repositories.TransactionRepository;

import java.util.List;
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(Transaction atelier) {
        return transactionRepository.save(atelier);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public Transaction updateTransaction(Long id, Transaction atelier) {
        atelier.setId(id);
        return transactionRepository.save(atelier);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    public List<Transaction> searchTransactions(String dci, String nomPoste) {
        return transactionRepository.findTransactionsByDciAndPoste(dci, nomPoste);
    }
}
