import * as fs from "fs/promises";

export class RejectedWriter {
  private records: any[] = [];

  write(record: any, error: string): void {
    this.records.push({ record, error });
  }

  async finalize(): Promise<void> {
    const content = this.records
      .map((r) => JSON.stringify(r))
      .join("\n");
    await fs.writeFile("src/output/rejected.jsonl", content);
  }
}
