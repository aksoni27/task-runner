import { JobContextService } from "../job-context/job-context.service";
import async from "async";
import { TaskRegistry } from "./task-registory";
import { IsNotEmpty, IsString } from "class-validator";

export class DefaultTaskHandler {
  @IsNotEmpty()
  @IsString()
  private TaskName!: string;
  private async!: boolean;
  private retry!: boolean;
  private retries!: number;
  private maxConcurrency!: number;
  private task!: {
    run: (
      arg0: any,
      arg1: any,
      arg2: async.AsyncResultCallback<unknown, Error>
    ) => void;
  };

  getRetries() {
    return this.retries;
  }
  getAsync() {
    return this.async;
  }
  getRetry() {
    return this.retry;
  }
  getTaskName() {
    return this.TaskName;
  }

  run(jobContext: JobContextService) {
    return this.generateParallelTaskFunc(jobContext);
  }

  generateRetryFunc(items: any, jobContext: JobContextService) {
    let self = this;
    if (!this.retry) this.retries = 1;
    return (callback: (arg0: Error | null, arg1: unknown) => void) => {
      async.retry(
        self.retries,
        (callback) => self.task.run(items, jobContext, callback),
        (err, result) => {
          if (err) callback(err, null);
          callback(null, result);
        }
      );
    };
  }

  generateTask() {
    this.task = TaskRegistry.getTaskFor(this.TaskName);
  }

  generateParallelTaskFunc(jobContext: JobContextService) {
    let self = this;
    return (callback: any) => {
        if (!this.maxConcurrency) this.maxConcurrency = 1;
        if (!this.retry) this.retries = 1;
      console.log(`Starting Execution of Task ${self.TaskName} with maxConcurrency ${this.maxConcurrency} .`);
      const prevOutput = jobContext.getPreviousTaskOutput();
      const items = prevOutput.Items;
      this.generateTask();
      const taskFunc: any = {},
        itemJson: any = {};
      for (const item of items) {
        taskFunc[item.RunnerTaskId] = this.generateRetryFunc(item, jobContext);
        itemJson[item.RunnerTaskId] = item;
      }

      async.parallelLimit(
        async.reflectAll(taskFunc),
        self.maxConcurrency,
        (err, result: any) => {
          if (!err) {
            const success: any[] = [],
              failure: any[] = [];
            Object.keys(result).forEach((key) => {
              if (result[key].value != null) {
                success.push(result[key].value);
              } else {
                failure.push(itemJson[key]);
              }
            });
            jobContext.setTaskResult(self.TaskName, {
              Failure: failure,
              Success: success,
            });
            jobContext.setPreviousTaskOutPut({ Items: success });
            callback(null, success);
          } else {
            callback(err, null);
          }
        }
      );
    };
  }
}
