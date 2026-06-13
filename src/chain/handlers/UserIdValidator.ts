import { AbstractHandler } from "../AbstractHandler";

export class UserIdValidator extends AbstractHandler {
  protected process(record: any): any {
    if (!record.userId || record.userId.trim() === "") {
      throw new Error("Invalid userId");
    }
    return record;
  }
}