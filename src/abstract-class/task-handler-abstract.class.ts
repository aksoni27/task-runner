import { JobContextService } from "../job-context/job-context.service";

export abstract class AbstractTaskHandler {
  abstract run(jobContext: JobContextService): any;
}
