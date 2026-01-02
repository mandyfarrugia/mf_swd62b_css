import { AuthenticationService } from './../../services/authentication-service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private title: string = "Physical Records Registration";
  private _authenticationService : AuthenticationService;

  constructor(private authenticationService : AuthenticationService, private router : Router) {
    this._authenticationService = authenticationService;
  }

  public getTitle(): string {
    return this.title;
  }

  public get authenticationServiceInstance(): AuthenticationService {
    return this._authenticationService;
  }

  public logout(): Promise<boolean> {
    this.authenticationService.logout();
    return this.router.navigate(['/login']);
  }
}
