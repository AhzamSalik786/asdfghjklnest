import { Type } from "class-transformer";
import { IsNotEmpty, IsEnum } from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty()
title : string;
@IsNotEmpty()
description: string;
}
export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROCESS = 'IN_PROCESS',
    CLOSE = 'CLOES'
}


export class UpdateTaskStatusDTO {
    @IsNotEmpty()
    // @IsEnum(TaskStatus)
    status: TaskStatus;
}

