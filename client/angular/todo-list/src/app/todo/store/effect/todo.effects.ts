import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../services/todo.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as todoActions from '../action/todo.actions';
import { ITodoItem } from '../../models/todo-item.model';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadTodos),
      mergeMap((action) => {
        return this.todoService.getTodoTasks().pipe(
          map((data: ITodoItem[]) => {
            console.log(data);
            return todoActions.addTodos({ payload: data });
          })
        );
      })
    )
  );

  createTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.addTodo),
      mergeMap((action) => {
        return this.todoService.createTodo(action.payload).pipe(
          map(() => {
            return todoActions.addTodoSuccess({ payload: action.payload });
          }),
          catchError((err) => of(todoActions.addTodoError))
        );
      })
    )
  );
}
