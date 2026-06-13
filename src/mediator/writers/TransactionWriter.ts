import * as fs from "fs/promises";

export class TransactionWriter {
  private rows: string[] = [];

  write(record: any): void {
    this.rows.push(`${record.timestamp},${record.amount},${record.currency}`);
  }

  async finalize(): Promise<void> {
    const header = "timestamp,amount,currency";
    const content = [header, ...this.rows].join("\n");
    await fs.writeFile("src/output/transactions.csv", content);
  }
}