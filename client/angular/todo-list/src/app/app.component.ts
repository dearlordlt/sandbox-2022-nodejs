import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';
  toDoHeader = 'First header';
  headerVersion = 0;
  showToDo = true;

  changeToDoHeader(): void {
    this.toDoHeader = `First header 1`;
  }
  removeToDoComponent() {
    this.showToDo = !this.showToDo;
  }

  onButtonClick(str: string): void {
    console.log(str);
  }
}
