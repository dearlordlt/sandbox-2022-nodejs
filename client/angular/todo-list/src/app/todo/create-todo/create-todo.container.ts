import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoState } from '../store/reducer/todo.reducer';
import { Observable } from 'rxjs';
import { selectCreateTodoResult } from '../store/selector/todo.selectors';
import { ITodoItem } from '../models/todo-item.model';
import * as TodoActions from '../store/action/todo.actions';

@Component({
  selector: 'app-create-todo-container',
  template: `<app-create-todo
    [createTodoResult]="createTodoResult$ | async"
    (createNewTodo)="onCreateNewTodo($event)"
  ></app-create-todo>`,
})
export class CreateTodoContainerComponent {
  createTodoResult$: Observable<boolean | null>;

  constructor(private store: Store<TodoState>) {
    this.createTodoResult$ = this.store.select(selectCreateTodoResult);
  }

  onCreateNewTodo(payload: ITodoItem) {
    this.store.dispatch(TodoActions.addTodo({ payload }));
  }
}
