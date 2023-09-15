import { deserialize } from "class-transformer";
import path from "path";
import { WorkFlow } from "./workflow.schema";
import * as fs from "fs";

export class WorkflowService {

  static getJobWorkFlow(workflowName: string) : WorkFlow {
    try {
      const workflowBasePath =
        process.env.workflowConfigPath ?? "./src/workflow-config/";
      const completeWorkFlowPath = path.join(
        workflowBasePath,
        workflowName + ".json"
      );

      const rawWorkflowData: any = fs.readFileSync(completeWorkFlowPath, {encoding:'utf-8'});
      return deserialize(WorkFlow, rawWorkflowData);
    } catch (err) {
      console.log(err);
      throw `Workflow Spec Read error with name`;
    }
  }
  
}
