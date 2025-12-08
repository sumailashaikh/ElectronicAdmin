import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../../Services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
constructor(private authService: Auth,private router :Router) {}

  // Expose the necessary methods for the template
  get isAuthenticated(): boolean {
    // This allows standard users to see ProductList and Dashboard
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    // This controls the visibility of the Add Product link
    return this.authService.hasRole('admin');
  }
onLogout(): void {
    this.authService.logout(); // 1. Clear role/token from localStorage
    this.router.navigate(['/login']); // 2. Redirect to a public page (e.g., dashboard or /login)
  }
}
