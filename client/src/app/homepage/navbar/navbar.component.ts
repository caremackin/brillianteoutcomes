import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavComponent {
  title = 'project';
  isAuthenticated = false;
  isAdmin = false;
  private subscription: Subscription

  constructor(private auth: AuthService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.auth.isAuthenticated().subscribe((status) => {
      if (status) {
        const stateId =2
        this.isAdmin = stateId === UserRole.Admin;

        this.cd.detectChanges();
      }
    });

}
}