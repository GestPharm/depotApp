import { Produit } from "./produit.model";

export class LigneProduit {
    id: number | undefined;
    produit: Produit | undefined;
    quantite: number | undefined;
    prixTotal: number | undefined;

    constructor({
      id,
      produit,
      quantite,
      prixTotal
    }: {
      id?: number | undefined;
      produit?: Produit | undefined;
      quantite?: number | undefined;
      prixTotal?: number | undefined;

    }) {
      this.id = id;
      this.produit = produit;
      this.quantite = quantite;
      this.prixTotal = prixTotal;


    }
}
