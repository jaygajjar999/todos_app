import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getAllTodos() {
    return this.todoRepository.find();
  }

  addTodo(title: string) {
    const newTodo = this.todoRepository.create({
      title,
      isFavourite: false,
      isCompleted: false,
    });

    return this.todoRepository.save(newTodo);
  }

  async update(id: number, updateTodo: any) {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      return { message: 'Todo not found' };
    }

    todo.title = updateTodo.title ?? todo.title;
    todo.isFavourite = updateTodo.isFavourite ?? todo.isFavourite;
    todo.isCompleted = updateTodo.isCompleted ?? todo.isCompleted;

    return this.todoRepository.save(todo);
  }

  // Mark Favourite
  async markFavourite(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (todo) {
      todo.isFavourite = true;
      return this.todoRepository.save(todo);
    }
    return null;
  }

  // Mark Completed
  async markCompleted(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (todo) {
      todo.isCompleted = true;
      return this.todoRepository.save(todo);
    }
    return null;
  }

  // Delete Todo
  deleteTodo(id: number) {
    return this.todoRepository.delete(id);
  }

  // Update title only
  async updateTodo(id: number, title: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) return null;

    todo.title = title;
    return this.todoRepository.save(todo);
  }
}
