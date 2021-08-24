import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password:'12345678',
    database: 'taskmanagement',
    entities: [
        Task,
        User,
    ],
    synchronize: true,
}