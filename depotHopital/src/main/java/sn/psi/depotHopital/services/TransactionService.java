package sn.psi.depotHopital.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import sn.psi.depotHopital.entities.LigneProduit;
import sn.psi.depotHopital.entities.Produit;
import sn.psi.depotHopital.entities.Transaction;
import sn.psi.depotHopital.repositories.LigneProduitRepository;
import sn.psi.depotHopital.repositories.ProduitRepository;
import sn.psi.depotHopital.repositories.TransactionRepository;


import java.time.LocalDate;
import java.time.Month;
import java.util.List;
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private LigneProduitRepository ligneProduitRepository;

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        return processTransaction(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    @Transactional
    public Transaction updateTransaction(Long id, Transaction transaction) {
        transaction.setId(id);
        return processTransaction(transaction);
    }

    @Transactional
    public void deleteTransaction(Long id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction non trouvée"));
        String type= transaction.getType();
        for (LigneProduit ligne : transaction.getLigneProduits()) {
            Produit produit = ligne.getProduit();

            if (type.equals("entree")) {
                // Reverse an entry: subtract the quantity
                if (produit.getQuantite() < ligne.getQuantite()) {
                    throw new RuntimeException("Suppression impossible: le stock actuel est inférieur à la quantité de l'entrée.");
                }
                produit.setQuantite(produit.getQuantite() - ligne.getQuantite());
            } else if (type.equals("sortie") || type.equals("retour")) {
                // Reverse a sortie: restore the quantity
                produit.setQuantite(produit.getQuantite() + ligne.getQuantite());
            }

            produitRepository.save(produit);
            ligneProduitRepository.delete(ligne);
        }

        transactionRepository.delete(transaction);
    }

    public List<Transaction> searchTransactions(String dci, String nomPoste) {
        return transactionRepository.findTransactionsByDciAndPoste(dci, nomPoste);
    }

    public Transaction processTransaction(Transaction transaction) {
        Double total = Double.valueOf(0);
        String type = transaction.getType();

        for (LigneProduit ligne : transaction.getLigneProduits()) {
            Produit produit = produitRepository.findById(ligne.getProduit().getId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

            if (type.equals("entree")) {
                // Entrée de stock
                produit.setQuantite(produit.getQuantite() + ligne.getQuantite());
            } else if (type.equals("sortie") || type.equals("retour")) {
                // Sortie de stock
                if (produit.getQuantite() < ligne.getQuantite()) {
                    throw new RuntimeException("Stock insuffisant pour le produit : " + produit.getDci());
                }



                produit.setQuantite(produit.getQuantite() - ligne.getQuantite());
            }

            produitRepository.save(produit);

            // Calcul du prix total de la ligne
            Double ligneTotal = produit.getPrix() * ligne.getQuantite();
            ligne.setPrixTotal(ligneTotal);
            ligne.setProduit(produit); // remettre l'objet mis à jour

            ligneProduitRepository.save(ligne);

            total = total + ligneTotal;
        }

        transaction.setPrixTotal(total);
        return transactionRepository.save(transaction);
    }


    public Double getTotalTransactionsAmount(Long posteId) {
        LocalDate today= LocalDate.now();
        LocalDate start = LocalDate.of(today.getYear(), Month.JANUARY, 1);
        LocalDate end = LocalDate.of(today.getYear(), Month.DECEMBER, 31);

        return transactionRepository.calculateTotalVentesAmountByPosteId(posteId, start, end);
    }

    // In your service class
    public List<Transaction> getTransactionsForPoste(Long posteId) {
        LocalDate today= LocalDate.now();
        LocalDate start = LocalDate.of(today.getYear(), Month.JANUARY, 1);
        LocalDate end = LocalDate.of(today.getYear(), Month.DECEMBER, 31);
        return transactionRepository.findTransactionsByPosteId(posteId, start, end,
                PageRequest.of(0, 10));

    }

    public long getTransactionCountForPoste(Long posteId) {
        LocalDate today= LocalDate.now();
        LocalDate start = LocalDate.of(today.getYear(), Month.JANUARY, 1);
        LocalDate end = LocalDate.of(today.getYear(), Month.DECEMBER, 31);
        return transactionRepository.countTransactionsByPosteId(posteId, start, end);
    }


}
