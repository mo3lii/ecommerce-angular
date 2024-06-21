import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { IuserRegister } from '../../../models/iuser-register';
import { UserAuthService } from '../../../Services/user-auth.service';
import { CommonModule } from '@angular/common';
import { NotExpr } from '@angular/compiler';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
  showpassword: boolean = false;
  showConfirmPassword: boolean = false;
  toggleShowPassword() {
    this.showpassword = !this.showpassword;
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isMailAvailable = false;
  isEmailLoading = true;
  isEmailFocused = false;
  emailFocused() {
    this.isEmailFocused = true;
  }
  emailBlured() {
    this.isEmailFocused = false;
  }
  checkMail() {
    this.email.markAsTouched();
    this.isEmailLoading = true;
    console.log(this.email.value);
    this.userAuthService.checkEmail(this.email.value || '').subscribe({
      next: () => {
        this.isMailAvailable = true;
        this.isEmailLoading = false;
        console.log('email valid');
      },
      error: () => {
        this.isMailAvailable = false;
        this.isEmailLoading = false;
        console.log('email not valid');
      },
    });
  }

  user: IuserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  userGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/
      ),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  get isPasswordconfirmed() {
    return this.password.value == this.confirmPassword.value;
  }
  get firstName() {
    return this.userGroup.controls.firstName;
  }
  get lastName() {
    return this.userGroup.controls.lastName;
  }
  get email() {
    return this.userGroup.controls.email;
  }
  get password() {
    return this.userGroup.controls.password;
  }
  get confirmPassword() {
    return this.userGroup.controls.confirmPassword;
  }
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  register() {
    if (
      this.userGroup.valid &&
      this.isMailAvailable &&
      this.isPasswordconfirmed
    ) {
      let user: IuserRegister = {
        firstName: this.userGroup.controls.firstName.value || '',
        lastName: this.userGroup.controls.lastName.value || '',
        email: this.userGroup.controls.email.value || '',
        password: this.userGroup.controls.password.value || '',
      };
      console.log('user : ', user);
      this.userAuthService.register(user).subscribe({
        next: (data) => {
          console.log('data :', data);
          this.router.navigate(['/user/login']);
        },
      });
    }
  }
}
