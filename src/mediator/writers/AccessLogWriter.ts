import * as fs from "fs/promises";

export class AccessLogWriter {
  private records: any[] = [];

  write(record: any): void {
    this.records.push(record);
  }

  async finalize(): Promise<void> {
    await fs.writeFile(
      "src/output/access_logs.json",
      JSON.stringify(this.records, null, 2)
    );
  }
}