import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((data) => {
      console.log('successful login');
      console.log(data);
      this.router.navigateByUrl('/todo');
    });
  }
}
