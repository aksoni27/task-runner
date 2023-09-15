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
exports.DefaultTaskHandler = void 0;
const async_1 = __importDefault(require("async"));
const task_registory_1 = require("./task-registory");
const class_validator_1 = require("class-validator");
class DefaultTaskHandler {
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
        return this.generateParallelTaskFunc(jobContext);
    }
    generateRetryFunc(items, jobContext) {
        let self = this;
        if (!this.retry)
            this.retries = 1;
        return (callback) => {
            async_1.default.retry(self.retries, (callback) => self.task.run(items, jobContext, callback), (err, result) => {
                if (err)
                    callback(err, null);
                callback(null, result);
            });
        };
    }
    generateTask() {
        this.task = task_registory_1.TaskRegistry.getTaskFor(this.TaskName);
    }
    generateParallelTaskFunc(jobContext) {
        let self = this;
        return (callback) => {
            if (!this.maxConcurrency)
                this.maxConcurrency = 1;
            if (!this.retry)
                this.retries = 1;
            console.log(`Starting Execution of Task ${self.TaskName} with maxConcurrency ${this.maxConcurrency} .`);
            const prevOutput = jobContext.getPreviousTaskOutput();
            const items = prevOutput.Items;
            this.generateTask();
            const taskFunc = {}, itemJson = {};
            for (const item of items) {
                taskFunc[item.RunnerTaskId] = this.generateRetryFunc(item, jobContext);
                itemJson[item.RunnerTaskId] = item;
            }
            async_1.default.parallelLimit(async_1.default.reflectAll(taskFunc), self.maxConcurrency, (err, result) => {
                if (!err) {
                    const success = [], failure = [];
                    Object.keys(result).forEach((key) => {
                        if (result[key].value != null) {
                            success.push(result[key].value);
                        }
                        else {
                            failure.push(itemJson[key]);
                        }
                    });
                    jobContext.setTaskResult(self.TaskName, {
                        Failure: failure,
                        Success: success,
                    });
                    jobContext.setPreviousTaskOutPut({ Items: success });
                    callback(null, success);
                }
                else {
                    callback(err, null);
                }
            });
        };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], DefaultTaskHandler.prototype, "TaskName", void 0);
exports.DefaultTaskHandler = DefaultTaskHandler;
