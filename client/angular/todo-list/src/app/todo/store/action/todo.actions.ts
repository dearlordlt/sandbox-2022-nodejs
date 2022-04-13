import { createAction, props } from '@ngrx/store';
import { ITodoItem } from '../../models/todo-item.model';

export const loadTodos = createAction('[Todo] Load Todos');

export const addTodos = createAction(
  '[Todo] Add Todos',
  props<{ payload: ITodoItem[] }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ payload: ITodoItem }>()
);

export const addTodoSuccess = createAction(
  '[Todo] Add Todo success',
  props<{ payload: ITodoItem }>()
);

export const addTodoError = createAction('[Todo] Add Todo error');
