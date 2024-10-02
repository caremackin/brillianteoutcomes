import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated = false;
  isAdmin = false;

  constructor(private auth: AuthService) {}

ngOnInit() {
  this.auth.isAuthenticated().subscribe((status) => {
    this.isAuthenticated = status;
    const stateId = this.auth.getStateId();
    this.isAdmin = stateId === UserRole.Admin;
  });
}

logout() {
  this.auth.logout();
}
}
