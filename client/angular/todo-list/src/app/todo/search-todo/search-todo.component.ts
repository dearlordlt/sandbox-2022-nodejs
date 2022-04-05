import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrls: ['./search-todo.component.scss'],
})
export class SearchTodoComponent implements AfterViewInit {
  @ViewChild('search') search!: ElementRef;
  constructor(private todoService: TodoService) {}

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(500))
      .subscribe((event: any) => {
        this.todoService.searchTodo(event.target.value);
      });
  }
}
