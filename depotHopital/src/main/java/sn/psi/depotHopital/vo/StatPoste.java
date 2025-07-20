package sn.psi.depotHopital.vo;

import sn.psi.depotHopital.entities.Transaction;

import java.util.List;
import java.util.ArrayList;

public class StatPoste {
    private Long nbTotalCommandes;
    private Double depenseTotale;
    private Double budgetTotal;
    private List<Transaction> dernieresCommandes;





    // Getters and Setters

    public Long getNbTotalCommandes() {
        return nbTotalCommandes;
    }

    public void setNbTotalCommandes(Long nbTotalCommandes) {
        this.nbTotalCommandes = nbTotalCommandes;
    }

    public Double getDepenseTotale() {
        return depenseTotale;
    }

    public void setDepenseTotale(Double depenseTotale) {
        this.depenseTotale = depenseTotale;
    }

    public Double getBudgetTotal() {
        return budgetTotal;
    }

    public void setBudgetTotal(Double budgetTotal) {
        this.budgetTotal = budgetTotal;
    }

    public List<Transaction> getDernieresCommandes() {
        return dernieresCommandes;
    }

    public void setDernieresCommandes(List<Transaction> dernieresCommandes) {
        this.dernieresCommandes = dernieresCommandes;
    }
}

