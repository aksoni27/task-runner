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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlowReaderService = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const workflow_transform_service_1 = require("./workflow-transform.service");
class WorkFlowReaderService {
    getJobWorkFlow(workflowName) {
        var _a;
        try {
            const workflowBasePath = (_a = process.env.worflowConfigPath) !== null && _a !== void 0 ? _a : './src/workflow-config/';
            const workFlowPath = path.join(workflowBasePath, workflowName + '.json');
            console.log(workFlowPath);
            const rawWorkflowData = fs.readFileSync(workFlowPath, { encoding: 'utf-8' });
            console.log(rawWorkflowData);
            return workflow_transform_service_1.WorkFlowTransformer.tranform(rawWorkflowData);
        }
        catch (err) {
            console.log(err);
            console.log('Workflow SPec Read error with name ');
            throw `Workflow Soec Read error with name`;
        }
    }
}
exports.WorkFlowReaderService = WorkFlowReaderService;
