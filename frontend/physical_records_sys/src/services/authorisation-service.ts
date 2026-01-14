import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication-service';

@Injectable({
  providedIn: 'root',
})
export class AuthorisationService {
  constructor(private authenticationService: AuthenticationService) {}

  public get canViewRecords() {
    return this.authenticationService.canViewRecords();
  }

  public get canAddRecords() {
    return this.authenticationService.canAddRecords();
  }

  public get canUpdateRecords() {
    return this.authenticationService.canUpdateRecords();
  }

  public get canDeleteRecords() {
    return this.authenticationService.canDeleteRecords();
  }
}
