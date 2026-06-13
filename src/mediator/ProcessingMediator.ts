import { DataRecord } from "../models/DataRecord";
import { AccessLogWriter } from "./writers/AccessLogWriter";
import { TransactionWriter } from "./writers/TransactionWriter";
import { ErrorLogWriter } from "./writers/ErrorLogWriter";
import { RejectedWriter } from "./writers/RejectedWriter";

export class ProcessingMediator {
  private accessLogWriter = new AccessLogWriter();
  private transactionWriter = new TransactionWriter();
  private errorLogWriter = new ErrorLogWriter();
  private rejectedWriter = new RejectedWriter();

  private successCount = 0;
  private rejectedCount = 0;

  onSuccess(record: DataRecord): void {
    if (record.type === "access_log") {
      this.accessLogWriter.write(record);
    } else if (record.type === "transaction") {
      this.transactionWriter.write(record);
    } else if (record.type === "system_error") {
      this.errorLogWriter.write(record);
    }
    this.successCount++;
  }

  onRejected(original: any, error: string): void {
    this.rejectedWriter.write(original, error);
    this.rejectedCount++;
  }

  async finalize(total: number): Promise<void> {
    await this.accessLogWriter.finalize();
    await this.transactionWriter.finalize();
    await this.errorLogWriter.finalize();
    await this.rejectedWriter.finalize();

    console.log(`[INFO] Завантажено записів: ${total}`);
    console.log(`[INFO] Успішно оброблено: ${this.successCount}`);
    console.log(`[WARN] Відхилено з помилками: ${this.rejectedCount}`);
    console.log(`[INFO] Звіт збережено у директорії output/`);
  }
}
