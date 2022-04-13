import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ITodoItem } from '../models/todo-item.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent implements OnChanges {
  @Input() createTodoResult?: boolean | null;
  @Output() createNewTodo: EventEmitter<ITodoItem> =
    new EventEmitter<ITodoItem>();
  @ViewChild('formDirective') formDirective!: FormGroupDirective;

  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expireAt: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['createTodoResult'] &&
      changes['createTodoResult'].currentValue === true
    ) {
      this.createForm.reset();
      this.formDirective.resetForm();
    }
  }

  /**
   * Create new todoItem and save it on array
   *
   */
  onSubmit() {
    const { value } = this.createForm;
    const newTodo = {
      name: value.name,
      description: value.description,
      createdAt: new Date().toISOString(),
      expireAt: value.expireAt,
      isDone: false,
    };

    this.createNewTodo.emit(newTodo);
  }
}
