export class User {
    id: number | undefined;
    nom: string | undefined;
    prenom: string | undefined;
    role: string | undefined;
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;
    active: boolean | undefined;
   
    constructor({
        id,
        nom,
        prenom,
        role,
        email,
        username,
        password
    }: {
        id?: number,
        nom?: string,
        prenom?: string,
        role?: string,
        email?: string,
        username?: string,
        password?: string,
        active?: true
      
    }) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.role = role;
      this.username = password;
      this.password = password;
      this.email = email;
      this.active = this.active;
      
    }
}
