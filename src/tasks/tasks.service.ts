import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskStatusDTO } from './DTO/task.dto';
import { GetTaskFilterDTO } from './DTO/getTaskFilterDTO';
import { resourceUsage } from 'process';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status-enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository,
    ){}
    async getTaskById(id:number):Promise<Task> {
        const found = await this.taskRepository.findOne(id);
console.log("fouuuund",found)
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO){
       return this.taskRepository.createTask(createTaskDTO)
    }

      async deletingTaskById(id: number){
     const found= await this.taskRepository.findOne({id})
    if(!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const deleted = await this.taskRepository.delete({id : found.id})
    return deleted
}





async updateTaskStatus(id:number ,status:TaskStatus):Promise<Task>{
    const task = await this.getTaskById(id);
    console.log(" tasssssk",task)
    task.status = status;
    await task.save();
return task;
}



// private tasks  : Task[]= []

getTasks(filterDto :GetTaskFilterDTO){
    return this.taskRepository.getTasks(filterDto);
}
// getTaskById(id: string): Task{
//     const found = this.tasks.find(task => task.id === id);
//     if(!found){

//      throw new NotFoundException(`Task ID ${id} Not Found`);
//     }
//     return found;
// }
// async getTaskFilterBySearch(filterDTO :GetTaskFilterDTO):Promise<void>{
//     const { status, search} = filterDTO
//     let tasks = await this.getAllTasks();
//     if(status){
//         const task = await tasks.findOne(status)
//         console.log("asdasdajnf", this.taskRepository)
//     }
    // if(search) {
    //    const task = await tasks.findOne(task => task.title.includes(search) ||task.description.includes(search));
    // }
    // return tasks;

// }
//   createTask(createTaskDTO : CreateTaskDTO):Task{
//       const {title , description} =createTaskDTO;
//     const task :Task= {
//         id: uuid(),
//         title,
//         description,
//         status:TaskStatus.OPEN,
//     }
//     this.tasks.push(task);
//     return task

// }
//   deletingTaskById(id: string){
//       const found =this.getTaskById(id);
//     this.tasks = this.tasks.filter(task => task.id !== found.id);
// }
// updateTaskStatus(id:string ,updateTaskStatusDTO:UpdateTaskStatusDTO){
// console.log(id)
// console.log(updateTaskStatusDTO)
//     // const task = this.tasks.find(task => task.id === id);
//     const task = this.getTaskById(id);
// console.log("59",updateTaskStatusDTO.status);
// if(task) {
//     task.status = updateTaskStatusDTO.status
// }
// // if(!task){
// //     throw new NotFoundException(`Task ID ${id} Not Found`);
// // }
// // else {
// //     task.status = updateTaskStatusDTO.status
// // }
// console.log(task)
// return task;

// }




}





































