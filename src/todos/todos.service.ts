import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getAllTodos() {
    return this.todoRepository.find();
  }

  addTodo(data: CreateTodoInput) {
    const newTodo = this.todoRepository.create(data);
    return this.todoRepository.save(newTodo);
  }

  async update(id: number, data: UpdateTodoInput) {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      return { message: 'Todo not found' };
    }

    Object.assign(todo, data);

    return this.todoRepository.save(todo);
  }

  // Mark Favourite
  async markFavourite(id: number) {
    await this.todoRepository.update(id, { isFavourite: true });
    return this.todoRepository.findOne({ where: { id } });
  }

  // Mark Completed
  async markCompleted(id: number) {
    await this.todoRepository.update(id, { isCompleted: true });
  return this.todoRepository.findOne({ where: { id } });
  }

  // Delete Todo
  deleteTodo(id: number) {
    return this.todoRepository.delete(id);
  }
}
