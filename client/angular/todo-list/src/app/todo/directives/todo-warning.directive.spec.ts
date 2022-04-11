import { TodoWarningDirective } from './todo-warning.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('TodoWarningDirective', () => {
  it('should create an instance', () => {
    const mockEl = {
      nativeElement: {},
    } as ElementRef;
    const mockRenderer = {} as Renderer2;
    const directive = new TodoWarningDirective(mockEl, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
