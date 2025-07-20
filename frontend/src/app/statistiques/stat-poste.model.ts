import { Transaction } from "../models/transaction.model";

export class StatPoste {
    nbTotalCommandes: number | undefined;
    
    depenseTotale: number | undefined;
    
    budgetTotal: number | undefined;

    dernieresCommandes: Transaction[] =[];
    
   
    constructor({
      nbTotalCommandes,
    
    depenseTotale,
    
    budgetTotal,
    dernieresCommandes,
    }: {
      nbTotalCommandes?: number,
    
    depenseTotale?: number,
    
    budgetTotal?: number,

    dernieresCommandes?: Transaction[]
      
    }) {
      this.nbTotalCommandes = nbTotalCommandes;
      this.depenseTotale = depenseTotale;
      this.budgetTotal = budgetTotal;
      if(dernieresCommandes){
        this.dernieresCommandes = dernieresCommandes;
      }
      
      
      
    }
}
