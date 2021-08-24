import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status-enum";

export class GetTaskFilterDTO {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.CLOSE])
status: TaskStatus;
@IsOptional()
@IsNotEmpty()
search: string;
}