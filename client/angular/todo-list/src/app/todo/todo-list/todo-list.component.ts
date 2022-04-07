import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITodoItem } from '../models/todo-item.model';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})

// OnDestroy
export class TodoListComponent implements OnInit {
  constructor(private todoService: TodoService) {}
  controlSubject: Subject<boolean> = new Subject();
  todoTasks$!: Observable<ITodoItem[]>;

  ngOnInit(): void {
    this.todoTasks$ = this.todoService.getTodoTasks();
    // this.todoService
    //   .getTodoTasks()
    //   .pipe(takeUntil(this.controlSubject))
    //   .subscribe((value: ITodoItem[]) => {
    //     console.log('on init log from todo items');
    //     this.todoTasks = value;
    //   });
  }

  // ngOnDestroy() {
  //   this.controlSubject.next(true);
  //   this.controlSubject.unsubscribe();
  // }
}
