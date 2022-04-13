import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchTodoComponent } from './search-todo/search-todo.component';
import { TodoWarningDirective } from './directives/todo-warning.directive';
import { StoreModule } from '@ngrx/store';
import { reducer, todoFeatureKey } from './store/reducer/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effect/todo.effects';
import { TodoListContainerComponent } from './todo-list/todo-list.container';
import { CreateTodoContainerComponent } from './create-todo/create-todo.container';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    CreateTodoComponent,
    SearchTodoComponent,
    TodoWarningDirective,
    TodoListContainerComponent,
    CreateTodoContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(todoFeatureKey, reducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodoModule {}
