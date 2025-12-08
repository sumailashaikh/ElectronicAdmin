import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorised',
  imports: [],
  templateUrl: './unauthorised.html',
  styleUrl: './unauthorised.css',
})
export class Unauthorised {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
