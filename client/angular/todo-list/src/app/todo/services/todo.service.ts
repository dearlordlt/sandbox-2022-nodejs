import { Injectable } from '@angular/core';
import { ITodoItem } from '../models/todo-item.model';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoTasks: ITodoItem[] = [
    {
      name: 'Shopping',
      description: 'Buy a couple of products',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 3, 9).toISOString(),
      isDone: false,
    },
    {
      name: 'Shopping2',
      description: 'Buy a couple of products',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 3, 9).toISOString(),
      isDone: false,
    },
    {
      name: 'Shopping3',
      description: 'Buy a couple of products',
      createdAt: new Date().toISOString(),
      expireAt: new Date(2022, 3, 9).toISOString(),
      isDone: true,
    },
  ];
  constructor() {}

  todoTasks$: Subject<ITodoItem[]> = new BehaviorSubject([...this.todoTasks]);

  getTodoTasks() {
    //return this.http.get()
    return this.todoTasks$.asObservable().pipe(delay(1500));
  }

  createTodo(newTodo: ITodoItem) {
    // http.post => observable
    return new Observable((subscriber: Subscriber<string>) => {
      subscriber.next('Success');
    }).pipe(
      delay(1000),
      tap(() => {
        this.todoTasks.push(newTodo);
        this.todoTasks$.next([...this.todoTasks]);
      })
    );
  }

  searchTodo(str: string) {
    const filteredTasks = this.todoTasks.filter((todoItem: ITodoItem) =>
      todoItem.name.includes(str)
    );
    this.todoTasks$.next(filteredTasks);
  }
}
