"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlowTransformer = void 0;
const class_transformer_1 = require("class-transformer");
const workflow_schema_1 = require("./workflow.schema");
class WorkFlowTransformer {
    static tranform(rawWorkflow) {
        return (0, class_transformer_1.deserialize)(workflow_schema_1.WorkFlow, rawWorkflow);
    }
}
exports.WorkFlowTransformer = WorkFlowTransformer;
