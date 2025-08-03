export class Poste {
    id: number | undefined;
    nom: string | undefined;
    adresse: string | undefined;
    telephone: string | undefined;
    email: string | undefined;
    budgetAnnuel: number | undefined;
   
    constructor({
      id,
      nom,
      adresse,
      telephone,
      email,
      budgetAnnuel
    }: {
      id?: number;
      nom?: string;
      adresse?: string;
      telephone?: string;
      email?: string;
      budgetAnnuel?: number;
      
    }) {
      this.id = id;
      this.nom = nom;
      this.adresse = adresse;
      this.telephone = telephone;
      this.email = email;
      this.budgetAnnuel = budgetAnnuel;
      
    }
}
