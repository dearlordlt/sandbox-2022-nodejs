import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges, OnDestroy {
  constructor() {}

  @Input() header!: string;
  @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();
  currentDate = new Date();

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngOnDestroy() {
    console.log('onDestroy');
  }

  btnClick(): void {
    this.buttonClick.emit('button was clicked');
  }
}
