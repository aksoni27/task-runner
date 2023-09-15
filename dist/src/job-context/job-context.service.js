"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobContextService = void 0;
class JobContextService {
    constructor() {
        this.contextData = {};
        this.taskResult = {};
        this.prevTaskOutput = {};
    }
    getJobContext() {
        return this.contextData;
    }
    setContextData(key, value) {
        this.contextData[key] = value;
    }
    setTaskResult(taskName, result) {
        this.taskResult[taskName] = result;
    }
    getTaskResult(taskName) {
        return this.taskResult[taskName];
    }
    setPreviousTaskOutPut(output) {
        this.prevTaskOutput = output;
    }
    getPreviousTaskOutput() {
        return this.prevTaskOutput;
    }
}
exports.JobContextService = JobContextService;
