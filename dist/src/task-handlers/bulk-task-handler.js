"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkTaskHandler = void 0;
const async_1 = __importDefault(require("async"));
const class_validator_1 = require("class-validator");
const task_registory_1 = require("./task-registory");
class BulkTaskHandler {
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
    run(jobContext) {
        return this.generateRetryFunc(jobContext);
    }
    generateTask() {
        this.task = task_registory_1.TaskRegistry.getTaskFor(this.TaskName);
    }
    generateRetryFunc(jobContext) {
        let self = this;
        if (!this.retry) {
            this.retries = 1;
        }
        return (callback) => {
            console.log(`Starting Execution of Task ${self.TaskName} `);
            const prevOutput = jobContext.getPreviousTaskOutput();
            const items = prevOutput.Items;
            self.generateTask();
            async_1.default.retry(self.retries, (callback) => self.task.run(items, jobContext, callback), (err, result) => {
                if (err)
                    callback(err, null);
                jobContext.setTaskResult(self.TaskName, {
                    Failure: err ? err : [],
                    Success: result.flat(),
                });
                jobContext.setPreviousTaskOutPut({ Items: result.flat() });
                callback(null, result.flat());
            });
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], BulkTaskHandler.prototype, "TaskName", void 0);
exports.BulkTaskHandler = BulkTaskHandler;
