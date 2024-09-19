import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserRole } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const stateid = this.auth.getStateId();
    if (stateid === UserRole.Admin) {
      return true;
    }
    this.router.navigate(['/not-authorized']);
    return false;
  }
}
