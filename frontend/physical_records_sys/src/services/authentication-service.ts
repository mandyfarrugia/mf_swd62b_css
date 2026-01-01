import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private endpoint : string = "http://localhost:3000/api/login";
  user : any = null;

  constructor(private http: HttpClient) {}

  public login(username : string, password : string) {
    return this.http.post<any>(this.endpoint, { username, password });
  }

  public logout() {
    this.user = null;
  }

  public isAuthenticated() : boolean {
    return this.user != null;
  }

  public hasRole(role : string) : boolean {
    return this.user && this.user.role && this.user.role === role;
  }
}
