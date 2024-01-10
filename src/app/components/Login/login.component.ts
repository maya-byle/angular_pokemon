import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  displayError: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if(this.email !== "demo@skills.co.il") {
      this.displayError = true;
      return;
    }
    localStorage.setItem('user','demo@skills.co.il')
    this.router.navigate(['/cards']);
  }
}
