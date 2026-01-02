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
  private _title: string = "Physical Records Registration";

  constructor(private _authenticationService : AuthenticationService, private _router : Router) {
  }

  public getTitle(): string {
    return this._title;
  }

  public get authenticationService(): AuthenticationService {
    return this._authenticationService;
  }

  public get usernameOfLoggedInUser() : string | null {
    return this._authenticationService.user?.name ?? null;
  }

  public get emailOfLoggedInUser() : string | null {
    return this._authenticationService.user?.email ?? null;
  }

  public logout(): Promise<boolean> {
    this._authenticationService.logout();
    return this._router.navigate(['/login']);
  }
}
