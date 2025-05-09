package sn.psi.depotHopital.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ligne_produit")
public class LigneProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer quantite;

    @ManyToOne(fetch = FetchType.EAGER)
    private Produit produit;

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

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public Double getPrixTotal() {
         if(prixTotal==null) return Double.valueOf(0) ; else return prixTotal;
    }

    public void setPrixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
    }
}
