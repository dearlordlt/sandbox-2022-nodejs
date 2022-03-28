import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule],
})
export class SharedModule {}
