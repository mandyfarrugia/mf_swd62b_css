import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Role, UserDto } from '../dtos/user-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _endpoint : string = "http://localhost:3000/api/login";
  private _user : UserDto | null = null;

  constructor(private http: HttpClient) {}

  public login(email : string, password : string) {
    return this.http.post<UserDto>(this._endpoint, { email, password }).pipe(tap((user) => {
      this._user = user;
    }));
  }

  public logout() {
    this._user = null;
  }

  public isAuthenticated() : boolean {
    return this._user !== null;
  }

  public hasRole(role : Role) : boolean {
    return this._user !== null && this._user.role && this._user.role === role.toLocaleLowerCase();
  }

  public get role() : Role | undefined {
    return this._user?.role;
  }

  public get user() : UserDto | null {
    return this._user;
  }

  private isClerk() : boolean {
    return this.hasRole('clerk');
  }

  private isManager() : boolean {
    return this.hasRole('manager');
  }

  private isAdministrator() : boolean {
    return this.hasRole('admin');
  }

  public canAddRecords() : boolean {
    return this.isClerk() || this.isManager() || this.isAdministrator();
  }

  public canUpdateRecords() : boolean {
    return this.isManager() || this.isAdministrator();
  }

  public canDeleteRecords() : boolean {
    return this.isAdministrator();
  }
}
