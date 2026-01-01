import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(private authenticationService : AuthenticationService) {}

  public login(username: string, password: string) : void {
    this.authenticationService.login(username, password).subscribe({
      next: (user) => {
        console.log('Received user data:', user);
        this.authenticationService.user = user;
        console.log('Login successful:', user);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
