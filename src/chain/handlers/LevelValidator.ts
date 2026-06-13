import { AbstractHandler } from "../AbstractHandler";

export class LevelValidator extends AbstractHandler {
  private readonly validLevels = ["info", "warning", "critical"];

  protected process(record: any): any {
    if (!record.level || !this.validLevels.includes(record.level)) {
      throw new Error(`Invalid level: ${record.level}`);
    }
    return record;
  }
}