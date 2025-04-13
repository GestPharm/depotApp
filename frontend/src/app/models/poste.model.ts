export class Poste {
    id: number | undefined;
    nom: string | undefined;
    adresse: string | undefined;
    telephone: string | undefined;
    email: string | undefined;
   
    constructor({
      id,
      nom,
      adresse,
      telephone,
      email
    }: {
      id?: number;
      nom?: string;
      adresse?: string;
      telephone?: string;
      email?: string;
      
    }) {
      this.id = id;
      this.nom = nom;
      this.adresse = adresse;
      this.telephone = telephone;
      this.email = email;
      
    }
}
