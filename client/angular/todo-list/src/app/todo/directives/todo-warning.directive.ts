import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ITodoItem } from '../models/todo-item.model';

const WARNING_DAYS_COUNT = 5;

@Directive({
  selector: '[appTodoWarning]',
})
export class TodoWarningDirective implements OnInit {
  @Input() appTodoWarning!: ITodoItem;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const expireAtDate = new Date(this.appTodoWarning.expireAt);
    const diff = Date.now() - Number(expireAtDate);
    const isWarning =
      diff >= 0 || Math.abs(diff) < 60 * 1000 * 60 * 24 * WARNING_DAYS_COUNT;
    if (!this.appTodoWarning.isDone && isWarning) {
      const newEl = this.renderer.createElement('div');
      this.renderer.setStyle(newEl, 'border-radius', '25%');
      this.renderer.setStyle(newEl, 'background', 'orange');
      this.renderer.setStyle(newEl, 'paddings', '1rem');
      this.renderer.setStyle(newEl, 'width', '1rem');
      this.renderer.setStyle(newEl, 'height', '1rem');
      this.renderer.appendChild(this.el.nativeElement, newEl);
    }
  }
}
