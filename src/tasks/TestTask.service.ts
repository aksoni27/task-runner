import { JobContextService } from "../job-context/job-context.service";

export class TestTask {
  async run(item: any, jobContext: JobContextService, callback: any) {
    try{
        let aa = 'true'
        console.log(`Logging TestTask1`, item, jobContext);
        item.isSkip = true;
        callback(null, item);
    }catch(err){
        item.errorMessage = err;
        callback(item,null);
    }
  }
}

export class Test2Task {
    async run(item: any, jobContext: JobContextService, callback: any) {
        try{
            let aa = 'true'
            console.log(`Logging TestTask2`, item, jobContext);
            callback(null, item);
        }catch(err){
            console.log();
            callback(err,null);
        }
      }
}
