import async from "async";
import { JobContextService } from "../job-context/job-context.service";
import { WorkFlow } from "../workflow/workflow.schema";

export class TaskRunnerService {
  private jobContext: JobContextService;

  constructor() {
    this.jobContext = new JobContextService();
  }

  async run(jobRequest: any, jobWorkflow: WorkFlow) {
    const chainedTaskHandlers = jobWorkflow
      .getChainedTask()
      .concat(jobWorkflow.getOnCompleteTask());      

    const taskItems = jobRequest.Body.Items;
    taskItems.forEach((item: any, iterator: any) => {
      item["RunnerTaskId"] = iterator;
      item["UniqueId"] = jobRequest?.Body?.UniqueId;
      item["TraceId"] = jobRequest?.Body?.TraceId;
    });

    this.jobContext.setContextData("Initial_Request", jobRequest);
    this.jobContext.setPreviousTaskOutPut({ Items: taskItems });

    const taskChainList: any[] = [];
    for (const taskHandler of chainedTaskHandlers) {
      try {
        taskChainList.push(taskHandler.run(this.jobContext));
      } catch (err) {
        return;
      }
    }

    return new Promise((resolve, reject) => {
      console.log(`Stated Execution of WorkFLow ${jobRequest.Body.JobName}`);
      async.series(taskChainList, async function (err, result) {
        if(err) reject(err)
        console.log(
          `Completed Execution of Workflow ${jobRequest.Body.JobName}`
        );
        resolve(0);
      });
    });
  }
}
