import { Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NoAuthComponent } from './not-authorized/noauth.component';
import { HomeComponent } from './homepage/homepage/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'admin', component: DashboardComponent},
    { path: 'not-authorized', component: NoAuthComponent },
];
