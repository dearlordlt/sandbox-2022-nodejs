import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { take } from 'rxjs/operators';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expireAt: new FormControl('', [Validators.required]),
  });

  constructor(private todoService: TodoService) {}

  /**
   * Create new todoItem and save it on array
   *
   * @param formRef
   */
  onSubmit(formRef: FormGroupDirective) {
    const { value } = this.createForm;
    const newTodo = {
      name: value.name,
      description: value.description,
      createdAt: new Date().toISOString(),
      expireAt: value.expireAt,
      isDone: false,
    };
    this.todoService
      .createTodo(newTodo)
      .pipe(take(1))
      .subscribe((res: string) => {
        console.log(res);
        this.createForm.reset();
        formRef.resetForm();
      });
  }
}
