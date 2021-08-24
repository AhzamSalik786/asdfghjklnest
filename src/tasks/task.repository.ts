import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO, TaskStatus } from "./DTO/task.dto";
import { GetTaskFilterDTO } from "./DTO/getTaskFilterDTO";

@EntityRepository(Task)
export class  TaskRepository extends Repository<Task>{
    async getTasks(filterDto: GetTaskFilterDTO):Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
           const tasks = await query.getMany();
            return tasks;
        }
    async createTask(createTaskDTO: CreateTaskDTO){
        const {title, description} = createTaskDTO;

        const task = new Task();
        task.title= title,
        task.description= description,
        task.status = TaskStatus.OPEN,
        await task.save();
        return task;
    }
}