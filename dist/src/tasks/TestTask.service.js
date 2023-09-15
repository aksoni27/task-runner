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
exports.Test2Task = exports.TestTask = void 0;
class TestTask {
    run(item, jobContext, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aa = 'true';
                console.log(`Logging TestTask1`, item, jobContext);
                item.isSkip = true;
                callback(null, item);
            }
            catch (err) {
                item.errorMessage = err;
                callback(item, null);
            }
        });
    }
}
exports.TestTask = TestTask;
class Test2Task {
    run(item, jobContext, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aa = 'true';
                console.log(`Logging TestTask2`, item, jobContext);
                callback(null, item);
            }
            catch (err) {
                console.log();
                callback(err, null);
            }
        });
    }
}
exports.Test2Task = Test2Task;
