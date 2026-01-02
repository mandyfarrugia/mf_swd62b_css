import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { UserDto } from '../dtos/user-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private endpoint : string = "http://localhost:3000/api/login";
  user : UserDto | null = null;

  constructor(private http: HttpClient) {}

  public login(email : string, password : string) {
    return this.http.post<UserDto>(this.endpoint, { email, password }).pipe(tap((user) => {
      this.user = user;
    }));
  }

  public logout() {
    this.user = null;
  }

  public isAuthenticated() : boolean {
    return this.user !== null;
  }

  public hasRole(role : string) : boolean {
    return this.user !== null && this.user.role && this.user.role === role;
  }
}
