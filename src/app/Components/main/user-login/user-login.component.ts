import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../Services/user-auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  constructor(private authService: UserAuthService, private router: Router) {}
  showpassword: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }
  toggleShowPassword() {
    this.showpassword = !this.showpassword;
  }
  login() {
    if (this.email != null && this.password != null) {
      this.authService
        .login({
          email: this.email.value,
          password: this.password.value,
          role: 'user',
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            localStorage.setItem('user-token', data.token);
            this.router.navigate(['/home']);
          },
        });
    }
  }
}
