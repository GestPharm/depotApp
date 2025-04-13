import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericsService {

  constructor() { }

  isAtLeastOneFieldNotEmpty(dci: string | null, nomPoste: string | null): boolean {
    // Vérifie si au moins un des deux champs n'est pas null ou vide
    return (dci !== null && dci.trim() !== '') || (nomPoste !== null && nomPoste.trim() !== '');
}
}
