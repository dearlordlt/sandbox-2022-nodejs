import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { CreateTodoComponent } from './create-todo.component';
import { TodoService } from '../services/todo.service';
import { FormGroupDirective } from '@angular/forms';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    mockTodoService = jasmine.createSpyObj('TodoService', ['createTodo']);
    component = new CreateTodoComponent(mockTodoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit', () => {
    const obs$ = cold('---a---b|', { a: 'success', b: 'success2' });
    mockTodoService.createTodo.and.returnValue(obs$);
    const formRef = { resetForm: () => {} } as FormGroupDirective;
    spyOn(formRef, 'resetForm');
    spyOn(component.createForm, 'reset');
    component.onSubmit(formRef);
    getTestScheduler().flush();
    expect(formRef.resetForm).toHaveBeenCalledTimes(1);
    expect(component.createForm.reset).toHaveBeenCalledTimes(1);
  });
});
