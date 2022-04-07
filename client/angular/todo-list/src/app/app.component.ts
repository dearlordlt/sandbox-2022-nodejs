import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from './shared/services/spinner.service';
import { TodoService } from './todo/services/todo.service';

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
    private spinnerService: SpinnerService,
    private todoService: TodoService
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
    this.todoService
      .createTodo({
        name: 'Shopping new',
        description: 'Buy a couple of products',
        createdAt: new Date().toISOString(),
        expireAt: new Date(2022, 3, 9).toISOString(),
        isDone: false,
      })
      .subscribe((res) => console.log(res));
  }
}
