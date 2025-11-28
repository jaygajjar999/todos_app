import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/todos/todo.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',        
  password: 'J@yWork1612',    
  database: 'todoapp',
  entities: [Todo],           
  synchronize: true,            
};  