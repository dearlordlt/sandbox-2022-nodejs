import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TodoModule {}
