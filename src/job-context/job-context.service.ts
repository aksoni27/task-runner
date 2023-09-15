export class JobContextService {
  private contextData: { [x: string]: any };
  private taskResult: { [x: string]: any };
  private prevTaskOutput: any;

  constructor() {
    this.contextData = {};
    this.taskResult = {};
    this.prevTaskOutput = {};
  }
  
  getJobContext() {
    return this.contextData;
  }

  setContextData(key: string, value: any) {
    this.contextData[key] = value;
  }

  setTaskResult(taskName: string, result: any) {
    this.taskResult[taskName] = result;
  }

  getTaskResult(taskName: string) {
    return this.taskResult[taskName];
  }

  setPreviousTaskOutPut(output: any) {
    this.prevTaskOutput = output;
  }

  getPreviousTaskOutput() {
    return this.prevTaskOutput;
  }

}
