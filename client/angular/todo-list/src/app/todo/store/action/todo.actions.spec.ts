import * as fromTodo from './todo.actions';

describe('yTodos', () => {
  it('should return an action', () => {
    expect(fromTodo.yTodos().type).toBe('[Todo] Y Todos');
  });
});
