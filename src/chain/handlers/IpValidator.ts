import { AbstractHandler } from "../AbstractHandler";

export class IpValidator extends AbstractHandler {
  protected process(record: any): any {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!record.ip || !ipRegex.test(record.ip)) {
      throw new Error("Invalid IP address");
    }
    return record;
  }
}
