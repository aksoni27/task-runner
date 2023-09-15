export class TaskRegistry {
  private static tasks: any = {};

  static async register(input: { providers: Array<any> }) {
    input.providers.forEach((className) => {
      this.tasks[className.name] = className;
    });
  }

  static getTaskFor(taskName: string) {
    try {
      return new this.tasks[taskName]();
    } catch (err) {
      console.log("Register your Task");
    }
  }
}
