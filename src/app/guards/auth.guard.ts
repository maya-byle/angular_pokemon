import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authenticatedMail: string = "demo@skills.co.il"

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let routePath: any = route.routeConfig.path;
    const user: string = this.authService.get();

    if (routePath === 'cards' && (!user || user !== this.authenticatedMail)) {
      this.router.navigate(['login']);
      return false;
    }

    if(routePath === 'login' && (user && user === this.authenticatedMail)) {
      this.router.navigate(['cards']);
      return false;
    }

    return true;
  }
}
