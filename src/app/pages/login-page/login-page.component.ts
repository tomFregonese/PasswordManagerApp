import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  createPasswordForm!: FormGroup;
  loginMode: boolean = true;
  password: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('appPasswordHash')) {
        this.loginMode = false;
      }
    }

    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required]
    });

    this.createPasswordForm = this.formBuilder.group({
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });

  }

  login(): void {
    console.log(this.password)
    if (this.authService.checkPassword(this.loginForm.value.password)) {
      localStorage.setItem('tempPassword', this.loginForm.value.password)
      this.router.navigate(['/dashboard']).then();
    } else {
      alert('Incorrect password');
    }
  }

  createAccount(): void {
    if (this.createPasswordForm.valid) {
      if (this.createPasswordForm.value.password1 === this.createPasswordForm.value.password2) {
        this.authService.accountCreation(this.createPasswordForm.value.password1);
        this.loginMode = true;
      } else {
        alert('Passwords do not match');
      }
    }
  }

}