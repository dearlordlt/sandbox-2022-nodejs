import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  isSpinnerVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.spinnerService.getIsSpinnerVisible$().subscribe((value: boolean) => {
      this.isSpinnerVisible = value;
    });
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  healthCheck() {
    this.authService.healthCheck().subscribe((data) => console.log(data));
  }
}
