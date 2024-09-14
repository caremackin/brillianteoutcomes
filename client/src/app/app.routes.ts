import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/homepage/home.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'signup', component: SignupComponent}
];
