import { Component } from '@angular/core';
import { Auth } from '../../Services/auth';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',

  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        // Redirect based on role or a default route after successful login
        if (this.authService.hasRole('admin')) {
          this.router.navigate(['/dashboard']); // Admin sees dashboard
        } else if (this.authService.hasRole('user')) {
          this.router.navigate(['/dashboard']); // User sees dashboard
        }
      } else {
        alert('Invalid credentials'); // Or display a more user-friendly message
      }
    }
  }
   get f() {
    return this.loginForm.controls;
  }
}
