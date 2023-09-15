import { taskProviders } from "./runner-tasks";
import { TaskRegistry } from "./task-handlers/task-registory";
import { TaskRunnerService } from "./task-runner/task-runner.service";
import { WorkflowService } from "./workflow/workflow.service";
import 'reflect-metadata';
import { WorkFlow } from "./workflow/workflow.schema";

async function TestMyApp() {
    try {
        TaskRegistry.register({ providers: taskProviders });

        const job = {
            Body: {
                JobName: 'TestJob',
                Items: [
                    {
                        a: 1,
                        b: 2,
                        c: 3
                    },
                    {
                        e: 1,
                        b: 2,
                        c: 3
                    },
                    {
                        f: 1,
                        b: 2,
                        c: 3
                    }, {
                        g: 1,
                        b: 2,
                        c: 3
                    }
                ]
            }
        }
        const workflow : WorkFlow = WorkflowService.getJobWorkFlow(job.Body.JobName);        
        await new TaskRunnerService().run(job, workflow)
    } catch (err) {
        console.log(err);
    }
}

TestMyApp();