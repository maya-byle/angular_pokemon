import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  displayError: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSubmit() {
    if(this.email !== "demo@skills.co.il") {
      this.displayError = true;
      return;
    }
    this.authService.add(this.email);
    this.router.navigate(['/cards']);
  }
}
