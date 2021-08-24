import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status-enum";

export class TaskStatusValidationPipes implements PipeTransform {
    readonly allowedStatuses = [
TaskStatus.OPEN,
TaskStatus.IN_PROCESS,
TaskStatus.CLOSE,
];

    transform(value : any ){
        value = value.toUpperCase();
        console.log("check value",value)
        if(!this.isStatusValid(value)){
            console.log("Sdfdk")
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        console.log("pipes 21",value)
        return value;
        }
        private isStatusValid(status: any) {
            const idx = this.allowedStatuses.indexOf(status);
            console.log("pipes", idx)
            return idx !== -1;
         }
    }
