import { AbstractHandler } from "../AbstractHandler";

export class MessageTrimmer extends AbstractHandler {
  protected process(record: any): any {
    if (!record.message) throw new Error("Missing message");
    return { ...record, message: record.message.trim().slice(0, 255) };
  }
}