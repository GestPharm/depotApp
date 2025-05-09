import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private auth: AuthService) {}


    // header.component.ts or similar
    logout(): void {
      this.auth.logout();
      this.router.navigate(['/login']); // redirect to login
    }

}
