import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITodoItem } from '../models/todo-item.model';
import { Store } from '@ngrx/store';
import { TodoState } from '../store/reducer/todo.reducer';
import { selectTodos } from '../store/selector/todo.selectors';
import * as TodoActions from '../store/action/todo.actions';

@Component({
  selector: 'app-todo-list-container',
  template: `<app-todo-list [todos]="todos$ | async"></app-todo-list>`,
})
export class TodoListContainerComponent implements OnInit {
  todos$: Observable<ITodoItem[]>;
  constructor(private store: Store<TodoState>) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }
}
