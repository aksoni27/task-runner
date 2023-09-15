import async from "async";
import { IsNotEmpty, IsString } from "class-validator";
import { JobContextService } from "../job-context/job-context.service";
import { TaskRegistry } from "./task-registory";

export class BulkTaskHandler {
  @IsNotEmpty()
  @IsString()
  private TaskName!: string;
  private async!: boolean;
  private retry!: boolean;
  private retries!: number;
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
    return this.generateRetryFunc(jobContext);
  }

  generateTask() {
    this.task = TaskRegistry.getTaskFor(this.TaskName);
  }

  generateRetryFunc(jobContext: JobContextService) {
    let self = this;
    if (!this.retry) {
      this.retries = 1;
    }
    return (callback: any) => {
      console.log(`Starting Execution of Task ${self.TaskName} `);
      const prevOutput = jobContext.getPreviousTaskOutput();
      const items = prevOutput.Items;
      self.generateTask();

      async.retry(
        self.retries,
        (callback) => self.task.run(items, jobContext, callback),
        (err, result: any) => {
          if (err) callback(err, null);
          jobContext.setTaskResult(self.TaskName, {
            Failure: err ? err : [],
            Success: result.flat(),
          });
          jobContext.setPreviousTaskOutPut({ Items: result.flat() });
          callback(null, result.flat());
        }
      );
    };
  }
}
