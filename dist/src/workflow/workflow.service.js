"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
const class_transformer_1 = require("class-transformer");
const path_1 = __importDefault(require("path"));
const workflow_schema_1 = require("./workflow.schema");
const fs = __importStar(require("fs"));
class WorkflowService {
    static getJobWorkFlow(workflowName) {
        var _a;
        try {
            const workflowBasePath = (_a = process.env.workflowConfigPath) !== null && _a !== void 0 ? _a : "./src/workflow-config/";
            const completeWorkFlowPath = path_1.default.join(workflowBasePath, workflowName + ".json");
            const rawWorkflowData = fs.readFileSync(completeWorkFlowPath, { encoding: 'utf-8' });
            return (0, class_transformer_1.deserialize)(workflow_schema_1.WorkFlow, rawWorkflowData);
        }
        catch (err) {
            console.log(err);
            throw `Workflow Spec Read error with name`;
        }
    }
}
exports.WorkflowService = WorkflowService;
