import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AbstractTaskHandler } from "../abstract-class/task-handler-abstract.class";
import { BulkTaskHandler } from "../task-handlers/bulk-task-handler";
import { DefaultTaskHandler } from "../task-handlers/default-task-handler";
import "reflect-metadata";

export class WorkFlow {
  @IsNotEmpty()
  @IsString()
  private JobName: string | undefined;

  @Type(() => AbstractTaskHandler, {
    discriminator: {
      property: "handlerType",
      subTypes: [
        { value: DefaultTaskHandler, name: "Default" },
        { value: BulkTaskHandler, name: "Bulk" },
      ],
    },
  })
  @ValidateNested()
  private TaskChain: AbstractTaskHandler[] = [];

  @Type(()=> BulkTaskHandler)
  private onComplete: BulkTaskHandler[] = []

  getChainedTask() {
    return this.TaskChain;
  }

  getOnCompleteTask() {
    return this.onComplete;
  }
}
