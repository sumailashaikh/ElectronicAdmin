  // auth.service.ts
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class Auth {
    isLoggedIn() {
      throw new Error('Method not implemented.');
    }
      private readonly USER_ROLE_KEY = 'currentUserRole'; // Key for localStorage

    constructor() {
      // Load the user role from localStorage on service initialization
      this.currentUserRole = localStorage.getItem(this.USER_ROLE_KEY);
    }

    private currentUserRole: string | null = null;

    isAuthenticated(): boolean {
      return !!this.currentUserRole;
    }

    hasRole(role: string): boolean {
      return this.currentUserRole === role;
    }

    login(username: string, password: string): boolean {
      if (username === 'admin' && password === 'admin123') {
        this.currentUserRole = 'admin';
        localStorage.setItem(this.USER_ROLE_KEY, 'admin'); // Store role in localStorage
        return true;
      } else if (username === 'user' && password === 'user123') {
        this.currentUserRole = 'user';
        localStorage.setItem(this.USER_ROLE_KEY, 'user'); // Store role in localStorage
        return true;
      }
      this.currentUserRole = null;
      localStorage.removeItem(this.USER_ROLE_KEY); // Clear role from localStorage on failed login
      return false;
    }

    logout(): void {
      this.currentUserRole = null;
      localStorage.removeItem(this.USER_ROLE_KEY); // Clear role from localStorage on logout
    }
  }