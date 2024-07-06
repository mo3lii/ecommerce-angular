import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminAuthService } from '../../../Services/admin-auth.service';
import { Router } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LogoComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  constructor(private authService: AdminAuthService, private router: Router) {}
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
          role: 'admin',
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            localStorage.setItem('admin-token', data.token);
            this.router.navigate(['/dashboard/allproducts']);
          },
        });
    }
  }
}
