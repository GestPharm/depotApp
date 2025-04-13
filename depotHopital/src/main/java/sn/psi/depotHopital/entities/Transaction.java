package sn.psi.depotHopital.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantite;
    private String type; // "entree" ou "sortie"

    private LocalDate dateTransaction;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_poste")
    private Poste poste;

    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LigneProduit> ligneProduits;

    @Column(nullable = true)
    private Double prixTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    public List<LigneProduit> getLigneProduits() {
        return ligneProduits;
    }

    public void setLigneProduits(List<LigneProduit> ligneProduits) {
        this.ligneProduits = ligneProduits;
    }

    public LocalDate getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(LocalDate dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public Double getPrixTotal() {
        return prixTotal;
    }

    public void setPrixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
    }
}
