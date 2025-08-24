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
import java.util.Optional;

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
        validateTransaction(transaction);
        return processTransaction(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    @Transactional
    public Transaction updateTransaction(Long id, Transaction transactionDetails) {
        Transaction existingTransaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction non trouvée avec l'ID : " + id));

        // Annuler l'ancienne transaction avant d'appliquer la nouvelle
        reverseTransaction(existingTransaction);

        // Mettre à jour avec les nouvelles données
        transactionDetails.setId(id);
        validateTransaction(transactionDetails);
        return processTransaction(transactionDetails);
    }

    @Transactional
    public void deleteTransaction(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction non trouvée avec l'ID : " + id));

        reverseTransaction(transaction);

        // Supprimer les lignes de produit
        ligneProduitRepository.deleteAll(transaction.getLigneProduits());
        transactionRepository.delete(transaction);
    }

    private void reverseTransaction(Transaction transaction) {
        String type = transaction.getType();

        for (LigneProduit ligne : transaction.getLigneProduits()) {
            Produit produit = ligne.getProduit();

            if (produit == null) {
                throw new RuntimeException("Produit non trouvé dans la ligne de transaction");
            }

            // Gestion de la quantité null - initialisation à 0 si null
            Integer quantiteActuelle = produit.getQuantite() != null ? produit.getQuantite() : 0;
            Integer quantiteLigne = ligne.getQuantite() != null ? ligne.getQuantite() : 0;

            if ("entree".equals(type)) {
                // Annuler une entrée : soustraire la quantité
               /* if (quantiteActuelle < quantiteLigne) {
                    throw new RuntimeException("Annulation impossible : stock insuffisant pour le produit " +
                            produit.getDci() + ". Stock actuel: " + quantiteActuelle +
                            ", Quantité à annuler: " + quantiteLigne);
                }*/
                produit.setQuantite(quantiteActuelle - quantiteLigne);
            } else if ("sortie".equals(type) || "retour".equals(type)) {
                // Annuler une sortie : restaurer la quantité
                produit.setQuantite(quantiteActuelle + quantiteLigne);
            }

            produitRepository.save(produit);
        }
    }

    private void validateTransaction(Transaction transaction) {
        if (transaction.getType() == null) {
            throw new RuntimeException("Le type de transaction est obligatoire");
        }

        if (transaction.getLigneProduits() == null || transaction.getLigneProduits().isEmpty()) {
            throw new RuntimeException("La transaction doit contenir au moins un produit");
        }

        String type = transaction.getType();

        for (LigneProduit ligne : transaction.getLigneProduits()) {
            if (ligne.getProduit() == null || ligne.getProduit().getId() == null) {
                throw new RuntimeException("Produit non spécifié dans une ligne de transaction");
            }

            Produit produit = produitRepository.findById(ligne.getProduit().getId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'ID : " + ligne.getProduit().getId()));

            // Gestion des quantités null
            Integer quantiteProduit = produit.getQuantite() != null ? produit.getQuantite() : 0;
            Integer quantiteLigne = ligne.getQuantite() != null ? ligne.getQuantite() : 0;

            if (quantiteLigne <= 0) {
                throw new RuntimeException("La quantité doit être positive pour le produit : " + produit.getDci());
            }

            if (("sortie".equals(type) || "retour".equals(type)) && quantiteProduit < quantiteLigne) {
                throw new RuntimeException("Stock insuffisant pour le produit : " + produit.getDci() +
                        ". Stock disponible: " + quantiteProduit +
                        ", Quantité demandée: " + quantiteLigne);
            }
        }
    }

    @Transactional
    public Transaction processTransaction(Transaction transaction) {
        Double total = 0.0;
        String type = transaction.getType();

        for (LigneProduit ligne : transaction.getLigneProduits()) {
            Produit produit = produitRepository.findById(ligne.getProduit().getId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'ID : " + ligne.getProduit().getId()));

            // Gestion des quantités null
            Integer quantiteActuelle = produit.getQuantite() != null ? produit.getQuantite() : 0;
            Integer quantiteLigne = ligne.getQuantite() != null ? ligne.getQuantite() : 0;

            if ("entree".equals(type)) {
                // Entrée de stock
                produit.setQuantite(quantiteActuelle + quantiteLigne);
            } else if ("sortie".equals(type) || "retour".equals(type)) {
                // Sortie de stock - la validation est déjà faite dans validateTransaction
                produit.setQuantite(quantiteActuelle - quantiteLigne);
            }

            produitRepository.save(produit);

            // Calcul du prix total de la ligne
            Double prixProduit = produit.getPrix() != null ? produit.getPrix() : 0.0;
            Double ligneTotal = prixProduit * quantiteLigne;
            ligne.setPrixTotal(ligneTotal);
            ligne.setProduit(produit);


            total += ligneTotal;
        }

        transaction.setPrixTotal(total);
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Sauvegarder les lignes après la transaction
        for (LigneProduit ligne : transaction.getLigneProduits()) {

            ligneProduitRepository.save(ligne);
        }

        return savedTransaction;
    }

    public List<Transaction> searchTransactions(String dci, String nomPoste) {
        return transactionRepository.findTransactionsByDciAndPoste(dci, nomPoste);
    }

    public Double getTotalTransactionsAmount(Long posteId) {
        LocalDate today = LocalDate.now();
        LocalDate start = LocalDate.of(today.getYear(), Month.JANUARY, 1);
        LocalDate end = LocalDate.of(today.getYear(), Month.DECEMBER, 31);

        return transactionRepository.calculateTotalVentesAmountByPosteId(posteId, start, end);
    }

    public List<Transaction> getTransactionsForPoste(Long posteId) {
        LocalDate today = LocalDate.now();
        LocalDate start = LocalDate.of(today.getYear(), Month.JANUARY, 1);
        LocalDate end = LocalDate.of(today.getYear(), Month.DECEMBER, 31);
        return transactionRepository.findTransactionsByPosteId(posteId, start, end, PageRequest.of(0, 10));
    }

    public long getTransactionCountForPoste(Long posteId) {
        LocalDate today = LocalDate.now();
        LocalDate start = LocalDate.of(today.getYear(), Month.JANUARY, 1);
        LocalDate end = LocalDate.of(today.getYear(), Month.DECEMBER, 31);
        return transactionRepository.countTransactionsByPosteId(posteId, start, end);
    }

    public Double getVentesDuMois() {
        return transactionRepository.getVentesDuMois();
    }

    public List<Object[]> countTransactionsByTypeForCurrentMonth() {
        return transactionRepository.countTransactionsByTypeForCurrentMonth();
    }

    public List<Object[]> getVentesParMois() {
        return transactionRepository.getVentesParMois();
    }
}