import { LigneProduit } from "./ligneProduit.model";
import { Poste } from "./poste.model";
import { Produit } from "./produit.model";

export class Transaction {

    id: number | undefined;
    quantite: number | undefined;
    type: string | undefined;
    dateTransaction: Date | undefined;
    ligneProduits: LigneProduit[] | undefined;
    poste: Poste | undefined;
    prixTotal: number | undefined;
    motif: string | undefined;


    constructor({
        id,
        quantite,
        type,
        dateTransaction,
        ligneProduits,
        poste,
        prixTotal,
        motif
    }: {
        id?: number | undefined;
        quantite?: number | undefined;
        type?: string | undefined;
        dateTransaction?: Date | undefined;
        ligneProduits?: LigneProduit[] | undefined;
        poste?: Poste | undefined;
        prixTotal?: number | undefined;
        motif?: string | undefined;

    }) {
      this.id = id;
      this.quantite = quantite;
      this.type = type;
      this.dateTransaction = dateTransaction;
      this.ligneProduits = ligneProduits;
      this.poste = poste;
      this.prixTotal = prixTotal;
      this.motif = motif;


    }
}
