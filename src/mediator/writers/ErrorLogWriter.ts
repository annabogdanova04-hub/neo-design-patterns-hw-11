import * as fs from "fs/promises";

export class ErrorLogWriter {
  private records: any[] = [];

  write(record: any): void {
    this.records.push(record);
  }

  async finalize(): Promise<void> {
    const content = this.records
      .map((r) => JSON.stringify(r))
      .join("\n");
    await fs.writeFile("src/output/errors.jsonl", content);
  }
}