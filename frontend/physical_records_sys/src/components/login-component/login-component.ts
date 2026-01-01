import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm : FormGroup;
  error : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService : AuthenticationService,
    private router : Router) {
      this.loginForm = this.formBuilder.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

  public onSubmit() : void {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;

    this.authenticationService.login(email, password).subscribe({
      next: (user) => {
        console.log('Received user data:', user);
        this.authenticationService.user = user;
        this.router.navigate(['/records']);
        console.log('Login successful:', user);
      },
      error: (error) => {
        this.error = error.error?.message || 'An error occurred during login.';
        console.error('Login failed:', error);
      }
    });
  }

  public get formControls() {
    return this.loginForm.controls;
  }
}
