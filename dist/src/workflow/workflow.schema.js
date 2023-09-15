"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkFlow = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const task_handler_abstract_class_1 = require("../abstract-class/task-handler-abstract.class");
const bulk_task_handler_1 = require("../task-handlers/bulk-task-handler");
const default_task_handler_1 = require("../task-handlers/default-task-handler");
require("reflect-metadata");
class WorkFlow {
    constructor() {
        this.TaskChain = [];
        this.onComplete = [];
    }
    getChainedTask() {
        return this.TaskChain;
    }
    getOnCompleteTask() {
        return this.onComplete;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)()
], WorkFlow.prototype, "JobName", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => task_handler_abstract_class_1.AbstractTaskHandler, {
        discriminator: {
            property: "handlerType",
            subTypes: [
                { value: default_task_handler_1.DefaultTaskHandler, name: "Default" },
                { value: bulk_task_handler_1.BulkTaskHandler, name: "Bulk" },
            ],
        },
    }),
    (0, class_validator_1.ValidateNested)()
], WorkFlow.prototype, "TaskChain", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => bulk_task_handler_1.BulkTaskHandler)
], WorkFlow.prototype, "onComplete", void 0);
exports.WorkFlow = WorkFlow;
