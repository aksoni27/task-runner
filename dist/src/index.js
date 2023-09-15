"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_tasks_1 = require("./runner-tasks");
const task_registory_1 = require("./task-handlers/task-registory");
const task_runner_service_1 = require("./task-runner/task-runner.service");
const workflow_service_1 = require("./workflow/workflow.service");
require("reflect-metadata");
function TestMyApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            task_registory_1.TaskRegistry.register({ providers: runner_tasks_1.taskProviders });
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
            };
            const workflow = workflow_service_1.WorkflowService.getJobWorkFlow(job.Body.JobName);
            yield new task_runner_service_1.TaskRunnerService().run(job, workflow);
        }
        catch (err) {
            console.log(err);
        }
    });
}
TestMyApp();
