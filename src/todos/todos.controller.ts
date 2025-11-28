import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  addTodo(@Body('title') title: string) {
    return this.todoService.addTodo(title);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.todoService.update(+id, body);
  }

  @Patch(':id/favourite')
  markAsFavourite(@Param('id') id: string) {
    return this.todoService.markFavourite(+id);
  }

  @Patch(':id/completed')
  markAsCompleted(@Param('id') id: string) {
    return this.todoService.markCompleted(+id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(+id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body('title') title: string) {
    return this.todoService.updateTodo(+id, title);
  }
}
