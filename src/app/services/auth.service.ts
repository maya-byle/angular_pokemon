import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  keyName: string = 'loggedInUser'

  constructor() { }

  get(): string {
    return localStorage.getItem(this.keyName);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem(this.keyName);
    return user !== undefined;
  }

  add(email: string) {
    localStorage.setItem(this.keyName, email)
  }

  remove(): void {
    localStorage.removeItem(this.keyName)
  }
}
