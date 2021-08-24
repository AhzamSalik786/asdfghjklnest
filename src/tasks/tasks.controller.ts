import { Body,Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { stringify } from 'uuid';
import { CreateTaskDTO, UpdateTaskStatusDTO } from './DTO/task.dto';
import { Put } from '@nestjs/common';
import { GetTaskFilterDTO } from './DTO/getTaskFilterDTO';
import { TaskStatusValidationPipes } from './pipes/task-status-validation.pipes';
import { Task } from './task.entity';
import { createTracing } from 'trace_events';
import { TaskStatus } from './task-status-enum';
import { stat } from 'fs';

@Controller('tasks')
export class TasksController { 
    constructor(private tasksServices : TasksService){}
// GET ALL TASK 
@Get()
    getTasks(@Query(ValidationPipe)  filterDto :GetTaskFilterDTO){
     return this.tasksServices.getTasks(filterDto);
    }

//     @Get()
//     getTasks(@Query()  filterDTO :GetTaskFilterDTO){
//         if(Object.keys(filterDTO).length) {
// return this.tasksServices.getTaskFilterBySearch(filterDTO);
//         } else{
//             return this.tasksServices.getAllTasks()
//         }
//     }
    // POST A TASK
@Post()
@UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
   return   this.tasksServices.createTask(createTaskDTO);
}
// GET TASK BY ID
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Task> {
        return this.tasksServices.getTaskById(id);
    }
//  DELETE TASK BY ID
    @Delete('/:id')
    deletingTaskById(@Param('id')  id: number){
        this.tasksServices.deletingTaskById(id);
        return `Deleted id ${id} successfully`

    }

// UPDATE STATUS FOR A SPECIFIC TASK
    @Patch('/status/:id')
        updateTaskStatus(
            @Param('id', ParseIntPipe)
            id:number,
             @Body('status', TaskStatusValidationPipes)
        status:TaskStatus ):Promise <Task>
        {
    return this.tasksServices.updateTaskStatus(id, status);
        }




//     @Post()
//   createTask(@Body(ValidationPipe)
//   createTaskDTO: CreateTaskDTO

//         // @Body('title') title:string,
//         // @Body('description') description:string,
//         ):Task{ 
//             return this.tasksServices.createTask(createTaskDTO)
//     }
//     @Delete('/:id')
//     deletingTaskById(@Param('id')  id: string ){
//         this.tasksServices.deletingTaskById(id);
//         return `Deleted id ${id} successfully`

//     }
//     @Patch('/status/:id')
//     updateTaskStatus(@Param('id')id:string, @Body('status', TaskStatusValidationPipes)
//     updateTaskStatusDTO :UpdateTaskStatusDTO ):Task
//     {
//         console.log(updateTaskStatusDTO)
//         console.log("status",updateTaskStatusDTO.status)
//         console.log("46",TaskStatusValidationPipes)
// return this.tasksServices.updateTaskStatus(id, updateTaskStatusDTO);
//     }
}