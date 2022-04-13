import { Action, createReducer, on } from '@ngrx/store';
import { ITodoItem } from '../../models/todo-item.model';
import * as TodosActions from '../action/todo.actions';

export const todoFeatureKey = 'todo';

export interface TodoState {
  todos: ITodoItem[];
  createTodoResult: boolean | null;
}

export const initialState: TodoState = {
  todos: [],
  createTodoResult: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodosActions.addTodos, (state: TodoState, { payload }) => {
    return {
      ...state,
      todos: [...payload],
    };
  }),
  on(TodosActions.addTodo, (state: TodoState) => {
    return {
      ...state,
      createTodoResult: null,
    };
  }),
  on(TodosActions.addTodoSuccess, (state: TodoState, { payload }) => {
    return {
      ...state,
      todos: [...state.todos, payload],
      createTodoResult: true,
    };
  }),
  on(TodosActions.addTodoError, (state: TodoState) => {
    return {
      ...state,
      createTodoResult: false,
    };
  })
);

export const reducer = (state: TodoState | undefined, action: Action) => {
  return todoReducer(state, action);
};
