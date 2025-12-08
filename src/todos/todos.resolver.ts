import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodosService) {}

  // GET all todos
  @Query(() => [Todo])
  getTodos() {
    return this.todoService.getAllTodos();
  }

  // Add Todo
  @Mutation(() => Todo)
  addTodo(@Args('data') data:CreateTodoInput) {
    return this.todoService.addTodo(data);
  }

  // Update Todo
  @Mutation(() => Todo)
  updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateTodoInput,
  ) {
    return this.todoService.update(id, data);
  }

  // Favourite
  @Mutation(() => Todo)
  markFavourite(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.markFavourite(id);
  }
  
  // Completed
  @Mutation(() => Todo)
  markCompleted(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.markCompleted(id);
  }

  // Delete
  @Mutation(() => Boolean)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    await this.todoService.deleteTodo(id);
    return true;
  }
}
