import { Component } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validators, EmailValidator} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SignUpService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private signUpService: SignUpService, private router: Router, private authService: AuthService){}

  ngOnInit(){
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("",[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.minLength(7)
      ])
    });
  }

  login(){
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe(
          (response: any) => {
            const token = response.token;
            this.authService.setToken(token, response.user.stateId);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Login failed', error);
          }
        );
      } else {
        console.log('Form is invalid');
      }
  }



}